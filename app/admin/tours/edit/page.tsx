import { createClient } from "@/lib/supabase/server";
import { updateTour } from "@/app/actions/tours";
import { notFound } from "next/navigation";
import { TourForm } from "../TourForm";
import Link from "next/link";
import { ArrowLeft, Compass, ExternalLink } from "lucide-react";

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
    <div className="max-w-3xl space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/admin/tours"
            className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Tours
          </Link>
          <Link
            href={`/tours/${id}`}
            target="_blank"
            className="inline-flex items-center text-xs font-semibold text-brand-dark/70 hover:text-brand-orange transition-colors"
          >
            View on Live Site <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
              Edit Tour
            </h1>
            <p className="text-xs text-gray-500">
              Update tour details, adjust pricing/seats, or swap featured images.
            </p>
          </div>
        </div>
      </div>

      <TourForm 
        action={updateTourWithId} 
        categories={categories || []} 
        initialData={tour} 
        buttonText="Save Tour Changes" 
      />
    </div>
  );
}
