import { createClient } from "@/lib/supabase/server";
import { createTour } from "@/app/actions/tours";
import { TourForm } from "../TourForm";

export default async function CreateTourPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("tour_categories").select("*").order("name");

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-heading text-brand-dark uppercase mb-8">Add New Tour</h1>
      <TourForm 
        action={createTour} 
        categories={categories || []} 
        buttonText="Create Tour" 
      />
    </div>
  );
}
