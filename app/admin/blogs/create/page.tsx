import { createBlog } from "@/app/actions/blogs";

export default async function CreateBlogPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-heading text-brand-dark uppercase mb-8">New Blog Post</h1>

      <form action={createBlog} className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="title">Title</label>
            <input required id="title" name="title" type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Hidden Gems of Belize" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="slug">Slug (URL path)</label>
            <input required id="slug" name="slug" type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="hidden-gems-belize" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="author">Author Name</label>
            <input required id="author" name="author" type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Ian Burns" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="email">Author Email</label>
            <input required id="email" name="email" type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="ian@example.com" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="excerpt">Excerpt (Short Summary)</label>
          <textarea required id="excerpt" name="excerpt" rows={2} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none" placeholder="A brief preview of the post..."></textarea>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="content">Content (Markdown or Text)</label>
          <textarea required id="content" name="content" rows={12} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none font-mono text-sm" placeholder="Write your blog post here..."></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="image">Featured Image</label>
            <input id="image" name="image" type="file" accept="image/*" className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50" />
            <p className="text-[10px] text-gray-400 italic">Recommended: 1200x800px or larger.</p>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="published">Status</label>
            <select id="published" name="published" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white">
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-brand-orange text-white px-10 py-3 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors">
            Save Blog Post
          </button>
          <a href="/admin/blogs" className="bg-gray-100 text-gray-600 px-10 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
