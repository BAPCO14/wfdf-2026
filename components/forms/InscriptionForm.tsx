"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inscriptionSchema, type InscriptionInput } from "@/lib/validations";

interface InscriptionFormProps {
  locale: string;
  tournamentId: string;
  tournamentName: string;
}

export default function InscriptionForm({ locale, tournamentId }: InscriptionFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<InscriptionInput>({
    resolver: zodResolver(inscriptionSchema),
    defaultValues: { tournamentId },
  });

  const onSubmit = async (data: InscriptionInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const l = locale as "fr" | "en";
  const t = {
    firstName: l === "fr" ? "Prénom" : "First name",
    lastName: l === "fr" ? "Nom" : "Last name",
    email: "Email",
    phone: l === "fr" ? "Téléphone" : "Phone",
    license: l === "fr" ? "N° Licence (si applicable)" : "License # (if applicable)",
    submit: l === "fr" ? "Valider l'inscription" : "Submit registration",
    success: l === "fr" ? "Inscription enregistrée ! Vous recevrez une confirmation par email." : "Registration received! You will receive a confirmation by email.",
    error: l === "fr" ? "Erreur, veuillez réessayer." : "Error, please retry.",
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 p-6 text-green-800">
        ✓ {t.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <input {...register("website")} type="text" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      <input {...register("tournamentId")} type="hidden" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName} *</label>
          <input {...register("firstName")} type="text" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm transition-colors" />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName} *</label>
          <input {...register("lastName")} type="text" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm transition-colors" />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
          <input {...register("email")} type="email" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm transition-colors" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone} *</label>
          <input {...register("phone")} type="tel" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm transition-colors" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.license}</label>
        <input {...register("license")} type="text" className="w-full px-4 py-3 border border-gray-200 focus:border-[#660066] outline-none text-sm transition-colors" />
      </div>

      {status === "error" && <p className="text-red-500 text-sm">{t.error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-4 text-sm">
        {status === "loading" ? "..." : t.submit}
      </button>

      <p className="text-xs text-gray-400">
        {l === "fr"
          ? "* Vos données sont utilisées uniquement pour la gestion de votre inscription. Voir notre politique de confidentialité."
          : "* Your data is used solely for registration management. See our privacy policy."}
      </p>
    </form>
  );
}
