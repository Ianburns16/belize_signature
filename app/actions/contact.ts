"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!firstName || !lastName || !email || !message) {
    return { error: "All fields are required" };
  }

  const name = `${firstName} ${lastName}`;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact").insert({
      name,
      email,
      question: message,
      contacted: false,
    });

    if (error) {
      console.error("Supabase error:", error);
      return { error: "Failed to send message. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Server error:", err);
    return { error: "An unexpected error occurred." };
  }
}

export async function toggleContactStatus(id: number, currentStatus: boolean) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact")
      .update({ contacted: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error toggling contact status:", error);
      return { error: "Failed to update status." };
    }
    
    return { success: true };
  } catch (err) {
    console.error("Server error:", err);
    return { error: "An unexpected error occurred." };
  }
}
