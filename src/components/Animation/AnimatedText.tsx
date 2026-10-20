"use client";

import React from "react";

// ── CSS-only AnimatedText: uses IntersectionObserver + CSS animations ─────────
interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em] whitespace-nowrap"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            filter: visible ? "blur(0px)" : "blur(3px)",
            transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s, filter 0.5s ease ${i * 0.07}s`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

// ── CSS-only TypewriterText: uses CSS keyframe for slide transition ──────────
export const TypewriterText: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 300);
    }, 2800);
    return () => clearInterval(timer);
  }, [words]);

  return (
    <div className="h-8 overflow-hidden inline-flex items-center">
      <span
        className="text-cyan-400 font-mono font-bold"
        style={{
          display: "inline-block",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(-16px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {words[index]}
      </span>
    </div>
  );
};
