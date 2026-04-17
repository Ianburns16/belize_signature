"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

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
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {state.error}
        </div>
      )}
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
