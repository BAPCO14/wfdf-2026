"use client";
import { useState } from "react";

interface PartnerLogoProps {
  src: string;
  alt: string;
  color: string;
}

export default function PartnerLogo({ src, alt, color }: PartnerLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className="w-full h-16 rounded flex items-center justify-center font-[Oswald] text-base font-bold text-white px-2 text-center"
        style={{ background: color }}
      >
        {alt}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={180}
      height={64}
      className="w-full h-16 object-contain group-hover:scale-105 transition-transform duration-200"
      onError={() => setFailed(true)}
    />
  );
}
