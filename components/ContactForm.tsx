"use client";

import { useState, useTransition } from "react";
import emailjs from "@emailjs/browser";
import { submitContactForm } from "@/app/actions/contact";

const SERVICE_ID = "service_21zi8c6";
const TEMPLATE_ID = "template_bpxxhho";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{ success?: boolean; error?: string } | null>(null);

  // Silent anti-bot timestamp measure (sub-second script submissions get caught)
  const [formLoadedAt] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const websiteHp = formData.get("website_hp") as string;
    const confirmEmailHp = formData.get("confirm_email_hp") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // 1. Silent Honeypot check: If filled out by automated bots, fake success response
    if (websiteHp || confirmEmailHp) {
      setState({ success: true });
      return;
    }

    if (!firstName || !lastName || !email || !message) {
      setState({ error: "All fields are required" });
      return;
    }

    // 2. Sub-second automated script submission check
    if (Date.now() - formLoadedAt < 1200) {
      setState({ error: "Submission detected too fast. Please try again." });
      return;
    }

    formData.append("loadedAt", formLoadedAt.toString());

    startTransition(async () => {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "VX0K0XOYZYEXQPXq_";
      
      // Submit form action to store record in database and execute backend EmailJS call
      const res = await submitContactForm(null, formData);
      
      if (res.success && publicKey) {
        try {
          const compiledMessage = `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`;

          await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
              message: compiledMessage,
            },
            publicKey
          );
        } catch (emailJsError) {
          console.error("Client EmailJS send error:", emailJsError);
        }
      }

      setState(res);
    });
  };

  if (state?.success) {
    return (
      <div className="bg-brand-green/10 border border-brand-green p-8 rounded-xl text-center">
        <h3 className="text-2xl font-bold text-brand-green mb-2">Message Sent!</h3>
        <p className="text-brand-dark">
          Thank you for reaching out. We will get back to you within 24 hours to start planning your adventure.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm font-medium">
          {state.error}
        </div>
      )}

      {/* Invisible Honeypot fields - completely hidden from real users */}
      <div style={{ display: "none" }} aria-hidden="true">
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
        />
        <input
          type="text"
          id="confirm_email_hp"
          name="confirm_email_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark uppercase tracking-wider" htmlFor="firstName">First Name</label>
          <input required type="text" id="firstName" name="firstName" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all" placeholder="John" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark uppercase tracking-wider" htmlFor="lastName">Last Name</label>
          <input required type="text" id="lastName" name="lastName" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all" placeholder="Doe" />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-dark uppercase tracking-wider" htmlFor="email">Email Address</label>
        <input required type="email" id="email" name="email" className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-brand-dark uppercase tracking-wider" htmlFor="message">Message</label>
        <textarea required id="message" name="message" rows={6} className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your dream adventure..."></textarea>
      </div>
      
      <button disabled={isPending} type="submit" className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white py-4 rounded-xl font-bold text-lg transition-transform hover:-translate-y-1 shadow-lg shadow-brand-orange/30 disabled:opacity-70 disabled:hover:translate-y-0">
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

