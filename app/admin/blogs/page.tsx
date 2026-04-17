import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Eye, EyeOff } from "lucide-react";
import { DeleteBlogButton } from "./DeleteBlogButton";
import Image from "next/image";

export default async function AdminBlogsPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-brand-dark uppercase">Blogs</h1>
        <Link
          href="/admin/blogs/create"
          className="flex items-center gap-2 bg-brand-orange text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Blog Post
        </Link>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">Image</th>
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Author</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="relative w-16 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200">
                        {blog.image_url ? (
                          <Image
                            src={blog.image_url}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-brand-dark">
                      <div className="max-w-xs truncate">{blog.title}</div>
                      <div className="text-xs text-gray-400 truncate">/{blog.slug}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{blog.author}</td>
                    <td className="p-4">
                      {blog.published ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <Link
                        href={`/admin/blogs/edit?id=${blog.id}`}
                        className="px-3 py-1.5 bg-brand-dark text-white text-sm rounded-lg hover:bg-brand-dark/80 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteBlogButton id={blog.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No blog posts yet. <Link href="/admin/blogs/create" className="text-brand-orange hover:underline">Write your first post</Link>.
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
