import { createClient } from "@/lib/supabase/server";
import { updateBlog } from "@/app/actions/blogs";
import { notFound } from "next/navigation";
import { BlogForm } from "../BlogForm";

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
      <BlogForm action={updateBlogWithId} initialData={blog} buttonText="Update Blog Post" />
    </div>
  );
}
