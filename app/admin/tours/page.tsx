import { createClient } from "@/lib/supabase/server";
import { AdminToursClient } from "./AdminToursClient";

export default async function AdminToursPage() {
  const supabase = await createClient();

  const [{ data: tours }, { data: categories }] = await Promise.all([
    supabase
      .from("tours")
      .select("*, tour_categories(name), tour_images(image_path, is_primary)")
      .order("created_at", { ascending: false }),
    supabase
      .from("tour_categories")
      .select("id, name")
      .order("name"),
  ]);

  return (
    <AdminToursClient
      initialTours={tours || []}
      categories={categories || []}
    />
  );
}
