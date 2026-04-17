import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  let tours = null;
  const isEnvValid = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http');
  
  if (isEnvValid) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("tours").select("*, tour_images(image_path, is_primary)");
      tours = data;
    } catch (e) {
      console.warn("Supabase placeholder: Please update .env.local to connect to your real database.");
    }
  }

  // Fallback to mock data if no connection or no tours
  const allTours = tours?.length ? tours : [
    { id: "1", title: "ATM Cave Expedition", description: "Journey into the Maya underworld in the famous Actun Tunichil Muknal.", price: 120 },
    { id: "2", title: "Xunantunich Ruins & Cave Tubing", description: "Climb ancient temples and float through sacred limestone caves.", price: 95 },
    { id: "3", title: "Mountain Pine Ridge Safari", description: "Explore cascading waterfalls and majestic pine forests.", price: 85 },
    { id: "4", title: "Altun Ha & Belize City", description: "Discover the iconic Jade Head and the history of Belize's former capital.", price: 75 },
    { id: "5", title: "Lamanai River Safari", description: "Cruise the New River to reach the spectacular submerged crocodile city.", price: 110 },
  ];

  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/after-atm.jpg"
            alt="Belize Adventures"
            fill
            sizes="100vw"
            className="object-cover animate-pulse-slow lg:scale-105 lg:animate-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16 animate-float">
          <h1 className="font-heading text-6xl md:text-8xl text-white mb-6 uppercase tracking-wider drop-shadow-xl">
            Our <span className="text-brand-orange font-script capitalize drop-shadow-2xl">Signature</span> Tours
          </h1>
          <div className="h-1 w-24 bg-brand-green rounded-full mb-8" />
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl text-shadow-sm">
            Browse our curated selection of Belize's finest adventures. Each tour is crafted to provide a unique and authentic experience.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allTours.map((tour) => {
              const primaryImage = tour.tour_images?.find((img: any) => img.is_primary)?.image_path 
                || tour.tour_images?.[0]?.image_path 
                || `/images/guides.jpg`; // Fallback image wrapper

              return (
              <div key={tour.id} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col bg-white border border-gray-100">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={primaryImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-brand-green text-white px-5 py-2 rounded-full font-bold shadow-md">
                    ${tour.price}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4 font-heading uppercase text-brand-dark line-clamp-2">{tour.title}</h3>
                  <p className="text-brand-grey mb-8 flex-grow leading-relaxed line-clamp-3">{tour.description}</p>
                  <Link
                    href={`/tours/${tour.id}`}
                    className="mt-auto flex items-center justify-center w-full py-3 bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-semibold rounded-xl transition-colors duration-300 group-hover:shadow-md"
                  >
                    View Experience <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>
    </main>
  );
}
