"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTour(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const total_seats = parseInt(formData.get("total_seats") as string);
  const category_id = formData.get("category_id") as string;
  const imageFile = formData.get("image") as File;

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

  // Handle Image Upload if provided
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `tours/${tour.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Image upload error:", uploadError);
    } else {
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
      await supabase.from("tour_images").insert({
        tour_id: tour.id,
        image_path: urlData.publicUrl,
        is_primary: true
      });
    }
  }

  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}

export async function updateTour(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const total_seats = parseInt(formData.get("total_seats") as string);
  const category_id = formData.get("category_id") as string;
  const imageFile = formData.get("image") as File;

  const { error } = await supabase
    .from("tours")
    .update({ title, description, price, total_seats, category_id })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  // Handle Image Upload if provided
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const filePath = `tours/${id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Image upload error:", uploadError);
    } else {
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
      
      // Update or insert primary image
      const { data: existingImage } = await supabase
        .from("tour_images")
        .select("id")
        .eq("tour_id", id)
        .eq("is_primary", true)
        .single();

      if (existingImage) {
        await supabase
          .from("tour_images")
          .update({ image_path: urlData.publicUrl })
          .eq("id", existingImage.id);
      } else {
        await supabase.from("tour_images").insert({
          tour_id: id,
          image_path: urlData.publicUrl,
          is_primary: true
        });
      }
    }
  }

  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}

export async function deleteTour(id: string) {
  const supabase = await createClient();

  // Delete related tour_images first
  await supabase.from("tour_images").delete().eq("tour_id", id);

  const { error } = await supabase.from("tours").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/tours");
  return { success: true };
}
