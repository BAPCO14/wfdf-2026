"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";

export default function ContactForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("success"); reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const l = locale as "fr" | "en";
  if (status === "success") return (
    <div className="bg-green-50 border border-green-200 p-6 text-green-800">
      ✓ {l === "fr" ? "Message envoyé ! Nous vous répondrons sous 48h." : "Message sent! We'll reply within 48h."}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input {...register("website")} type="text" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      {([
        { name: "name", label: l === "fr" ? "Nom complet" : "Full name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "subject", label: l === "fr" ? "Sujet" : "Subject", type: "text" },
      ] as const).map(({ name, label, type }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
          <input {...register(name)} type={type} className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm" />
          {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{l === "fr" ? "Message" : "Message"} *</label>
        <textarea {...register("message")} rows={5} className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm resize-y" />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      {status === "error" && <p className="text-red-500 text-sm">{l === "fr" ? "Erreur, réessayez." : "Error, please retry."}</p>}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-4 text-sm">
        {status === "loading" ? "..." : (l === "fr" ? "Envoyer" : "Send")}
      </button>
    </form>
  );
}
