export default function ServicesPage() {
  return (
    <main className="flex-1 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="font-heading text-5xl text-brand-dark mb-10 uppercase">Custom Packages</h1>
        <p className="text-lg text-brand-grey max-w-3xl mx-auto mb-16">
          Beyond our standard tours, we offer bespoke itineraries tailored to your schedule, preferences, and group size. Let us build your perfect Belizean vacation.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
           <div className="p-8 border rounded-2xl shadow-sm">
             <h3 className="text-xl font-bold mb-4 text-brand-dark">Private Transfers</h3>
             <p className="text-brand-grey">Luxury VIP vans available for seamless transportation between the airport, hotels, and excursion sites.</p>
           </div>
           <div className="p-8 border rounded-2xl shadow-sm bg-brand-dark text-white">
             <h3 className="text-xl font-bold mb-4 font-heading text-brand-orange">Multi-Day Expeditions</h3>
             <p className="opacity-80">Bundle ruins, caving, and jungle tours spanning 3 to 7 days for the ultimate Belize overland adventure.</p>
           </div>
           <div className="p-8 border rounded-2xl shadow-sm">
             <h3 className="text-xl font-bold mb-4 text-brand-dark">Corporate & Groups</h3>
             <p className="text-brand-grey">Specialized logistics, team-building exercises, and tailored excursions for large parties.</p>
           </div>
        </div>
      </div>
    </main>
  );
}
