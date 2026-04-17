import { createClient } from "@/lib/supabase/server";
import { updateBlog } from "@/app/actions/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function EditBlogPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  if (!id) notFound();

  const supabase = await createClient();
  const { data: blog } = await supabase.from("blogs").select("*").eq("id", id).single();

  if (!blog) notFound();

  const updateBlogWithId = updateBlog.bind(null, id);

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-heading text-brand-dark uppercase mb-8">Edit Blog Post</h1>

      <form action={updateBlogWithId} className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="title">Title</label>
            <input required id="title" name="title" type="text" defaultValue={blog.title} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="slug">Slug (URL path)</label>
            <input required id="slug" name="slug" type="text" defaultValue={blog.slug} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="author">Author Name</label>
            <input required id="author" name="author" type="text" defaultValue={blog.author} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="email">Author Email</label>
            <input required id="email" name="email" type="email" defaultValue={blog.email} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="excerpt">Excerpt (Short Summary)</label>
          <textarea required id="excerpt" name="excerpt" rows={2} defaultValue={blog.excerpt} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none"></textarea>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="content">Content (Markdown or Text)</label>
          <textarea required id="content" name="content" rows={12} defaultValue={blog.content} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none font-mono text-sm"></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="image">Featured Image</label>
            {blog.image_url && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 mb-2">
                <Image src={blog.image_url} alt="Current" fill className="object-cover" />
              </div>
            )}
            <input id="image" name="image" type="file" accept="image/*" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50" />
            <p className="text-[10px] text-gray-400 italic">Select a new file to replace the existing image.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="published">Status</label>
            <select id="published" name="published" defaultValue={blog.published.toString()} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white">
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-brand-orange text-white px-10 py-3 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors">
            Update Blog Post
          </button>
          <a href="/admin/blogs" className="bg-gray-100 text-gray-600 px-10 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
