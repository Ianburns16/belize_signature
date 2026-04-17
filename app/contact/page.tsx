import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/pine-ridge.jpg"
            alt="Contact Belize Signature Experience"
            fill
            sizes="100vw"
            className="object-cover animate-pulse-slow lg:scale-105 lg:animate-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-slate-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16 animate-float">
          <h1 className="font-heading text-6xl md:text-8xl text-white mb-6 uppercase tracking-wider drop-shadow-xl">
            Get in <span className="text-brand-orange">Touch</span>
          </h1>
          <div className="h-1 w-24 bg-brand-orange rounded-full mb-8" />
          <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl text-shadow-sm">
            Ready to plan your unforgettable adventure? Drop us a line and let's start crafting your signature experience.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-grey/10 flex flex-col lg:flex-row">
            
            {/* Left Info Panel */}
            <div className="lg:w-2/5 bg-brand-dark p-12 lg:p-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange rounded-bl-full opacity-10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-green rounded-tr-full opacity-10" />
              
              <div className="relative z-10 h-full flex flex-col">
                <h2 className="text-3xl font-heading uppercase mb-4 text-white">Contact Information</h2>
                <p className="text-gray-300 mb-12">Fill out the form and our team will get back to you within 24 hours.</p>
                
                <div className="space-y-8 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-orange/20 p-3 rounded-full shrink-0">
                      <Phone className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phone</h4>
                      <p className="text-gray-300">+501 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-green/20 p-3 rounded-full shrink-0">
                      <Mail className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <p className="text-gray-300">info@belizesignature.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-full shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Location</h4>
                      <p className="text-gray-300">Belize City, Belize<br/>Central America</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="lg:w-3/5 p-12 lg:p-16 bg-white">
              <h2 className="text-3xl font-heading uppercase mb-8 text-brand-dark">Send a Message</h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
