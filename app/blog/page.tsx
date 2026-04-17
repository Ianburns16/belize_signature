import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog - Belize Signature Experience",
  description: "Read the latest stories, tips, and guides for your Belize adventure.",
};

const MOCK_POSTS = [
  {
    id: "1",
    slug: "top-5-mayan-ruins-belize",
    title: "Top 5 Maya Ruins You Must Visit in Belize",
    excerpt: "Discover the ancient secrets of the Maya civilization hiding in the lush jungles of Belize. From the towering Castillo at Xunantunich to the remote Caracol.",
    image_url: "/images/cahcal-pech.jpg",
    author: "Elena Guide",
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    content: ""
  },
  {
    id: "2",
    slug: "what-to-pack-atm-cave",
    title: "What to Pack for the ATM Cave Expedition",
    excerpt: "The Actun Tunichil Muknal cave is a challenging but rewarding adventure. Here is our comprehensive packing list to ensure you're prepared for the journey.",
    image_url: "/images/after-atm.jpg",
    author: "Marcus Rivera",
    published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    content: ""
  },
  {
    id: "3",
    slug: "best-time-to-visit-belize",
    title: "The Best Time of Year to Visit Belize",
    excerpt: "Planning your trip? We break down the seasons in Belize so you can choose the perfect time for your signature experience.",
    image_url: "/images/pine-ridge.jpg",
    author: "Elena Guide",
    published_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    content: ""
  },
  {
    id: "4",
    slug: "wildlife-spotting-pine-ridge",
    title: "Wildlife Spotting in Mountain Pine Ridge",
    excerpt: "Keep your eyes peeled! A guide to the incredible biodiversity you might encounter in the Mountain Pine Ridge Forest Reserve.",
    image_url: "/images/pine-ridge.jpg", // Needs unique image but fallback for now
    author: "Marcus Rivera",
    published_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    content: ""
  }
];

export default async function BlogPage() {
  let posts = null;
  const isEnvValid = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http');

  if (isEnvValid) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      posts = data;
    } catch (e) {
      console.warn("Supabase connection failed. Falling back to mock data.");
    }
  }

  const activePosts = posts?.length ? posts : MOCK_POSTS;
  const featuredPost = activePosts[0];
  const remainingPosts = activePosts.slice(1);

  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pine-ridge.jpg"
            alt="Belize Signature Experience Journal"
            fill
            sizes="100vw"
            className="object-cover animate-pulse-slow lg:scale-105 lg:animate-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16 animate-float">
          <h1 className="font-heading text-6xl md:text-8xl text-white mb-6 uppercase tracking-wider drop-shadow-xl">
            Our <span className="text-brand-orange">Journal</span>
          </h1>
          <div className="h-1 w-24 bg-brand-orange rounded-full mb-8" />
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl text-shadow-sm">
            Stories, guides, and inspiration for your next adventure in beautiful Belize.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 -mt-16 relative z-10 w-full mb-20">
          <Link href={`/blog/${featuredPost.slug}`} className="group block rounded-3xl overflow-hidden shadow-2xl bg-white transition-transform hover:-translate-y-2 duration-300">
            <div className="flex flex-col lg:flex-row h-full">
              <div className="relative w-full lg:w-3/5 h-80 lg:h-auto overflow-hidden">
                <Image
                  src={featuredPost.image_url || '/images/pine-ridge.jpg'}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
              </div>
              <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4">
                  <span className="w-8 h-[2px] bg-brand-orange rounded-full"></span>
                  Featured
                </div>
                <h2 className="font-heading text-3xl md:text-4xl text-brand-dark uppercase mb-4 group-hover:text-brand-green transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-8 line-clamp-3 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={featuredPost.published_at}>
                      {new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid of remaining posts */}
      {remainingPosts && remainingPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-24 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={post.image_url || '/images/pine-ridge.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                     Article
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading text-xl text-brand-dark uppercase mb-3 line-clamp-2 group-hover:text-brand-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1.5">
                       <User className="w-3.5 h-3.5" />
                       {post.author}
                    </span>
                    <span className="flex items-center text-brand-green font-semibold">
                      Read <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
