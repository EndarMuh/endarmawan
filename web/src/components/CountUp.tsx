"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ n, dec = 0, suf = "" }: { n: number; dec?: number; suf?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(n);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const dur = 1100;
          const t0 = performance.now();
          const tick = (t: number) => {
            let p = Math.min((t - t0) / dur, 1);
            p = 1 - Math.pow(1 - p, 3);
            setVal(n * p);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n]);

  return (
    <span ref={ref} className="stat-num">
      {val.toFixed(dec)}
      {suf ? <span className="suf">{suf}</span> : null}
    </span>
  );
}
