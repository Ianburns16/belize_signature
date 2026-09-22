"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { DollarSign, Users, Tag, AlertCircle, Loader2 } from "lucide-react";

interface TourFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  categories: any[];
  initialData?: any;
  buttonText: string;
}

export function TourForm({ action, categories, initialData, buttonText }: TourFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  const currentImageUrl =
    initialData?.tour_images?.find((img: any) => img.is_primary)?.image_path ||
    initialData?.tour_images?.[0]?.image_path;

  return (
    <form action={formAction} className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to save tour</p>
            <p className="text-red-600 mt-0.5">{state.error}</p>
          </div>
        </div>
      )}

      {/* Tour Title */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="title">
          Tour Title <span className="text-brand-orange">*</span>
        </label>
        <input
          required
          id="title"
          name="title"
          type="text"
          defaultValue={initialData?.title}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-base"
          placeholder="e.g. ATM Cave Expedition &amp; Jungle Trek"
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5" htmlFor="category_id">
          <Tag className="w-4 h-4 text-brand-orange" />
          Category <span className="text-brand-orange">*</span>
        </label>
        <div className="relative">
          <select
            required
            id="category_id"
            name="category_id"
            defaultValue={initialData?.category_id || ""}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors appearance-none cursor-pointer text-base"
          >
            <option value="">Select a category...</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            ▼
          </div>
        </div>
        {categories.length === 0 && (
          <p className="text-xs text-red-500 mt-1">No categories found in database. Please ensure categories are populated.</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="description">
          Description <span className="text-brand-orange">*</span>
        </label>
        <textarea
          required
          id="description"
          name="description"
          rows={5}
          defaultValue={initialData?.description}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors resize-none leading-relaxed text-base"
          placeholder="Describe the tour itinerary, highlights, and experience in Belize..."
        ></textarea>
      </div>

      {/* Price & Seats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1" htmlFor="price">
            <DollarSign className="w-4 h-4 text-brand-green" /> Price (USD) <span className="text-brand-orange">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">$</span>
            <input
              required
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={initialData?.price}
              className="w-full pl-8 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-base font-medium"
              placeholder="125.00"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5" htmlFor="total_seats">
            <Users className="w-4 h-4 text-brand-orange" /> Total Seats <span className="text-brand-orange">*</span>
          </label>
          <input
            required
            id="total_seats"
            name="total_seats"
            type="number"
            min="1"
            max="100"
            defaultValue={initialData?.total_seats || 10}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-base font-medium"
            placeholder="10"
          />
        </div>
      </div>

      {/* Tour Image with ImageUploader */}
      <div className="pt-2 border-t border-gray-100">
        <ImageUploader
          name="image"
          urlName="image_url"
          label="Tour Primary Image"
          initialImageUrl={currentImageUrl}
          helperText="Upload a high-resolution landscape photo for the tour card and hero banner. Recommended: 1600x900px or higher."
          aspectRatio="video"
        />
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <button
          disabled={isPending}
          type="submit"
          className="bg-brand-orange text-white px-8 py-3.5 rounded-xl font-bold tracking-wide hover:bg-brand-orange/90 transition-all active:scale-[0.99] disabled:opacity-50 shadow-md flex items-center gap-2"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? "Saving Tour..." : buttonText}
        </button>
        <Link
          href="/admin/tours"
          className="bg-gray-100 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
