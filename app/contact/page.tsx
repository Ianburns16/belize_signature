export default function ContactPage() {
  return (
    <main className="flex-1 py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-heading text-5xl text-brand-dark mb-10 uppercase">Contact Us</h1>
        <p className="text-lg text-brand-grey mb-8">Have a question or want to book a custom tour? Drop us a line.</p>
        <form className="space-y-6 text-left">
           <div>
             <label className="block text-sm font-semibold mb-2">Name</label>
             <input type="text" className="w-full p-3 border rounded-xl" />
           </div>
           <div>
             <label className="block text-sm font-semibold mb-2">Email</label>
             <input type="email" className="w-full p-3 border rounded-xl" />
           </div>
           <div>
             <label className="block text-sm font-semibold mb-2">Message</label>
             <textarea rows={5} className="w-full p-3 border rounded-xl"></textarea>
           </div>
           <button type="button" className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold">Send Message</button>
        </form>
      </div>
    </main>
  );
}
