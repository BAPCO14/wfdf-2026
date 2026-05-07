"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    if (!dot || window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };
    const enter = () => dot.classList.add("hovering");
    const leave = () => dot.classList.remove("hovering");

    window.addEventListener("mousemove", move);

    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return <div id="cursor-dot" aria-hidden />;
}
