"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, ExternalLink, Edit3, ImageOff, Eye, EyeOff, Calendar, User } from "lucide-react";
import { DeleteBlogButton } from "./DeleteBlogButton";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  author: string;
  email: string;
  published: boolean;
  published_at?: string;
  created_at: string;
}

interface AdminBlogsClientProps {
  initialBlogs: BlogItem[];
}

export function AdminBlogsClient({ initialBlogs }: AdminBlogsClientProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.slug.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && blog.published) ||
        (statusFilter === "draft" && !blog.published);

      return matchesSearch && matchesStatus;
    });
  }, [initialBlogs, search, statusFilter]);

  const publishedCount = initialBlogs.filter((b) => b.published).length;
  const draftCount = initialBlogs.length - publishedCount;

  return (
    <div className="space-y-6">
      {/* Header & New Post Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
            Blog Posts
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Write travel guides, insider tips, and updates for travelers.
          </p>
        </div>

        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 bg-brand-orange text-white px-5 py-3 rounded-xl font-bold hover:bg-brand-orange/90 transition-all shadow-md active:scale-95 shrink-0"
        >
          <Plus className="w-5 h-5" /> New Blog Post
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, author, or slug..."
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

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-semibold self-stretch sm:self-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === "all" ? "bg-white text-brand-dark shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            All <span className="text-[10px] px-1.5 py-0.2 bg-gray-200 rounded-full">{initialBlogs.length}</span>
          </button>
          <button
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === "published" ? "bg-white text-green-700 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Published <span className="text-[10px] px-1.5 py-0.2 bg-green-100 text-green-800 rounded-full">{publishedCount}</span>
          </button>
          <button
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              statusFilter === "draft" ? "bg-white text-gray-800 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
            Drafts <span className="text-[10px] px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded-full">{draftCount}</span>
          </button>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-4 pl-6">Article &amp; Cover</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50/70 transition-colors group">
                    {/* Cover & Title */}
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-18 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          {blog.image_url ? (
                            <Image
                              src={blog.image_url}
                              alt={blog.title}
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
                            {blog.title}
                          </h3>
                          <p className="text-xs text-gray-400 font-mono line-clamp-1 mt-0.5">
                            /blog/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-xs font-bold">
                          {blog.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{blog.author}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4 whitespace-nowrap">
                      {blog.published ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200/60 text-xs font-bold uppercase tracking-wider">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-xs font-bold uppercase tracking-wider">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="p-4 whitespace-nowrap text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          {new Date(blog.published_at || blog.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {blog.published && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-1.5 text-gray-400 hover:text-brand-dark rounded-lg hover:bg-gray-100 transition-colors"
                            title="View Live Blog Post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blogs/edit?id=${blog.id}`}
                          className="px-3 py-1.5 bg-brand-dark text-white text-xs font-semibold rounded-lg hover:bg-brand-dark/85 transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </Link>
                        <DeleteBlogButton id={blog.id} blogTitle={blog.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="font-semibold text-gray-700">No blog posts found</p>
                      <p className="text-xs text-gray-400">
                        {search || statusFilter !== "all"
                          ? "Try changing your search terms or status filter."
                          : "No blog posts exist in the database yet."}
                      </p>
                      {(search || statusFilter !== "all") && (
                        <button
                          onClick={() => {
                            setSearch("");
                            setStatusFilter("all");
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
