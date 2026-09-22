"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, ExternalLink, Edit3, ImageOff, Filter, MapPin, Users } from "lucide-react";
import { DeleteTourButton } from "./DeleteTourButton";

interface TourItem {
  id: string;
  title: string;
  description: string;
  price: number;
  total_seats: number;
  category_id: string;
  created_at: string;
  tour_categories?: { name: string } | null;
  tour_images?: { image_path: string; is_primary: boolean }[];
}

interface AdminToursClientProps {
  initialTours: TourItem[];
  categories: { id: string; name: string }[];
}

export function AdminToursClient({ initialTours, categories }: AdminToursClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTours = useMemo(() => {
    return initialTours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(search.toLowerCase()) ||
        tour.description?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || tour.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialTours, search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
            Tour Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, edit, organize tours and swap featured photography.
          </p>
        </div>

        <Link
          href="/admin/tours/create"
          className="flex items-center gap-2 bg-brand-orange text-white px-5 py-3 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-5 h-5" /> Add New Tour
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tours by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange outline-none focus:bg-white transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-brand-orange outline-none cursor-pointer"
          >
            <option value="all">All Categories ({initialTours.length})</option>
            {categories.map((cat) => {
              const count = initialTours.filter((t) => t.category_id === cat.id).length;
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({count})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-4 pl-6">Tour &amp; Image</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Capacity</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTours.length > 0 ? (
                filteredTours.map((tour) => {
                  const primaryImage =
                    tour.tour_images?.find((img) => img.is_primary)?.image_path ||
                    tour.tour_images?.[0]?.image_path;

                  return (
                    <tr key={tour.id} className="hover:bg-gray-50/70 transition-colors group">
                      {/* Image & Title */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="relative w-18 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            {primaryImage ? (
                              <Image
                                src={primaryImage}
                                alt={tour.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 text-[10px]">
                                <ImageOff className="w-3.5 h-3.5 mb-0.5" />
                                No Img
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-brand-dark text-base group-hover:text-brand-orange transition-colors line-clamp-1">
                              {tour.title}
                            </h3>
                            <p className="text-xs text-gray-400 line-clamp-1 mt-0.5 max-w-md">
                              {tour.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-md border border-brand-orange/20">
                          {tour.tour_categories?.name || "Uncategorized"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-brand-green font-bold text-base">
                          ${Number(tour.price).toFixed(2)}
                        </span>
                        <span className="text-[11px] text-gray-400 block">USD / person</span>
                      </td>

                      {/* Seats */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          <span>{tour.total_seats} seats</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/tours/${tour.id}`}
                            target="_blank"
                            className="p-1.5 text-gray-400 hover:text-brand-dark rounded-lg hover:bg-gray-100 transition-colors"
                            title="View on Public Site"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/tours/edit?id=${tour.id}`}
                            className="px-3 py-1.5 bg-brand-dark text-white text-xs font-semibold rounded-lg hover:bg-brand-dark/85 transition-colors flex items-center gap-1.5 shadow-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </Link>
                          <DeleteTourButton id={tour.id} tourTitle={tour.title} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-gray-700">No tours found</p>
                      <p className="text-xs text-gray-400">
                        {search || selectedCategory !== "all"
                          ? "Try clearing your search filters to find what you're looking for."
                          : "No tours exist in the database yet."}
                      </p>
                      {(search || selectedCategory !== "all") && (
                        <button
                          onClick={() => {
                            setSearch("");
                            setSelectedCategory("all");
                          }}
                          className="text-xs text-brand-orange hover:underline font-semibold"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
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
