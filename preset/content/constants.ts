export const SITE = {
  name: "Winamax French Darts Festival",
  shortName: "WFDF 2026",
  edition: "2ème édition",
  url: "https://frenchdartsfestival.fr",
  email: "contact@frenchdartsfestival.fr",
  phone: "+33 2 31 XX XX XX",
  social: {
    instagram: "https://instagram.com/frenchdartsfestival",
    facebook: "https://facebook.com/frenchdartsfestival",
    x: "https://x.com/FrenchDartsFest",
    youtube: "https://youtube.com/@frenchdartsfestival",
  },
} as const;

export const EVENT = {
  startDate: new Date("2026-12-04T08:00:00+01:00"),
  endDate: new Date("2026-12-06T18:00:00+01:00"),
  galaDate: new Date("2026-12-05T19:30:00+01:00"),
  venue: {
    name: "Parc des Expositions de Caen",
    hall: "Hall 3",
    address: "Rue Joseph Philippon",
    city: "Caen",
    zip: "14000",
    country: "France",
    lat: 49.1859,
    lng: -0.3632,
    googleMapsUrl: "https://maps.google.com/?q=Parc+Expositions+Caen",
  },
  pricePool: {
    total: 34000,
    winamaxOpen: 10000,
    grandPrix: 5000,
    mastersInvitational: 8000,
  },
} as const;

export const BRAND = {
  colors: {
    violet: "#660066",
    violetLight: "#cc00cc",
    white: "#FFFFFF",
    winamax: "#E40520",
    gray: {
      50: "#F9FAFB",
      900: "#111827",
    },
  },
  fonts: {
    title: "Oswald",
    body: "Manrope",
    mono: "JetBrains Mono",
  },
  logoOfficial: "/assets/logos/wfdf-official.png",
  logoOrganizer: "/assets/logos/french-darts-organizer.png",
} as const;

export const ORGANIZER = {
  name: "French Darts SAS",
  legalForm: "SAS au capital de 10 000 €",
  siret: "XXX XXX XXX 00014",
  address: "XX Rue XXXX, 14000 Caen",
  director: "À compléter",
  email: "legal@frenchdartsfestival.fr",
  hostProvider: {
    name: "Vercel Inc.",
    address: "340 Pine Street, Suite 1501, San Francisco, CA 94104, USA",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: { fr: "Accueil", en: "Home" } },
  { href: "/tournois", label: { fr: "Tournois", en: "Tournaments" } },
  { href: "/soiree-gala", label: { fr: "Soirée Gala", en: "Gala Evening" } },
  { href: "/le-village", label: { fr: "Le Village", en: "The Village" } },
  { href: "/programme", label: { fr: "Programme", en: "Schedule" } },
  { href: "/infos-pratiques", label: { fr: "Infos pratiques", en: "Practical info" } },
  { href: "/worknplay", label: { fr: "Work'N'Play", en: "Work'N'Play" } },
  { href: "/contact", label: { fr: "Contact", en: "Contact" } },
] as const;
