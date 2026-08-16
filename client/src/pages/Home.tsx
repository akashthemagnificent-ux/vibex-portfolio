/**
 * VIBEX — Ash's personal self-introduction site.
 * Style: Celestial Editorial (reference video DNA) — vast black space, glowing
 * white serif narration, Orbit Acid chartreuse as rare signal, kinetic
 * typewriter reveals, animated counters, dotted journey paths.
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Heart,
  Mail,
  MessageCircle,
  MoveRight,
  Pin,
} from "lucide-react";
import CelestialScene from "@/components/CelestialScene";
import AskVibex from "@/components/AskVibex";
import { useTypewriter, useInView } from "@/hooks/useNarrator";
import { links, heroLines } from "@/lib/ash";

/* ---------- small motion helpers ---------- */
const ease = [0.23, 1, 0.32, 1] as const;

function Counter({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span className="counter-num">
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- CHAPTER SHELLS ---------- */
function Narrator({ text, active, delay = 0 }: { text: string; active: boolean; delay?: number }) {
  const reduced = useReducedMotion();
  const { display, done } = useTypewriter(text, active && !reduced, 26);
  useEffect(() => {}, [delay]);
  return (
    <motion.p
      className="narrator"
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {display}
      {!done && active && <span className="caret" />}
    </motion.p>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const lastIdx = heroLines.length - 1;
  const [lineIdx, setLineIdx] = useState(0);
  const [doneAll, setDoneAll] = useState(false);
  const reduced = useReducedMotion();
  const line = heroLines[lineIdx] ?? "";

  useEffect(() => {
    const dur = line.length * 46 + (lineIdx === lastIdx ? 300 : 1000);
    const t = setTimeout(() => {
      if (lineIdx >= lastIdx) {
        setDoneAll(true);
      } else {
        setLineIdx((i) => i + 1);
      }
    }, reduced ? (lineIdx === lastIdx ? 300 : 400) : dur);
    return () => clearTimeout(t);
  }, [lineIdx, line.length, lastIdx, reduced]);

  return (
    <section className="vibex-hero" aria-label="Introduction">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 46 }} dpr={[1, 1.6]}>
        <CelestialScene intensity={1} />
      </Canvas>
      <div className="vibex-hero-content">
        <p className="vibex-kicker">VIBEX — A PERSONAL INTRODUCTION</p>
        <AnimatePresence mode="wait">
          <motion.h1
            key={lineIdx}
            className="vibex-hero-line"
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease }}
          >
            {line}
          </motion.h1>
        </AnimatePresence>
        <AnimatePresence>
          {doneAll && (
            <motion.div
              className="vibex-hero-cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              <a href="#who" className="vibex-primary-btn">
                Meet him <MoveRight size={17} strokeWidth={1.5} />
              </a>
              <p className="vibex-hero-sub">
                Six years of edits, a self-trained AI, and a quiet obsession with
                making things that didn't exist before.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <a href="#who" className="scroll-hint" aria-label="Scroll to the story">
          <ArrowDown size={16} strokeWidth={1.5} />
        </a>
      </div>
      <div className="vibex-corner-meta" aria-hidden="true">
        <span>ASH / VIBEX</span>
        <span>IST · UTC+5:30</span>
      </div>
    </section>
  );
}

/* ---------- WHO HE IS ---------- */
function WhoChapter() {
  const { ref, inView } = useInView();
  return (
    <section id="who" className="vibex-chapter vibex-who" ref={ref} aria-label="Who Ash is">
      <div className="vibex-chapter-inner">
        <span className="chapter-index">01</span>
        <h2 className="chapter-title">Who he is</h2>
        <Narrator
          active={inView}
          text="He's 17. He doesn't have a job — he has obsessions. Edits, software, AI. Time zone: IST, UTC+5:30. Pronouns: he/him. He builds things that didn't exist before, because something inside him won't let him not."
        />
        <div className="who-stats">
          {[
            { v: 17, s: "", l: "years old" },
            { v: 3, s: "", l: "creative fields" },
            { v: 6, s: "+", l: "years creating" },
          ].map((st, i) => (
            <div key={st.l} className="who-stat">
              <Counter value={st.v} suffix={st.s} inView={inView} />
              <span>{st.l}</span>
            </div>
          ))}
        </div>
        <div className="who-traits">
          {["Creative", "Authentic", "Loyal"].map((t, i) => (
            <motion.span
              key={t}
              className="trait"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: 1.4 + i * 0.08 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STORY ---------- */
function StoryChapter() {
  const { ref, inView } = useInView();
  const reduced = useReducedMotion();
  const events = [
    { year: "2020", title: "The spark", body: "At 11, Ash opened Alight Motion for the first time after seeing an edit of his favourite anime character online. He kept reopening the project, trying to recreate what he saw — and failing, every single time." },
    { year: "The turn", title: "Stop chasing. Start creating.", body: "He realised chasing other editors' styles was a trap. The way forward was a style that only he could make." },
    { year: "6 years", title: "116 released edits. ~1,000 unfinished projects.", body: "Some edits changed direction. Some he disappeared for months. Some he thought about quitting. Every time he came back, he expressed his vision differently — not for fame, but because of the need inside him to grow." },
    { year: "Now", title: "He creates everything himself.", body: "Edits, software, websites, LLMs, bots, visuals, designs, 3D. Still not perfect. Still learning. Still experimenting — and that's the most exciting part." },
    { year: "Where he's going", title: "The vision", body: "The goal was never more edits. It's to build something that keeps evolving. One day you'll hear about him in a big YouTuber's video. Maybe in the news. Maybe in a research paper. Maybe on a stage. And you'll know exactly who he is." },
  ];
  return (
    <section id="story" className="vibex-chapter vibex-story" ref={ref} aria-label="Ash's story">
      <div className="vibex-chapter-inner">
        <span className="chapter-index">02</span>
        <h2 className="chapter-title">How it started</h2>
        <Narrator active={inView} text="Every story starts somewhere. This is his." />
        <div className="story-path" aria-hidden="true">
          <div className="story-path-line" />
        </div>
        <ol className="story-timeline">
          {events.map((e, i) => (
            <motion.li
              key={e.year}
              className="story-event"
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.8 + i * 0.16 }}
            >
              <span className="story-year">{e.year}</span>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
            </motion.li>
          ))}
        </ol>
        <motion.div className="story-quote" {...(inView ? { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, ease, delay: reduced ? 0 : 1.9 } } : { initial: {}, animate: {} })}>
          <Heart size={16} strokeWidth={1.4} />
          <em>Nice to meet you.</em>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- WORKS ---------- */
function WorksChapter() {
  const { ref, inView } = useInView();
  const reduced = useReducedMotion();
  const works = [
    { name: "Edits", type: "Signature anime edits · 2020 → now", stat: "54 public edits", statNum: 54, body: "His calling card. Mixed styles, constant experimentation, a signature that grew from 116 released edits and almost a thousand unfinished ones. Every edit is a small experiment in becoming.", img: "/manus-storage/orbit-project-lumen_b35926a9.png", link: links.youtube, linkLabel: "Watch on YouTube" },
    { name: "Nebula", type: "Custom LLM · in development", stat: "Months of training", statNum: 0, body: "A language model he built and trained himself on publicly available developer data — his own take on something like ChatGPT, made by hand. Still evolving, and still his.", img: "/manus-storage/orbit-hero-monolith_2fd74721.png", link: links.github, linkLabel: "Find the traces on GitHub" },
    { name: "Custom Discord client", type: "Software · closed source", stat: "Fully functional", statNum: 0, body: "A Discord client built entirely from scratch. Not a theme, not a mod — the whole thing, working end to end.", img: "/manus-storage/orbit-project-signal_c07b913d.png", link: undefined, linkLabel: undefined },
    { name: "Bots & open source", type: "Development · for fun", stat: "Countless", statNum: 0, body: "Discord bots of every kind, countless websites and applications, and contributions to open-source projects that matter to him.", img: "/manus-storage/orbit-project-lumen_b35926a9.png", link: links.github, linkLabel: "Explore on GitHub" },
  ];
  const skills = ["Editing", "Software development", "AI engineering", "Web development", "3D & visuals"];
  return (
    <section id="works" className="vibex-chapter vibex-works" ref={ref} aria-label="What Ash builds">
      <div className="vibex-chapter-inner">
        <span className="chapter-index">03</span>
        <h2 className="chapter-title">What he builds</h2>
        <Narrator active={inView} text="The evidence, in no particular order. Everything below was made by his own hands." />
        <ul className="works-grid">
          {works.map((w, i) => (
            <motion.li
              key={w.name}
              className={`work-card ${i === 0 ? "tall" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.7 + i * 0.12 }}
            >
              <div className="work-img">
                <img src={w.img} alt={`${w.name} — visual`} loading="lazy" />
                <span className="work-stat"><Counter value={w.statNum} inView={inView} /> <span>{w.stat}</span></span>
              </div>
              <div className="work-body">
                <span className="work-type">{w.type}</span>
                <h3>{w.name}</h3>
                <p>{w.body}</p>
                {w.link && (
                  <a href={w.link} target="_blank" rel="noreferrer" className="work-link">
                    {w.linkLabel} <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="skills-row">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              className="skill"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease, delay: reduced ? 0 : 1.6 + i * 0.06 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function HiChapter() {
  const { ref, inView } = useInView();
  const reduced = useReducedMotion();
  const contacts = [
    { label: "YouTube", handle: "@vibe.x.", href: links.youtube, icon: null },
    { label: "Email", handle: "Vibexforbusiness@gmail.com", href: `mailto:${links.email}`, icon: Mail },
    { label: "GitHub", handle: "akashthemagnificent-ux", href: links.github, icon: Github },
    { label: "TikTok", handle: "@tf.ash__", href: links.tiktok, icon: null },
    { label: "Discord", handle: "Tap to add · 944637…409", href: links.discord, icon: MessageCircle },
    { label: "Pinterest", handle: "pin.it/292aIB7hf", href: links.pinterest, icon: Pin },
  ];
  return (
    <section id="hi" className="vibex-chapter vibex-hi" ref={ref} aria-label="Say hi">
      <div className="vibex-chapter-inner">
        <span className="chapter-index">04</span>
        <h2 className="chapter-title vibex-hi-title">Say hi</h2>
        <Narrator active={inView} text="That's the person behind Vibex. Nice to meet you — now go say it back." />
        <ul className="contact-grid">
          {contacts.map((c, i) => (
            <motion.li
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: reduced ? 0 : 0.7 + i * 0.07 }}
            >
              <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {c.icon && <c.icon size={15} strokeWidth={1.5} />}
                <span className="c-label">{c.label}</span>
                <span className="c-handle">{c.handle}</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </motion.li>
          ))}
        </ul>
        <p className="boundary-note">
          Face, voice, location — some things stay private. This page is everything I chose to share.
        </p>
      </div>
      <footer className="site-footer">
        <span>VIBEX — ASH'S PERSONAL INTRODUCTION</span>
        <span>BUILT WITH OBSESSION</span>
      </footer>
    </section>
  );
}

/* ---------- PAGE ---------- */
export default function Home() {
  return (
    <div className="vibex-site">
      <a className="skip-link" href="#who">
        Skip to the story
      </a>
      <Hero />
      <main>
        <WhoChapter />
        <StoryChapter />
        <WorksChapter />
        <HiChapter />
      </main>
      <AskVibex />
    </div>
  );
}
