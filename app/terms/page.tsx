export default function TermsPage() {
  return (
    <main className="flex-1 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 prose lg:prose-lg text-brand-grey">
        <h1 className="font-heading text-4xl text-brand-dark uppercase">Terms & Conditions</h1>
        <p>Welcome to Belize Signature Experience. Please read these terms carefully before booking your tour.</p>
        <h3 className="text-xl font-bold mt-8 mb-4 text-brand-dark">Booking & Payment</h3>
        <p>All bookings require a 50% deposit. Full payment is due 48 hours before the tour start date. We accept major credit cards.</p>
        <h3 className="text-xl font-bold mt-8 mb-4 text-brand-dark">Cancellation Policy</h3>
        <p>Cancellations made more than 7 days in advance receive a full refund. Cancellations within 48 hours are non-refundable.</p>
        <h3 className="text-xl font-bold mt-8 mb-4 text-brand-dark">Liability</h3>
        <p>Adventure tourism carries inherent risks. You will be required to sign a liability waiver prior to participating in any activity.</p>
      </div>
    </main>
  );
}
