import Image from "next/image";

export default function TermsPage() {
  return (
    <main className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/guides.jpg"
            alt="Terms and Conditions"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-slate-50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16">
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-6 uppercase tracking-wider drop-shadow-xl">
            Terms & <span className="text-brand-orange">Conditions</span>
          </h1>
          <div className="h-1 w-24 bg-brand-orange rounded-full" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-brand-grey/10 prose prose-brand lg:prose-lg max-w-none text-brand-grey">
            <p className="lead text-xl text-brand-dark mb-10">
              Welcome to Belize Signature Experience. Please read these terms carefully before booking your tour to ensure a smooth and enjoyable adventure.
            </p>
            
            <h3 className="text-2xl font-bold mt-12 mb-6 text-brand-dark font-heading uppercase">1. Booking & Payment</h3>
            <p>
              All bookings require a 50% deposit to secure your reservation. Full payment is due 48 hours before the tour start date. We accept major credit cards and secure online payments. Failure to complete payment may result in the cancellation of your booking.
            </p>
            
            <h3 className="text-2xl font-bold mt-12 mb-6 text-brand-dark font-heading uppercase">2. Cancellation Policy</h3>
            <p>
              We understand plans change. Cancellations made more than 7 days in advance receive a full refund minus processing fees. Cancellations within 48 hours are non-refundable. In the event of extreme weather, we offer free rescheduling or a full refund.
            </p>
            
            <h3 className="text-2xl font-bold mt-12 mb-6 text-brand-dark font-heading uppercase">3. Liability & Safety</h3>
            <p>
              Adventure tourism carries inherent risks. While our guides prioritize safety and provide top-tier equipment, all participants will be required to sign a liability waiver prior to engaging in any activity. Participants must inform guides of any medical conditions beforehand.
            </p>

            <h3 className="text-2xl font-bold mt-12 mb-6 text-brand-dark font-heading uppercase">4. Code of Conduct</h3>
            <p>
              We respect the natural environment and local communities of Belize. Participants are expected to follow guide instructions, stay on marked trails, and refrain from damaging flora, fauna, or ancient artifacts. We reserve the right to terminate a tour without refund if a guest's behavior is unsafe or highly disruptive.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
