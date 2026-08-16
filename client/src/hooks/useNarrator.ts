/**
 * VIBEX narration: cinematic typewriter reveal for narrator lines.
 * Text "breathes" in word by word with a soft caret, like the reference video.
 */
import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, active: boolean, speedMs = 34) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    if (!active || !text) {
      setDisplay("");
      setDone(false);
      return;
    }
    setDisplay("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speedMs);
    return () => {
      clearInterval(timer);
      cancelled.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active, speedMs]);

  return { display, done };
}

export function useInView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    const t = setTimeout(() => obs.observe(el), delay);
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, [delay]);
  return { ref, inView };
}
