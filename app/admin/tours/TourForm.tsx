"use client";

import { useActionState } from "react";
import Image from "next/image";

interface TourFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  categories: any[];
  initialData?: any;
  buttonText: string;
}

export function TourForm({ action, categories, initialData, buttonText }: TourFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  const primaryImage = initialData?.tour_images?.find((img: any) => img.is_primary);

  return (
    <form action={formAction} className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm">
          {state.error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="title">Title</label>
        <input required id="title" name="title" type="text" defaultValue={initialData?.title} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="ATM Cave Expedition" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="category_id">Category</label>
        <select required id="category_id" name="category_id" defaultValue={initialData?.category_id} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white">
          <option value="">Select a category...</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {categories.length === 0 && (
          <p className="text-xs text-red-500 mt-1">No categories found. Please add categories to the database first.</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="description">Description</label>
        <textarea required id="description" name="description" rows={5} defaultValue={initialData?.description} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none" placeholder="Describe the tour experience..."></textarea>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="image">Tour Image</label>
        {primaryImage && (
          <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 mb-2">
            <Image src={primaryImage.image_path} alt="Current" fill className="object-cover" />
          </div>
        )}
        <input id="image" name="image" type="file" accept="image/*" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="price">Price (USD)</label>
          <input required id="price" name="price" type="number" step="0.01" min="0" defaultValue={initialData?.price} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="120.00" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="total_seats">Total Seats</label>
          <input required id="total_seats" name="total_seats" type="number" min="1" defaultValue={initialData?.total_seats} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="12" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button disabled={isPending} type="submit" className="bg-brand-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors disabled:opacity-50">
          {isPending ? "Saving..." : buttonText}
        </button>
        <a href="/admin/tours" className="bg-gray-100 text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          Cancel
        </a>
      </div>
    </form>
  );
}
