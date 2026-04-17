import Image from "next/image";
import { Car, Map, Users } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cahcal-pech.jpg"
            alt="Custom Belize Packages"
            fill
            sizes="100vw"
            className="object-cover animate-pulse-slow lg:scale-105 lg:animate-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16 animate-float">
          <h1 className="font-heading text-6xl md:text-8xl text-white mb-6 uppercase tracking-wider drop-shadow-xl">
            Custom <span className="text-brand-orange">Packages</span>
          </h1>
          <div className="h-1 w-24 bg-brand-orange rounded-full mb-8" />
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl text-shadow-sm">
            Beyond our standard tours, we offer bespoke itineraries tailored to your schedule, preferences, and group size. Let us build your perfect Belizean vacation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="glass p-10 rounded-3xl shadow-sm border border-brand-grey/10 hover:shadow-xl transition-all duration-300 group bg-white hover:-translate-y-2">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark font-heading uppercase">Private Transfers</h3>
              <p className="text-brand-grey leading-relaxed mb-6">
                Luxury VIP vans available for seamless transportation between the airport, hotels, and excursion sites. Travel in comfort with complimentary refreshments.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-10 rounded-3xl shadow-2xl border border-brand-orange/20 bg-brand-dark text-white transform lg:-translate-y-8 hover:-translate-y-10 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange rounded-bl-full opacity-10 group-hover:scale-110 transition-transform" />
              <div className="bg-brand-orange/20 w-16 h-16 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Map className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading text-brand-orange uppercase">Multi-Day Expeditions</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Bundle ruins, caving, and jungle tours spanning 3 to 7 days for the ultimate Belize overland adventure. We handle all logistics, lodging, and meals.
              </p>
            </div>

            {/* Service 3 */}
            <div className="glass p-10 rounded-3xl shadow-sm border border-brand-grey/10 hover:shadow-xl transition-all duration-300 group bg-white hover:-translate-y-2">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand-dark font-heading uppercase">Corporate & Groups</h3>
              <p className="text-brand-grey leading-relaxed mb-6">
                Specialized logistics, team-building exercises, and tailored excursions for large parties, retreats, and corporate events.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
