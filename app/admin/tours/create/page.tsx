import { createClient } from "@/lib/supabase/server";
import { createTour } from "@/app/actions/tours";
import { TourForm } from "../TourForm";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default async function CreateTourPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("tour_categories").select("*").order("name");

  return (
    <div className="max-w-3xl space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <Link
          href="/admin/tours"
          className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-brand-orange transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Tours
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
              Add New Tour
            </h1>
            <p className="text-xs text-gray-500">
              Create an exciting new Belize expedition with descriptions, capacity, and photography.
            </p>
          </div>
        </div>
      </div>

      <TourForm 
        action={createTour} 
        categories={categories || []} 
        buttonText="Publish Tour" 
      />
    </div>
  );
}
