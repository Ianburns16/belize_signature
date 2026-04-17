import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: toursCount },
    { count: blogsCount },
    { count: messagesCount },
    { count: unreadMessagesCount }
  ] = await Promise.all([
    supabase.from("tours").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("contact").select("*", { count: "exact", head: true }),
    supabase.from("contact").select("*", { count: "exact", head: true }).eq("contacted", false),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-heading text-brand-dark mb-8 uppercase">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Total Tours</h3>
          <p className="text-4xl font-bold text-brand-dark">{toursCount ?? 0}</p>
          <Link href="/admin/tours" className="text-brand-orange text-sm font-semibold mt-4 inline-block hover:underline">Manage Tours &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Total Blogs</h3>
          <p className="text-4xl font-bold text-brand-dark">{blogsCount ?? 0}</p>
          <Link href="/admin/blogs" className="text-brand-orange text-sm font-semibold mt-4 inline-block hover:underline">Manage Blogs &rarr;</Link>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Total Messages</h3>
          <p className="text-4xl font-bold text-brand-dark">{messagesCount ?? 0}</p>
          <Link href="/admin/messages" className="text-brand-orange text-sm font-semibold mt-4 inline-block hover:underline">View Messages &rarr;</Link>
        </div>

        <div className="bg-brand-orange/10 p-6 rounded-xl shadow-sm border border-brand-orange/20">
          <h3 className="text-brand-orange font-medium mb-2">Unread Messages</h3>
          <p className="text-4xl font-bold text-brand-orange">{unreadMessagesCount ?? 0}</p>
          <Link href="/admin/messages" className="text-brand-orange text-sm font-semibold mt-4 inline-block hover:underline">Respond Now &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
