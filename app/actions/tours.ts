"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTour(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const total_seats = parseInt(formData.get("total_seats") as string);
  const category_id = formData.get("category_id") as string;
  const imageFile = formData.get("image") as File;
  const imageUrlInput = (formData.get("image_url") as string)?.trim();

  if (!title || isNaN(price) || isNaN(total_seats) || !category_id) {
    return { error: "Please fill in all required fields properly." };
  }

  const { data: tour, error: tourError } = await supabase.from("tours").insert({
    title,
    description,
    price,
    total_seats,
    category_id,
  }).select().single();

  if (tourError) {
    return { error: tourError.message };
  }

  // Handle Image Upload or URL if provided
  let finalImageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `tours/${tour.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile, { contentType: imageFile.type });

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      return { error: `Tour created, but image upload failed: ${uploadError.message}` };
    } else {
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
      finalImageUrl = urlData.publicUrl;
    }
  } else if (imageUrlInput) {
    finalImageUrl = imageUrlInput;
  }

  if (finalImageUrl) {
    await supabase.from("tour_images").insert({
      tour_id: tour.id,
      image_path: finalImageUrl,
      is_primary: true
    });
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath("/");
  redirect("/admin/tours");
}

export async function updateTour(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const price = parseFloat(formData.get("price") as string);
  const total_seats = parseInt(formData.get("total_seats") as string);
  const category_id = formData.get("category_id") as string;
  const imageFile = formData.get("image") as File;
  const imageUrlInput = (formData.get("image_url") as string)?.trim();

  if (!title || isNaN(price) || isNaN(total_seats) || !category_id) {
    return { error: "Please fill in all required fields properly." };
  }

  const { error } = await supabase
    .from("tours")
    .update({ title, description, price, total_seats, category_id })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  // Handle Image Swapping if a new file or image URL was provided
  let newImageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `tours/${id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile, { contentType: imageFile.type });

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      return { error: `Image upload failed: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
    newImageUrl = urlData.publicUrl;
  } else if (imageUrlInput) {
    newImageUrl = imageUrlInput;
  }

  if (newImageUrl) {
    // Clean up existing tour_images for this tour to prevent stale duplicates or array ordering conflicts
    await supabase
      .from("tour_images")
      .delete()
      .eq("tour_id", id);

    // Insert fresh primary image
    const { error: imgError } = await supabase.from("tour_images").insert({
      tour_id: id,
      image_path: newImageUrl,
      is_primary: true
    });

    if (imgError) {
      console.error("Error setting primary tour image:", imgError);
      return { error: `Failed to save new tour image: ${imgError.message}` };
    }
  }

  revalidatePath("/admin/tours");
  revalidatePath("/admin/tours/edit");
  revalidatePath("/tours");
  revalidatePath(`/tours/${id}`);
  revalidatePath("/");
  redirect("/admin/tours");
}

export async function deleteTour(id: string) {
  const supabase = await createClient();

  // 1. Delete tour_images for this tour first
  const { error: imagesError } = await supabase
    .from("tour_images")
    .delete()
    .eq("tour_id", id);

  if (imagesError) {
    console.error("Failed to delete tour_images:", imagesError);
    return { error: `Failed to delete associated images: ${imagesError.message}` };
  }

  // 2. Delete the tour record from tours table
  const { error } = await supabase.from("tours").delete().eq("id", id);

  if (error) {
    console.error("Error deleting tour:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath("/");
  return { success: true };
}
