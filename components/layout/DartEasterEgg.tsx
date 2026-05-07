"use client";
import { useEffect, useRef } from "react";

export default function DartEasterEgg() {
  const clicksRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const dart = document.getElementById("dart-easter");
    if (!dart) return;

    const handleLogoClick = () => {
      clicksRef.current++;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { clicksRef.current = 0; }, 2000);

      if (clicksRef.current >= 3) {
        clicksRef.current = 0;
        dart.textContent = "🎯";
        dart.classList.add("active");
        setTimeout(() => {
          dart.classList.remove("active");
          dart.style.left = "-100px";
          dart.style.opacity = "0";
        }, 1200);
      }
    };

    const logo = document.getElementById("site-logo");
    logo?.addEventListener("click", handleLogoClick);
    return () => logo?.removeEventListener("click", handleLogoClick);
  }, []);

  return <div id="dart-easter" aria-hidden />;
}
