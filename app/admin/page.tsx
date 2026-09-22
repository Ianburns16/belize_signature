import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  FileText,
  MessageSquare,
  AlertCircle,
  Plus,
  ArrowRight,
  ExternalLink,
  Edit3,
  Calendar,
  CheckCircle2,
  Circle,
  ImageOff,
  Sparkles,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: toursCount },
    { count: blogsCount },
    { count: messagesCount },
    { count: unreadMessagesCount },
    { data: recentMessages },
    { data: recentTours },
  ] = await Promise.all([
    supabase.from("tours").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
    supabase.from("contact").select("*", { count: "exact", head: true }),
    supabase.from("contact").select("*", { count: "exact", head: true }).eq("contacted", false),
    supabase
      .from("contact")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("tours")
      .select("*, tour_categories(name), tour_images(image_path, is_primary)")
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-brand-dark to-[#2c3834] p-6 sm:p-8 rounded-3xl text-white shadow-lg">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-brand-orange mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Operations Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading uppercase tracking-wide">
            Belize Signature Admin
          </h1>
          <p className="text-white/70 text-sm mt-1 max-w-xl">
            Manage your expedition tours, photography, blog articles, and customer inquiries in one unified portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/tours/create"
            className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-orange/90 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Tour
          </Link>
          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-2 bg-white/15 text-white hover:bg-white/25 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
          >
            <Plus className="w-4 h-4" /> New Blog
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all"
            title="Open Live Website"
          >
            <ExternalLink className="w-4 h-4" /> Live Site
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Tours */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Tours</span>
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-brand-dark">{toursCount ?? 0}</p>
          <Link
            href="/admin/tours"
            className="text-brand-orange text-xs font-semibold mt-4 inline-flex items-center gap-1 hover:underline"
          >
            Manage tours <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Blogs */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Blog Posts</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-brand-dark">{blogsCount ?? 0}</p>
          <Link
            href="/admin/blogs"
            className="text-brand-orange text-xs font-semibold mt-4 inline-flex items-center gap-1 hover:underline"
          >
            Manage blogs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Total Messages */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200/80 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Inquiries</span>
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-brand-dark">{messagesCount ?? 0}</p>
          <Link
            href="/admin/messages"
            className="text-brand-orange text-xs font-semibold mt-4 inline-flex items-center gap-1 hover:underline"
          >
            View all messages <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Unread Messages */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl shadow-xs border border-brand-orange/30 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Needs Response</span>
            <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-xs">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-brand-orange">{unreadMessagesCount ?? 0}</p>
          <Link
            href="/admin/messages"
            className="text-brand-dark text-xs font-bold mt-4 inline-flex items-center gap-1 hover:text-brand-orange"
          >
            Respond immediately <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries & Recent Tours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-orange" />
                Recent Inquiries
              </h2>
              <p className="text-xs text-gray-400">Latest messages from potential guests</p>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs text-brand-orange hover:underline font-semibold"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentMessages && recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-brand-dark truncate">
                        {msg.name || "Guest"}
                      </span>
                      {msg.contacted ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full font-semibold">
                          <Circle className="w-3 h-3" /> New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {msg.question || "No details"}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 pt-1">
                    {msg.email && (
                      <a
                        href={`mailto:${msg.email}?subject=Re:%20Belize%20Signature%20Adventures`}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-brand-orange hover:text-white text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Reply
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">No inquiries yet.</p>
            )}
          </div>
        </div>

        {/* Recent Tours Overview */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-green" />
                Featured Tours
              </h2>
              <p className="text-xs text-gray-400">Active tours with primary imagery</p>
            </div>
            <Link
              href="/admin/tours"
              className="text-xs text-brand-orange hover:underline font-semibold"
            >
              Manage Tours &rarr;
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {recentTours && recentTours.length > 0 ? (
              recentTours.map((tour) => {
                const primaryImage =
                  tour.tour_images?.find((img: any) => img.is_primary)?.image_path ||
                  tour.tour_images?.[0]?.image_path;

                return (
                  <div key={tour.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        {primaryImage ? (
                          <Image src={primaryImage} alt={tour.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <ImageOff className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-brand-dark truncate">{tour.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                          <span className="text-brand-green font-bold">${tour.price}</span>
                          <span>•</span>
                          <span>{tour.tour_categories?.name || "Tour"}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/admin/tours/edit?id=${tour.id}`}
                      className="shrink-0 p-2 text-gray-400 hover:text-brand-dark hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit Tour & Swap Image"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-400 py-6 text-center">No tours added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
