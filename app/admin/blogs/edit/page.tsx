import { createClient } from "@/lib/supabase/server";
import { updateBlog } from "@/app/actions/blogs";
import { notFound } from "next/navigation";
import { BlogForm } from "../BlogForm";
import Link from "next/link";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";

export default async function EditBlogPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams;
  if (!id) notFound();

  const supabase = await createClient();
  const { data: blog } = await supabase.from("blogs").select("*").eq("id", id).single();

  if (!blog) notFound();

  const updateBlogWithId = updateBlog.bind(null, id);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Blog Posts
          </Link>
          {blog.published && (
            <Link
              href={`/blog/${blog.slug}`}
              target="_blank"
              className="inline-flex items-center text-xs font-semibold text-brand-dark/70 hover:text-brand-orange transition-colors"
            >
              View on Live Site <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
              Edit Blog Post
            </h1>
            <p className="text-xs text-gray-500">
              Update article content, metadata, or swap cover imagery.
            </p>
          </div>
        </div>
      </div>

      <BlogForm action={updateBlogWithId} initialData={blog} buttonText="Save Blog Changes" />
    </div>
  );
}
