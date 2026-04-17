import Image from "next/image";
import { Users, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/guides.jpg"
            alt="Belizean Guides"
            fill
            sizes="100vw"
            className="object-cover animate-pulse-slow lg:scale-105 lg:animate-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16 animate-float">
          <h1 className="font-heading text-6xl md:text-8xl text-white mb-6 uppercase tracking-wider drop-shadow-xl">
            About Us
          </h1>
          <div className="h-1 w-24 bg-brand-orange rounded-full mb-8" />
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl text-shadow-sm">
            Discover the passion behind Belize Signature Experience. We are your local hosts to the adventure of a lifetime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl text-brand-dark uppercase tracking-wide">
                Your <span className="text-brand-orange">Belizean</span> Hosts
              </h2>
              <p className="text-lg text-brand-grey leading-relaxed">
                Founded by locals with a passion for showing off the hidden wonders of Belize, Belize Signature Experience is more than just a tour company. We are ambassadors of our culture, history, and natural beauty.
              </p>
              <p className="text-lg text-brand-grey leading-relaxed">
                We believe every adventure should be uniquely yours. Whether you are exploring ancient Maya ruins, tubing through sacred caves, or marveling at exotic wildlife, we tailor our experiences to match your sense of discovery.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="glass p-6 rounded-2xl shadow-sm border border-brand-grey/10 hover:-translate-y-1 transition-transform">
                  <div className="bg-brand-orange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">Award Winning</h3>
                  <p className="text-sm text-brand-grey">Recognized for excellence in premium tourism.</p>
                </div>
                <div className="glass p-6 rounded-2xl shadow-sm border border-brand-grey/10 hover:-translate-y-1 transition-transform">
                  <div className="bg-brand-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-brand-green" />
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">Locally Owned</h3>
                  <p className="text-sm text-brand-grey">100% Belizean company supporting local communities.</p>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/pine-ridge.jpg" alt="Scenery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/cahcal-pech.jpg" alt="Ruins" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/after-atm.jpg" alt="Adventure" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src="/images/guides.jpg" alt="Guides" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
