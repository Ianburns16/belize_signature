"use client";

import { useEffect, useState } from "react";
import { Star, ExternalLink, CheckCircle2, MessageSquareQuote, ChevronLeft, ChevronRight } from "lucide-react";

export interface GoogleReviewItem {
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
  reviews: GoogleReviewItem[];
}

export function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const googleShareUrl = "https://share.google/cU9A4ceLOz8DTEc1g";

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load Google reviews", err);
      }
    }
    fetchReviews();
  }, []);

  const reviews = (data?.reviews || [
    {
      id: "fallback-kim",
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
      id: "fallback-hisham",
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
      id: "fallback-ashwin",
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
  ]).slice(0, 3); // Exactly 3 reviews

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-orange/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-brand-green/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Compact Header Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-2xl text-white uppercase tracking-wide">Google Reviews</h3>
                <span className="text-amber-400 font-bold text-lg flex items-center gap-1">
                  5.0 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </span>
              </div>
              <p className="text-xs text-gray-400">Verified Client Testimonials</p>
            </div>
          </div>

          <a
            href={googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md hover:scale-105 shrink-0"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Card */}
          <div className="bg-slate-800/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl transition-all duration-500">
            <div className="space-y-4">
              {/* User Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg uppercase shrink-0 shadow-md border border-white/20"
                    style={{ backgroundColor: currentReview.avatar_bg || "#1a73e8" }}
                  >
                    {currentReview.author_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base flex items-center gap-1.5 leading-tight">
                      {currentReview.author_name}
                      {currentReview.verified && (
                        <span title="Verified Google Reviewer">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-brand-orange font-medium mt-0.5">
                      {currentReview.user_stats || "Local Guide"}
                    </p>
                    <p className="text-[11px] text-gray-400">{currentReview.relative_time_description}</p>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(currentReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic pt-1">
                "{currentReview.text}"
              </p>

              {/* Owner Response Box */}
              {currentReview.owner_response && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900/95 border border-slate-700/80 text-xs space-y-1">
                  <div className="flex items-center justify-between text-brand-orange font-bold">
                    <span>Response from owner</span>
                    <span className="text-[10px] text-gray-400 font-normal">{currentReview.owner_response.relative_time_description}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed font-sans not-italic">
                    "{currentReview.owner_response.text}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-brand-orange border border-slate-700 text-white transition-all shadow-md active:scale-95"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-slate-800 hover:bg-brand-orange border border-slate-700 text-white transition-all shadow-md active:scale-95"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 bg-brand-orange" : "w-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Direct Google Maps Link */}
            <a
              href={googleShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-orange transition-colors"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
