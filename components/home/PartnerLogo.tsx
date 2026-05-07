"use client";
import { useState } from "react";

interface PartnerLogoProps {
  src: string;
  alt: string;
  color: string;
}

export default function PartnerLogo({ src, alt, color }: PartnerLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-14 rounded flex items-center justify-center font-[Oswald] text-lg font-bold text-white"
        style={{ background: color }}
      >
        {alt.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={160}
      height={56}
      className="w-full h-14 object-contain group-hover:scale-105 transition-transform duration-200"
      onError={() => setFailed(true)}
    />
  );
}
