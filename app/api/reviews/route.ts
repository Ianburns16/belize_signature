import { NextResponse } from "next/server";

export interface GoogleReview {
  id: string;
  author_name: string;
  author_photo?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  tour_name?: string;
  verified: boolean;
  local_guide?: boolean;
  user_stats?: string;
  avatar_bg?: string;
  owner_response?: {
    text: string;
    relative_time_description: string;
  };
}

export interface GoogleReviewsData {
  place_name: string;
  rating: number;
  total_reviews: number;
  google_share_url: string;
  reviews: GoogleReview[];
}

const GOOGLE_SHARE_URL = "https://share.google/cU9A4ceLOz8DTEc1g";

const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    id: "rev-kim",
    author_name: "Kim Weber",
    rating: 5,
    relative_time_description: "a week ago",
    text: "Jeremy was AMAZING! You could immediately tell how passionate he is about what he does and how much pride he takes in giving his all every single day. Even though he does the ATM Cave tour all the time, he made such an effort to experience the magic right along with us.",
    tour_name: "ATM Cave Expedition",
    verified: true,
    local_guide: true,
    user_stats: "Local Guide · 31 reviews · 36 photos",
    avatar_bg: "#1a73e8",
    owner_response: {
      relative_time_description: "a day ago",
      text: "Thank you so much for your kind words, Kim! We're thrilled to hear that Jeremy made your ATM Cave adventure such a memorable one. He truly loves sharing the history and magic of the ATM cave with every guest. Thank you for choosing to explore with us, and we hope to welcome you back to Belize for another adventure soon!",
    },
  },
  {
    id: "rev-hisham",
    author_name: "Hisham Ghani",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "The tour was amazing and I highly recommend doing it. Damion made the experience incredible, for someone who has led hundreds of tours in the same cave his energy and knowledge was incredible and genuinely made the experience soo amazing!!!",
    tour_name: "ATM Cave Expedition",
    verified: true,
    local_guide: true,
    user_stats: "Local Guide · 6 reviews · 60 photos",
    avatar_bg: "#0f9d58",
    owner_response: {
      relative_time_description: "a week ago",
      text: "Thank you so much, Hisham! We’re thrilled to hear you had such an amazing experience. Damion will be especially happy to know that his energy and knowledge made the tour so memorable. We hope to have you back with us for another adventure!",
    },
  },
  {
    id: "rev-ashwin",
    author_name: "Ashwin Raghavachari",
    rating: 5,
    relative_time_description: "2 weeks ago",
    text: "Damion was friendly, knowledgable, and a great guide. I would highly recommend this experience!",
    tour_name: "ATM Cave Expedition",
    verified: true,
    local_guide: true,
    user_stats: "Local Guide · 4 reviews · 19 photos",
    avatar_bg: "#ea4335",
    owner_response: {
      relative_time_description: "2 weeks ago",
      text: "Hello Ashwin, so glad Damion took such great care of you! We really appreciate you taking the time to share your experience!",
    },
  },
];

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (apiKey && placeId) {
      const googleRes = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`,
        { next: { revalidate: 3600 } }
      );
      if (googleRes.ok) {
        const data = await googleRes.json();
        if (data.result) {
          const liveReviews: GoogleReview[] = (data.result.reviews || []).map((r: any, idx: number) => ({
            id: `google-${idx}`,
            author_name: r.author_name,
            author_photo: r.profile_photo_url,
            rating: r.rating,
            relative_time_description: r.relative_time_description,
            text: r.text,
            verified: true,
          }));

          return NextResponse.json({
            place_name: data.result.name || "Belize Signature Experience",
            rating: data.result.rating || 5.0,
            total_reviews: data.result.user_ratings_total || 50,
            google_share_url: GOOGLE_SHARE_URL,
            reviews: liveReviews.length > 0 ? liveReviews : FALLBACK_REVIEWS,
          });
        }
      }
    }

    return NextResponse.json({
      place_name: "Belize Signature Experience",
      rating: 5.0,
      total_reviews: 48,
      google_share_url: GOOGLE_SHARE_URL,
      reviews: FALLBACK_REVIEWS,
    });
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return NextResponse.json({
      place_name: "Belize Signature Experience",
      rating: 5.0,
      total_reviews: 48,
      google_share_url: GOOGLE_SHARE_URL,
      reviews: FALLBACK_REVIEWS,
    });
  }
}
