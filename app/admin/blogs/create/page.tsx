import { createBlog } from "@/app/actions/blogs";
import { BlogForm } from "../BlogForm";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default async function CreateBlogPage() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Breadcrumbs & Header */}
      <div>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-brand-orange transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Blog Posts
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-3xl font-heading text-brand-dark uppercase tracking-wide">
              New Blog Post
            </h1>
            <p className="text-xs text-gray-500">
              Draft or publish an informative travel guide or story for Belize adventurers.
            </p>
          </div>
        </div>
      </div>

      <BlogForm action={createBlog} buttonText="Publish Article" />
    </div>
  );
}
