"use client";
import { useActionState } from "react";
import Image from "next/image";

interface BlogFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: any;
  buttonText: string;
}

export function BlogForm({ action, initialData, buttonText }: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm">
          {state.error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="title">Title</label>
          <input 
            required 
            id="title" 
            name="title" 
            type="text" 
            defaultValue={initialData?.title}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" 
            placeholder="Hidden Gems of Belize" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="slug">Slug (URL path)</label>
          <input 
            required 
            id="slug" 
            name="slug" 
            type="text" 
            defaultValue={initialData?.slug}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" 
            placeholder="hidden-gems-belize" 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="author">Author Name</label>
          <input 
            required 
            id="author" 
            name="author" 
            type="text" 
            defaultValue={initialData?.author}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" 
            placeholder="Ian Burns" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="email">Author Email</label>
          <input 
            required 
            id="email" 
            name="email" 
            type="email" 
            defaultValue={initialData?.email}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" 
            placeholder="ian@example.com" 
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="excerpt">Excerpt (Short Summary)</label>
        <textarea 
          required 
          id="excerpt" 
          name="excerpt" 
          rows={2} 
          defaultValue={initialData?.excerpt}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none resize-none" 
          placeholder="A brief preview of the post..."
        ></textarea>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="content">Content (Markdown or Text)</label>
        <textarea 
          required 
          id="content" 
          name="content" 
          rows={12} 
          defaultValue={initialData?.content}
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none font-mono text-sm" 
          placeholder="Write your blog post here..."
        ></textarea>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="image">Featured Image</label>
          {initialData?.image_url && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 mb-2">
              <Image src={initialData.image_url} alt="Current" fill className="object-cover" />
            </div>
          )}
          <input 
            id="image" 
            name="image" 
            type="file" 
            accept="image/*" 
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50" 
          />
          <p className="text-[10px] text-gray-400 italic">
            {initialData ? "Select a new file to replace the existing image." : "Recommended: 1200x800px or larger."}
          </p>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-600 uppercase tracking-wider" htmlFor="published">Status</label>
          <select 
            id="published" 
            name="published" 
            defaultValue={initialData?.published?.toString() || "true"}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-orange outline-none bg-white"
          >
            <option value="true">Published</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          disabled={isPending} 
          type="submit" 
          className="bg-brand-orange text-white px-10 py-3 rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : buttonText}
        </button>
        <a href="/admin/blogs" className="bg-gray-100 text-gray-600 px-10 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          Cancel
        </a>
      </div>
    </form>
  );
}
