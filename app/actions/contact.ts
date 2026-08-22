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
    }
  } catch (err) {
    console.error("Server error inserting contact record:", err);
  }

  // Send Email via EmailJS
  try {
    const serviceId = "service_21zi8c6";
    const templateId = "template_bpxxhho";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY || "VX0K0XOYZYEXQPXq_";
    const privateKey = process.env.EMAILJS_PRIVATE_KEY || "";

    // Format all contact form details into the message field
    const compiledMessage = `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;

    const payload: Record<string, any> = {
      service_id: serviceId,
      template_id: templateId,
      template_params: {
        message: compiledMessage,
      },
    };

    if (publicKey) {
      payload.user_id = publicKey;
    }
    if (privateKey) {
      payload.accessToken = privateKey;
    }

    const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("EmailJS API response error:", emailRes.status, errText);
    }
  } catch (emailErr) {
    console.error("Failed to send email via EmailJS:", emailErr);
  }

  return { success: true };
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
