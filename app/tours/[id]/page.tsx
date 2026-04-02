import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Users, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params if using Next.js 15+ 
  const { id: idValue } = await params;

  let tour = null;
  const isEnvValid = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http');

  if (isEnvValid) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("tours")
        .select("*, tour_categories(name), tour_images(image_path, is_primary)")
        .eq("id", idValue)
        .single();
      tour = data;
    } catch (e) {
      console.warn("Supabase placeholder: Please update .env.local to connect to your real database.");
    }
  }

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-heading text-brand-dark mb-4 uppercase">Tour Not Found</h1>
        <p className="text-brand-grey mb-8">The tour you are looking for does not exist or is currently unavailable.</p>
        <Link href="/tours" className="bg-brand-orange text-white font-bold py-3 px-8 rounded-xl transition-transform hover:scale-105 shadow-md">
          Back to Tours
        </Link>
      </div>
    );
  }

  const primaryImage = tour.tour_images?.find((img: any) => img.is_primary)?.image_path
    || tour.tour_images?.[0]?.image_path;

  return (
    <main className="flex-1 bg-gray-50 flex flex-col">
      {/* Hero Image */}
      <section className="relative w-full h-[60vh] max-h-[500px]">
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={tour.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/tours" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" /> Back to Tours
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-block px-4 py-1.5 bg-brand-orange text-white text-sm font-bold rounded-full uppercase tracking-wider mb-4">
                  {tour.tour_categories?.name || "Adventure"}
                </div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-wide">
                  {tour.title}
                </h1>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl md:w-72 flex-shrink-0 text-center">
                <div className="text-white text-lg mb-2">Starting at</div>
                <div className="text-4xl font-bold text-brand-green mb-4">${tour.price} <span className="text-sm font-normal opacity-70">per person</span></div>
                <button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-3 px-6 rounded-xl transition-transform hover:scale-105 shadow-md">
                  Book This Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-heading text-brand-dark uppercase tracking-wide mb-6">Overview</h2>
              <p className="text-lg text-brand-grey leading-relaxed whitespace-pre-wrap">
                {tour.description}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">What's Included</h2>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Professional local guide",
                  "All park entrance fees",
                  "Transportation from hotel",
                  "Safety equipment (helmets, lights)",
                  "Lunch & Bottled water",
                  "Tax & handling fees"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-brand-grey text-lg">
                    <CheckCircle2 className="w-6 h-6 text-brand-green mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-grey/20">
              <h3 className="text-xl font-heading text-brand-dark uppercase tracking-wide mb-6">Tour Details</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-brand-orange mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-dark">Duration</div>
                    <div className="text-brand-grey">Full Day (Approx. 8 hours)</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-brand-orange mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-dark">Location</div>
                    <div className="text-brand-grey">Cayo District</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-brand-orange mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-dark">Group Size</div>
                    <div className="text-brand-grey">Max {tour.total_seats || 10} people per guide</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-brand-orange mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-brand-dark">Availability</div>
                    <div className="text-brand-grey">Daily (Weather permiting)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
