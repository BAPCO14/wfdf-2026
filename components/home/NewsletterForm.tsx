"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";

interface NewsletterFormProps { locale: string; }

export default function NewsletterForm({ locale }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const t = {
    fr: { placeholder: "votre@email.fr", cta: "Je m'inscris", consent: "J'accepte de recevoir la newsletter du festival (double opt-in requis)", success: "Vérifiez votre boîte mail pour confirmer votre inscription !", error: "Erreur, réessayez.", loading: "Envoi..." },
    en: { placeholder: "your@email.com", cta: "Subscribe", consent: "I agree to receive the festival newsletter (double opt-in required)", success: "Check your inbox to confirm your subscription!", error: "Error, please retry.", loading: "Sending..." },
  }[locale as "fr" | "en"];

  if (status === "success") {
    return (
      <div className="bg-[#660066]/10 border border-[#660066]/30 p-4 text-center text-sm text-[#660066]">
        ✓ {t.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input {...register("website")} type="text" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="flex gap-2">
        <input
          {...register("email")}
          type="email"
          placeholder={t.placeholder}
          className="flex-1 px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm transition-colors"
        />
        <button type="submit" disabled={status === "loading"} className="btn-primary px-6 py-3 text-xs whitespace-nowrap">
          {status === "loading" ? t.loading : t.cta}
        </button>
      </div>
      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

      <label className="flex items-start gap-3 cursor-pointer">
        <input {...register("consent")} type="checkbox" className="mt-0.5 accent-[#660066]" />
        <span className="text-xs text-gray-500">{t.consent}</span>
      </label>
      {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

      {status === "error" && <p className="text-red-500 text-xs">{t.error}</p>}
    </form>
  );
}
