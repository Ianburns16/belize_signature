import { createBlog } from "@/app/actions/blogs";
import { BlogForm } from "../BlogForm";

export default async function CreateBlogPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-heading text-brand-dark uppercase mb-8">New Blog Post</h1>
      <BlogForm action={createBlog} buttonText="Save Blog Post" />
    </div>
  );
}
