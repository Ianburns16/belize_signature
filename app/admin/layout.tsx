import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Map, 
  FileText, 
  LogOut,
  Menu
} from "lucide-react";
import { LogoutButton } from "@/components/logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/dashboard/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-heading text-brand-orange uppercase">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <MessageSquare className="w-5 h-5" /> Messages
          </Link>
          <Link href="/admin/tours" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <Map className="w-5 h-5" /> Tours
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <FileText className="w-5 h-5" /> Blogs
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b p-4 flex justify-between items-center md:hidden">
           <h2 className="text-xl font-heading text-brand-dark uppercase">Admin Panel</h2>
           <button className="p-2"><Menu className="w-6 h-6" /></button>
        </header>
        <main className="p-6 lg:p-10 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
