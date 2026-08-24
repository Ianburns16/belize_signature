"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(prevState: any, formData: FormData) {
  const websiteHp = formData.get("website_hp") as string;
  const confirmEmailHp = formData.get("confirm_email_hp") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const loadedAt = formData.get("loadedAt") as string;

  // 1. Silent Anti-bot Honeypot check: If bots fill out hidden fields, pretend it succeeded
  if ((websiteHp && websiteHp.trim().length > 0) || (confirmEmailHp && confirmEmailHp.trim().length > 0)) {
    console.warn("Anti-bot honeypot triggered on contact form submission.");
    return { success: true };
  }

  // 2. Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return { error: "All fields are required" };
  }

  // 3. Server-side sub-second automated submission check
  if (loadedAt) {
    const elapsed = Date.now() - parseInt(loadedAt, 10);
    if (elapsed < 1000) { // Submitted under 1s
      console.warn(`Anti-bot rapid submission blocked (${elapsed}ms).`);
      return { error: "Form submitted too fast. Please try again." };
    }
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
