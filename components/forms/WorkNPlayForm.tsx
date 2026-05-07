"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { worknplaySchema, type WorkNPlayInput } from "@/lib/validations";
import Script from "next/script";

declare global { interface Window { turnstile?: { render: (id: string, opts: object) => void } } }

export default function WorkNPlayForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<WorkNPlayInput>({
    resolver: zodResolver(worknplaySchema),
  });

  const onSubmit = async (data: WorkNPlayInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/worknplay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const l = locale as "fr" | "en";
  if (status === "success") return (
    <div className="bg-green-50 border border-green-200 p-6 text-green-800">
      ✓ {l === "fr" ? "Demande reçue ! Notre équipe vous contacte sous 24h." : "Request received! Our team will contact you within 24h."}
    </div>
  );

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.turnstile?.render("#turnstile-container", {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: (token: string) => setValue("turnstileToken", token),
          });
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <input {...register("website")} type="text" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { name: "company", label: l === "fr" ? "Entreprise" : "Company" },
            { name: "contactName", label: l === "fr" ? "Contact" : "Contact name" },
          ] as const).map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label} *</label>
              <input {...register(name)} type="text" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm" />
              {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input {...register("email")} type="email" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{l === "fr" ? "Téléphone" : "Phone"} *</label>
            <input {...register("phone")} type="tel" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{l === "fr" ? "Nombre de participants" : "Number of participants"} *</label>
          <input {...register("participants", { valueAsNumber: true })} type="number" min={1} max={500} className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm" />
          {errors.participants && <p className="text-red-500 text-xs mt-1">{errors.participants.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{l === "fr" ? "Message (optionnel)" : "Message (optional)"}</label>
          <textarea {...register("message")} rows={4} className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm resize-y" />
        </div>
        <input {...register("turnstileToken")} type="hidden" />
        <div id="turnstile-container" />
        {errors.turnstileToken && <p className="text-red-500 text-xs">{errors.turnstileToken.message}</p>}
        {status === "error" && <p className="text-red-500 text-sm">{l === "fr" ? "Erreur, réessayez." : "Error, please retry."}</p>}
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-4 text-sm">
          {status === "loading" ? "..." : (l === "fr" ? "Envoyer la demande" : "Send request")}
        </button>
      </form>
    </>
  );
}
