import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return {
    title: `${resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Blog - Belize Signature Experience`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;
  const isEnvValid = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http');

  if (isEnvValid) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", resolvedParams.slug)
        .eq("published", true)
        .single();
      
      if (data) post = data;
    } catch (e) {
      console.warn("Error fetching post from Supabase.");
    }
  }

  // Fallback / Mock logic reading from the MOCK_POSTS if no DB match
  if (!post) {
    const MOCK_POSTS = [
      {
        slug: "top-5-mayan-ruins-belize",
        title: "Top 5 Maya Ruins You Must Visit in Belize",
        excerpt: "Discover the ancient secrets of the Maya civilization hiding in the lush jungles of Belize.",
        image_url: "/images/cahcal-pech.jpg",
        author: "Elena Guide",
        published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        content: "Belize is considered the heartland of the Maya Empire. Hidden beneath the dense canopy of the rainforest lie magnificent stone temples and ancient cities that once thrived thousands of years ago.\n\n### 1. Xunantunich\nLocated near the western border, Xunantunich (meaning 'Stone Woman') features El Castillo, one of the tallest structures in Belize. The panoramic view from the top is unparalleled.\n\n### 2. Caracol\nDeep in the Chiquibul Forest Reserve, Caracol is the largest Maya site in Belize. Its main pyramid, Caana, remains the tallest man-made structure in the country.\n\n### 3. Lamanai\nSituated on the banks of the New River Lagoon, reaching Lamanai via a scenic boat ride is half the adventure. The site is famous for its intricate mask carvings.\n\n### 4. Altun Ha\nEasily accessible from Belize City, Altun Ha is where the famous Jade Head of the Sun God Kinich Ahau was discovered.\n\n### 5. Cahal Pech\nOverlooking the town of San Ignacio, this was once a palatial home for an elite Maya family. It's a maze of small structures and courtyards, perfect for exploring."
      }
    ];
    post = MOCK_POSTS.find(p => p.slug === resolvedParams.slug);
  }

  if (!post) {
    notFound();
  }

  // Calculate estimated reading time (rough estimate: 200 words per minute)
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex items-end pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image_url || '/images/pine-ridge.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-brand-orange text-sm font-semibold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wider mb-6 leading-tight drop-shadow-md">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {post.author.charAt(0)}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-orange" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-6 py-20 w-full">
        {post.excerpt && (
          <p className="text-xl md:text-2xl text-brand-dark font-medium italic mb-12 border-l-4 border-brand-orange pl-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        
        <div className="prose prose-lg md:prose-xl prose-brand max-w-none text-gray-700">
          {post.content.split('\n\n').map((paragraph: string, index: number) => {
            if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="font-heading text-2xl uppercase mt-10 mb-4 text-brand-dark">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="font-heading text-3xl uppercase mt-12 mb-6 text-brand-dark">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc pl-6 mb-6">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            // For simple line breaks inside a paragraph
            return (
              <p key={index} className="mb-6 leading-relaxed text-gray-600">
                {paragraph.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i !== paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-dashed border-gray-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h4 className="font-heading text-2xl uppercase text-brand-dark">Share this article</h4>
            <div className="flex gap-4">
              <button className="bg-gray-100 hover:bg-brand-orange hover:text-white p-3 rounded-full transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button className="bg-gray-100 hover:bg-brand-orange hover:text-white p-3 rounded-full transition-colors">
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter / CTA Section */}
      <section className="bg-brand-green/10 py-20 mt-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="font-heading text-3xl uppercase text-brand-dark mb-4">Never Miss an Adventure</h3>
            <p className="text-gray-600 mb-8 text-lg">Subscribe to our newsletter for the latest travel tips, stories, and exclusive offers.</p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 rounded-full px-6 py-4 border border-gray-300 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                required
              />
              <button 
                type="button" 
                className="bg-brand-dark text-white font-bold py-4 px-10 rounded-full hover:bg-brand-green transition-colors shadow-lg uppercase tracking-wide text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
        </div>
      </section>
    </main>
  );
}
