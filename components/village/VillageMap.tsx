"use client";
import { useState } from "react";

interface Zone {
  id: string;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
  icon: string;
  path: string;
  color: string;
}

const ZONES: Zone[] = [
  {
    id: "scene-principale",
    label: { fr: "Scène Principale", en: "Main Stage" },
    description: { fr: "La grande arène de compétition — tables PDC, éclairage pro, écrans géants, commentateurs live.", en: "The main competition arena — PDC tables, pro lighting, giant screens, live commentators." },
    icon: "🎯",
    path: "M 50 30 L 350 30 L 350 180 L 50 180 Z",
    color: "#660066",
  },
  {
    id: "zone-tournois",
    label: { fr: "Zone Tournois", en: "Tournament Zone" },
    description: { fr: "12 tables de compétition pour les tournois ouverts. Enregistrements, arbitres, score en direct.", en: "12 competition tables for open tournaments. Registration, referees, live scoring." },
    icon: "🏆",
    path: "M 380 30 L 650 30 L 650 200 L 380 200 Z",
    color: "#005B8E",
  },
  {
    id: "espace-pros",
    label: { fr: "Espace Pros", en: "Pros Area" },
    description: { fr: "Rencontres avec les pros, séances de dédicaces, espace VIP et photos souvenirs.", en: "Meet the pros, signing sessions, VIP area and photo opportunities." },
    icon: "⭐",
    path: "M 50 210 L 230 210 L 230 350 L 50 350 Z",
    color: "#E40520",
  },
  {
    id: "village-bar",
    label: { fr: "Village Bar", en: "Village Bar" },
    description: { fr: "Bar principal du Village — bières pression, cocktails, softs. Ambiance DJ vendredi et samedi soir.", en: "Main Village bar — draught beers, cocktails, soft drinks. DJ nights Friday and Saturday." },
    icon: "🍺",
    path: "M 260 210 L 450 210 L 450 350 L 260 350 Z",
    color: "#FF6600",
  },
  {
    id: "restauration",
    label: { fr: "Restauration", en: "Food Area" },
    description: { fr: "Food trucks et stands : burgers, frites, cuisine normande, crêpes. Végétarien disponible.", en: "Food trucks and stands: burgers, fries, Norman cuisine, crêpes. Vegetarian available." },
    icon: "🍔",
    path: "M 480 210 L 650 210 L 650 350 L 480 350 Z",
    color: "#00843D",
  },
  {
    id: "espace-decouverte",
    label: { fr: "Espace Découverte", en: "Discovery Area" },
    description: { fr: "Stands des équipementiers (Target, Red Dragon, Unicorn) — essais de fléchettes, conseils experts.", en: "Equipment brand stands (Target, Red Dragon, Unicorn) — try darts, expert advice." },
    icon: "🔍",
    path: "M 50 380 L 320 380 L 320 480 L 50 480 Z",
    color: "#1A1A2E",
  },
  {
    id: "zone-enfants",
    label: { fr: "Zone Enfants", en: "Children's Zone" },
    description: { fr: "Initiation fléchettes enfants (velcro), animations, goodies. Accès libre pour les moins de 12 ans.", en: "Children's darts initiation (velcro), activities, goodies. Free access for under 12s." },
    icon: "👧",
    path: "M 350 380 L 510 380 L 510 480 L 350 480 Z",
    color: "#cc00cc",
  },
  {
    id: "tribune",
    label: { fr: "Tribune", en: "Tribune" },
    description: { fr: "Tribune assise 500 places face à la scène principale. Vue dégagée sur toutes les compétitions.", en: "Seated stand 500 seats facing the main stage. Clear view of all competitions." },
    icon: "👁️",
    path: "M 540 380 L 650 380 L 650 480 L 540 480 Z",
    color: "#333333",
  },
];

interface VillageMapProps { locale: string; }

export default function VillageMap({ locale }: VillageMapProps) {
  const [active, setActive] = useState<Zone | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const l = locale as "fr" | "en";

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* SVG Map */}
      <div className="flex-1 relative">
        <svg
          viewBox="0 0 700 510"
          className="w-full border border-gray-200 bg-gray-50"
          aria-label={l === "fr" ? "Plan du Village" : "Village Map"}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="700" height="510" fill="url(#grid)" />

          {/* Hall label */}
          <text x="350" y="510" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="Oswald, sans-serif">
            HALL 3 — PARC DES EXPOSITIONS CAEN
          </text>

          {/* Zones */}
          {ZONES.map((zone) => (
            <g
              key={zone.id}
              onClick={() => setActive(zone)}
              onMouseEnter={() => setHovered(zone.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              role="button"
              aria-label={zone.label[l]}
            >
              <path
                d={zone.path}
                fill={zone.color}
                fillOpacity={hovered === zone.id || active?.id === zone.id ? 0.85 : 0.6}
                stroke={active?.id === zone.id ? "#fff" : zone.color}
                strokeWidth={active?.id === zone.id ? 3 : 1}
                style={{ transition: "fill-opacity 0.2s ease" }}
              />
              {/* Icon — centered using bbox from path coords */}
              {(() => {
                const parts = zone.path.split(" ");
                const cx = parseFloat(parts[1]) + (parseFloat(parts[7]) - parseFloat(parts[1])) / 2;
                const cy = parseFloat(parts[2]) + (parseFloat(parts[11]) - parseFloat(parts[2])) / 2;
                return (
                  <>
                    <text x={cx} y={cy - 12} textAnchor="middle" dominantBaseline="middle" fontSize="22">{zone.icon}</text>
                    <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="white" fontFamily="Oswald, sans-serif" fontWeight="bold">{zone.label[l].toUpperCase()}</text>
                  </>
                );
              })()}
            </g>
          ))}
        </svg>
        <p className="text-xs text-gray-400 text-center mt-2">
          {l === "fr" ? "Cliquez sur une zone pour en savoir plus" : "Click a zone to learn more"}
        </p>
      </div>

      {/* Info panel */}
      <div className="lg:w-72 flex-shrink-0">
        {active ? (
          <div
            className="bg-white border-l-4 p-6 shadow-lg"
            style={{ borderColor: active.color }}
          >
            <div className="text-3xl mb-2">{active.icon}</div>
            <h3 className="font-[Oswald] text-2xl uppercase" style={{ color: active.color }}>
              {active.label[l]}
            </h3>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              {active.description[l]}
            </p>
            <button
              onClick={() => setActive(null)}
              className="mt-4 text-xs text-gray-400 hover:text-gray-700 transition-colors underline"
            >
              {l === "fr" ? "Fermer" : "Close"}
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 p-6 text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="font-[Oswald] uppercase text-sm tracking-widest text-gray-400">
              {l === "fr" ? "Sélectionnez une zone" : "Select a zone"}
            </p>
            <div className="mt-6 space-y-2">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActive(z)}
                  className="w-full text-left text-sm flex items-center gap-3 p-2 hover:bg-white rounded transition-colors"
                >
                  <span>{z.icon}</span>
                  <span className="text-gray-700">{z.label[l]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
