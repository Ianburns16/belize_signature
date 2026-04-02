import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="flex-1 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-heading text-5xl text-brand-dark mb-10 text-center uppercase">About Us</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center text-lg text-brand-grey leading-relaxed">
          <div>
            <Image src="/images/guides.jpg" alt="Our Guides" width={600} height={400} className="rounded-2xl shadow-lg" />
          </div>
          <div>
             <h2 className="text-2xl font-bold mb-4">Your Belizean Hosts</h2>
             <p className="mb-4">Founded by locals with a passion for showing off the hidden wonders of Belize, Belize Signature Experience is more than just a tour company.</p>
             <p>We believe every adventure should be uniquely yours, and we tailor our experiences to match your sense of discovery.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
