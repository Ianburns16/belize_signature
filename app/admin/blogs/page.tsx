import { createClient } from "@/lib/supabase/server";
import { AdminBlogsClient } from "./AdminBlogsClient";

export default async function AdminBlogsPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminBlogsClient initialBlogs={blogs || []} />;
}
