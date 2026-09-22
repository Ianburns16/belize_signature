"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const content = (formData.get("content") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const published = formData.get("published") === "true";
  const imageFile = formData.get("image") as File;
  const imageUrlInput = (formData.get("image_url") as string)?.trim();

  if (!title || !slug || !content || !author || !email) {
    return { error: "Please fill in all required fields." };
  }

  let image_url: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `blog/${slug}-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile, { contentType: imageFile.type });

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
    image_url = urlData.publicUrl;
  } else if (imageUrlInput) {
    image_url = imageUrlInput;
  }

  const { error } = await supabase.from("blogs").insert({
    title,
    slug,
    content,
    excerpt,
    author,
    email,
    published,
    image_url,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim().toLowerCase();
  const content = (formData.get("content") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const author = (formData.get("author") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const published = formData.get("published") === "true";
  const imageFile = formData.get("image") as File;
  const imageUrlInput = (formData.get("image_url") as string)?.trim();

  if (!title || !slug || !content || !author || !email) {
    return { error: "Please fill in all required fields." };
  }

  let updateData: Record<string, any> = { title, slug, content, excerpt, author, email, published };

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `blog/${slug}-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile, { contentType: imageFile.type });

    if (uploadError) {
      return { error: `Image upload failed: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
    updateData.image_url = urlData.publicUrl;
  } else if (imageUrlInput) {
    updateData.image_url = imageUrlInput;
  }

  const { error } = await supabase.from("blogs").update(updateData).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/admin/blogs/edit");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  revalidatePath("/");
  return { success: true };
}
