import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const [{ data: authData, error }, { count: unreadCount }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("contact").select("*", { count: "exact", head: true }).eq("contacted", false),
  ]);

  if (error || !authData?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8faf9]">
      {/* Sidebar with active link states & mobile drawer */}
      <AdminSidebar
        userEmail={authData.user.email}
        unreadCount={unreadCount ?? 0}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-4 sm:p-6 lg:p-10 flex-1 overflow-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
