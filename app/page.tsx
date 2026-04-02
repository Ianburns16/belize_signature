import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map, ShieldCheck, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  let tours = null;
  const isEnvValid = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http');

  if (isEnvValid) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.from("tours").select("*, tour_images(image_path, is_primary)").limit(3);
      tours = data;
    } catch (e) {
      console.warn("Supabase placeholder: Please update .env.local to connect to your real database.");
    }
  }

  // Fallback to mock data if no connection or no tours
  const featuredTours = tours?.length ? tours : [
    { id: "1", title: "ATM Cave Expedition", description: "Journey into the Maya underworld in the famous Actun Tunichil Muknal.", price: 120 },
    { id: "2", title: "Xunantunich Ruins & Cave Tubing", description: "Climb ancient temples and float through sacred limestone caves.", price: 95 },
    { id: "3", title: "Mountain Pine Ridge Safari", description: "Explore cascading waterfalls and majestic pine forests.", price: 85 },
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pine-ridge.jpg"
            alt="Beautiful Belize Landscape"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 uppercase tracking-wider drop-shadow-md pb-4">
            Where Every Adventure Is
          </h1>
          <p className="font-script text-5xl md:text-7xl text-brand-orange mb-8 -mt-8 rotate-[-2deg] drop-shadow-lg">
            Uniquely Yours
          </p>
          <p className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-lg md:text-xl py-3 px-8 rounded-full mb-10 max-w-2xl text-center">
            Experience the magic of Belize with premium guided tours.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href="/tours"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105 shadow-xl"
            >
              Explore Our Tours
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg transition-all"
            >
              Custom Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-green/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl mb-4 text-brand-dark uppercase tracking-wide">The Signature Experience</h2>
            <div className="h-1 w-24 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-lg text-brand-grey max-w-2xl mx-auto">
              We go beyond the ordinary to deliver unforgettable memories. Here is what sets us apart.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-grey/20 flex flex-col items-center text-center transform transition duration-300 hover:-translate-y-2">
              <div className="bg-brand-orange/10 p-4 rounded-full mb-6 text-brand-orange">
                <Map className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading uppercase text-brand-dark">Local Expertise</h3>
              <p className="text-brand-grey">Our guides are born and raised in Belize, sharing hidden gems and rich history you won't find in guidebooks.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-grey/20 flex flex-col items-center text-center transform transition duration-300 hover:-translate-y-2">
              <div className="bg-brand-green/10 p-4 rounded-full mb-6 text-brand-green">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading uppercase text-brand-dark">Premium Safety</h3>
              <p className="text-brand-grey">Top-tier equipment and rigorous safety standards ensure your peace of mind on every adventure.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-grey/20 flex flex-col items-center text-center transform transition duration-300 hover:-translate-y-2">
              <div className="bg-brand-grey/10 p-4 rounded-full mb-6 text-brand-dark">
                <Star className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading uppercase text-brand-dark">Personalized Care</h3>
              <p className="text-brand-grey">Small group sizes and VIP treatment mean you are never just a number on our tours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl mb-4 text-brand-dark uppercase tracking-wide">Featured Adventures</h2>
          <div className="h-1 w-24 bg-brand-green mx-auto rounded-full mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {featuredTours.map((tour) => {
              const primaryImage = tour.tour_images?.find((img: any) => img.is_primary)?.image_path 
                || tour.tour_images?.[0]?.image_path 
                || `/images/after-atm.jpg`; // Fallback image for now

              return (
              <div key={tour.id} className="group rounded-2xl overflow-hidden border border-brand-grey/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-white">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={primaryImage}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-brand-orange text-white px-4 py-1 rounded-full font-bold shadow-md">
                    ${tour.price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 font-heading uppercase text-brand-dark line-clamp-2">{tour.title}</h3>
                  <p className="text-brand-grey mb-6 flex-grow line-clamp-3">{tour.description}</p>
                  <Link
                    href={`/tours/${tour.id}`}
                    className="mt-auto inline-flex items-center text-brand-green font-semibold hover:text-brand-orange transition-colors"
                  >
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            )})}
          </div>

          <div className="mt-16">
            <Link
              href="/tours"
              className="inline-flex items-center justify-center bg-brand-dark text-white font-bold py-4 px-10 rounded-full hover:bg-brand-green transition-colors shadow-lg"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Container */}
      <section className="relative py-24 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/cahcal-pech.jpg" alt="Maya Ruins background" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-script text-6xl md:text-7xl text-brand-orange mb-6">Ready to Explore?</h2>
          <p className="text-white text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Book your signature experience today and discover the wonders of Belize with our expert guides.
          </p>
          <Link href="/contact" className="bg-brand-green hover:bg-brand-orange text-white font-bold py-4 px-12 rounded-full text-lg transition-colors shadow-2xl">
            Contact Us Now
          </Link>
        </div>
      </section>
    </main>
  );
}
