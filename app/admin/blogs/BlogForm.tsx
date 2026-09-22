"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Sparkles, AlertCircle, Loader2, BookOpen, Clock, CheckCircle2 } from "lucide-react";

interface BlogFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: any;
  buttonText: string;
}

export function BlogForm({ action, initialData, buttonText }: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleGenerateSlug = () => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <form action={formAction} className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Unable to save blog post</p>
            <p className="text-red-600 mt-0.5">{state.error}</p>
          </div>
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="title">
            Post Title <span className="text-brand-orange">*</span>
          </label>
          <input
            required
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-base"
            placeholder="e.g. 10 Hidden Gems in Belize You Must Visit"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="slug">
              Slug (URL path) <span className="text-brand-orange">*</span>
            </label>
            <button
              type="button"
              onClick={handleGenerateSlug}
              className="text-xs text-brand-orange hover:text-brand-orange/80 font-semibold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Generate from Title
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">/blog/</span>
            <input
              required
              id="slug"
              name="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full pl-16 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-sm font-mono"
              placeholder="hidden-gems-belize"
            />
          </div>
        </div>
      </div>

      {/* Author & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="author">
            Author Name <span className="text-brand-orange">*</span>
          </label>
          <input
            required
            id="author"
            name="author"
            type="text"
            defaultValue={initialData?.author || "Belize Signature Adventures"}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-base"
            placeholder="Ian Burns"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="email">
            Author Email <span className="text-brand-orange">*</span>
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email || "info@belizesignature.com"}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors text-base"
            placeholder="info@belizesignature.com"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="excerpt">
          Short Excerpt / Summary <span className="text-brand-orange">*</span>
        </label>
        <textarea
          required
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={initialData?.excerpt}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors resize-none leading-relaxed text-base"
          placeholder="A catchy summary displayed in preview cards and search results..."
        ></textarea>
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="content">
            Post Content (Markdown or Text) <span className="text-brand-orange">*</span>
          </label>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-gray-400" /> {wordCount} words
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" /> ~{readingTime} min read
            </span>
          </div>
        </div>
        <textarea
          required
          id="content"
          name="content"
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors font-mono text-sm leading-relaxed"
          placeholder="Write your article here in markdown or plain text..."
        ></textarea>
      </div>

      {/* Featured Image with ImageUploader */}
      <div className="pt-2 border-t border-gray-100">
        <ImageUploader
          name="image"
          urlName="image_url"
          label="Featured Article Image"
          initialImageUrl={initialData?.image_url}
          helperText="Select a high-quality cover photo for the blog post header and cards. Recommended: 1200x800px or larger."
          aspectRatio="video"
        />
      </div>

      {/* Status (Published vs Draft) */}
      <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 uppercase tracking-wider" htmlFor="published">
            Publishing Status
          </label>
          <select
            id="published"
            name="published"
            defaultValue={initialData?.published?.toString() ?? "true"}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange outline-none bg-gray-50/50 hover:bg-white focus:bg-white transition-colors cursor-pointer text-base"
          >
            <option value="true">Published (Visible to all visitors)</option>
            <option value="false">Draft (Hidden from public)</option>
          </select>
        </div>
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <button
          disabled={isPending}
          type="submit"
          className="bg-brand-orange text-white px-8 py-3.5 rounded-xl font-bold tracking-wide hover:bg-brand-orange/90 transition-all active:scale-[0.99] disabled:opacity-50 shadow-md flex items-center gap-2"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? "Saving Post..." : buttonText}
        </button>
        <Link
          href="/admin/blogs"
          className="bg-gray-100 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
