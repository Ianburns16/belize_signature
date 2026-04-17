import { createClient } from "@/lib/supabase/server";
import { updateTour } from "@/app/actions/tours";
import { notFound } from "next/navigation";
import { TourForm } from "../TourForm";

export default async function EditTourPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  if (!id) notFound();

  const supabase = await createClient();
  const [{ data: tour }, { data: categories }] = await Promise.all([
    supabase.from("tours").select("*, tour_images(*)").eq("id", id).single(),
    supabase.from("tour_categories").select("*").order("name"),
  ]);

  if (!tour) notFound();

  const updateTourWithId = updateTour.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading text-brand-dark uppercase mb-8">Edit Tour</h1>
      <TourForm 
        action={updateTourWithId} 
        categories={categories || []} 
        initialData={tour} 
        buttonText="Save Changes" 
      />
    </div>
  );
}
