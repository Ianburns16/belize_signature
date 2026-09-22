import { createClient } from "@/lib/supabase/server";
import { AdminMessagesClient } from "./AdminMessagesClient";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminMessagesClient initialMessages={messages || []} />;
}
