import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(2000),
  website: z.string().max(0, "Bot detected"),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  consent: z.literal(true, { errorMap: () => ({ message: "Consentement obligatoire" }) }),
  website: z.string().max(0, "Bot detected"),
});

export const inscriptionSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^(\+33|0)[0-9]{9}$/, "Numéro invalide"),
  tournamentId: z.string().min(1),
  license: z.string().max(20).optional(),
  website: z.string().max(0, "Bot detected"),
});

export const worknplaySchema = z.object({
  company: z.string().min(2).max(100),
  contactName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20),
  participants: z.number().int().min(1).max(500),
  message: z.string().max(1000).optional(),
  turnstileToken: z.string().min(1, "Vérification requise"),
  website: z.string().max(0, "Bot detected"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type InscriptionInput = z.infer<typeof inscriptionSchema>;
export type WorkNPlayInput = z.infer<typeof worknplaySchema>;
