import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DeleteTourButton } from "./DeleteTourButton";

export default async function AdminToursPage() {
  const supabase = await createClient();
  const { data: tours } = await supabase
    .from("tours")
    .select("*, tour_categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-brand-dark uppercase">Tours</h1>
        <Link
          href="/admin/tours/create"
          className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Tour
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Seats</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours && tours.length > 0 ? (
                tours.map((tour) => (
                  <tr key={tour.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-brand-dark">{tour.title}</td>
                    <td className="p-4 text-sm text-gray-500">{tour.tour_categories?.name ?? "—"}</td>
                    <td className="p-4 text-brand-green font-semibold">${tour.price}</td>
                    <td className="p-4 text-gray-500">{tour.total_seats}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Link
                        href={`/admin/tours/edit?id=${tour.id}`}
                        className="px-3 py-1.5 bg-brand-dark text-white text-sm rounded-lg hover:bg-brand-dark/80 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteTourButton id={tour.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No tours yet. <Link href="/admin/tours/create" className="text-brand-orange hover:underline">Add one now</Link>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
