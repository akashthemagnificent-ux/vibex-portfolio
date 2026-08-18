/** Ash / Vibex — privacy-respecting personal record. */
import { ArrowDown, ArrowUpRight, CornerDownRight } from "lucide-react";
import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import Aurora from "@/components/Aurora";
import MoltenMetal from "@/components/MoltenMetal";
import ParticleText from "@/components/ParticleText";
import HeroTypographyScene from "@/components/HeroTypographyScene";
import StoryFlight from "@/components/StoryFlight";
import BoxLoader from "@/components/ui/box-loader";

const FloatingLines = lazy(() => import("@/components/FloatingLines"));

class AmbientWebGLBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

const navigation = [
  { label: "Index", target: "index" },
  { label: "About", target: "statement" },
  { label: "Story", target: "story" },
  { label: "Works", target: "works" },
  { label: "Signal", target: "signal" },
];

const storyEntries = [
  {
    mark: "2020 / 11",
    title: "The first edit",
    text: "After seeing an edit of a favourite anime character, I opened Alight Motion and kept reopening the same kind of project. I wanted to make something that felt like the work I had seen, but I could never make it feel like mine.",
  },
  {
    mark: "THE TURN",
    title: "A style is built, not found",
    text: "Eventually, I stopped trying to recreate what already existed. I started mixing references, breaking my own rules, and searching for a visual language that could carry my signature.",
  },
  {
    mark: "6 YEARS",
    title: "116 released. Nearly 1,000 unfinished.",
    text: "The unfinished projects matter as much as the public ones. I changed direction, disappeared, considered quitting, and came back. Every return taught me another way to express the same need to create.",
  },
  {
    mark: "NOW",
    title: "The field keeps widening",
    text: "Editing led to software, websites, LLMs, bots, visual systems, and 3D experiments. I am still learning, still experimenting, and still more interested in the next version than a finished label.",
  },
];

const works = [
  {
    number: "01",
    label: "Editing / public record",
    title: "Anime edits",
    text: "Fifty-four edits are publicly available on YouTube. Across six years, I have released 116 edits while continually rebuilding my own visual style.",
    meta: "YouTube · @vibe.x.",
    href: "https://youtube.com/@vibe.x.",
    action: "Watch the edits",
  },
  {
    number: "02",
    label: "AI / ongoing",
    title: "Nebula",
    text: "A self-trained LLM built with publicly available developer data. It is a long-running experiment in building an assistant from the ground up, and it is still evolving.",
    meta: "Developer-focused LLM",
  },
  {
    number: "03",
    label: "Software / closed source",
    title: "Custom Discord client",
    text: "A fully functional Discord client built from scratch. It stays private for now, but it is part of the work that taught me to think through complete software systems.",
    meta: "Built independently",
  },
  {
    number: "04",
    label: "Systems / open practice",
    title: "Bots & workflows",
    text: "Custom Discord bots, an agentic workflow, websites, applications, and contributions to open-source projects—built because an idea was worth testing.",
    meta: "GitHub · akashthemagnificent-ux",
    href: "https://github.com/akashthemagnificent-ux",
    action: "Open GitHub",
  },
];

const contactLinks = [
  { label: "YouTube", detail: "@vibe.x.", href: "https://youtube.com/@vibe.x." },
  { label: "GitHub", detail: "akashthemagnificent-ux", href: "https://github.com/akashthemagnificent-ux" },
  { label: "Email", detail: "Vibexforbusiness@gmail.com", href: "mailto:Vibexforbusiness@gmail.com" },
  { label: "Discord", detail: "@Vibex", href: "https://discord.com/users/944637135477178409" },
  { label: "TikTok", detail: "@tf.ash__", href: "https://tiktok.com/@tf.ash__" },
  { label: "Pinterest", detail: "pin.it/292aIB7hf", href: "https://pin.it/292aIB7hf" },
];

function VibexStar({ className = "" }: { className?: string }) {
  return <span className={`vibex-star ${className}`} aria-hidden="true"><i /><i /><i /><i /></span>;
}

function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const isEmail = href.startsWith("mailto:");
  return <a className={className} href={href} {...(!isEmail ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
}

export default function Home() {
  const [activeScene, setActiveScene] = useState("index");
  const [entryState, setEntryState] = useState<"loading" | "leaving" | "done">("loading");
  useEffect(() => {
    const startedAt = performance.now();
    let revealTimer: number | undefined;
    const reveal = () => {
      revealTimer = window.setTimeout(() => setEntryState("leaving"), Math.max(0, 760 - (performance.now() - startedAt)));
    };
    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal, { once: true });
    return () => { window.removeEventListener("load", reveal); if (revealTimer) window.clearTimeout(revealTimer); };
  }, []);

  useEffect(() => {
    if (entryState !== "leaving") return;
    const exitTimer = window.setTimeout(() => setEntryState("done"), 420);
    return () => window.clearTimeout(exitTimer);
  }, [entryState]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver((entries) => {
      const primary = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (primary) setActiveScene(primary.target.id);
    }, { threshold: [0.25, 0.55, 0.8] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={`proof-shell ${entryState !== "done" ? "is-loading" : ""}`} aria-busy={entryState !== "done"}>
      {entryState !== "done" ? <div className={`entry-loader ${entryState === "leaving" ? "is-leaving" : ""}`}><BoxLoader label="Loading Vibex" /></div> : null}
      <header className="proof-header" aria-label="Primary navigation">
        <a className="proof-wordmark" href="#index" aria-label="Vibex home"><VibexStar /><span>V I B E X</span></a>
        <nav className="proof-nav" aria-label="Page sections">
          {navigation.map((item) => <a className={activeScene === item.target ? "proof-nav__item is-active" : "proof-nav__item"} href={`#${item.target}`} key={item.target}>{item.label}</a>)}
        </nav>
        <a className="proof-menu" href="#signal"><span>Open file</span><ArrowUpRight size={15} strokeWidth={1.7} /></a>
      </header>

      <section className="proof-hero" id="index" data-scene aria-labelledby="proof-title">
        <div className="proof-molten-metal" aria-hidden="true"><AmbientWebGLBoundary><MoltenMetal color1="#2a3027" color2="#9a885f" color3="#f3d4a3" speed={0.16} scale={3.6} detail={8} glow={1.45} coreSize={0.09} swirl={0.82} fold={-0.22} blackPoint={0.12} brightness={0.9} colorMode="frost" grain={true} grainIntensity={0.035} mouseInteraction={true} mouseStrength={0.14} opacity={0.82} /></AmbientWebGLBoundary></div>
        <div className="proof-aurora" aria-hidden="true"><Aurora colorStops={["#1d241d", "#9bae9f", "#d8c19a"]} amplitude={0.42} blend={0.56} speed={0.18} /></div>
        <div className="proof-hero__copy">
          <p className="proof-caption proof-hero__caption motion-clip motion-clip--1">Ash / Vibex · he/him · 17 · IST</p>
          <h1 id="proof-title" className="proof-title proof-title--particles" aria-label="People know the name. Almost nobody knows the person."><ParticleText text={'People know\nthe name.\nAlmost nobody\nknows the person.'} particleSize={2.8} density={2} color="#f2ebdd" highlightColor="#d8c19a" scatter={180} gatherDuration={1600} stagger={420} pointerRepel={40} repelRadius={120} idleDrift={0.16} trigger="mount" fontSize="clamp(3.1rem, 13.5vw, 6.6rem)" fontWeight={700} fontFamily="'Satoshi', system-ui, sans-serif" glow={true} lineHeight={0.92} initiallySettled={true} /></h1>
          <div className="proof-hero__foot motion-clip motion-clip--4"><p>Editing, software, AI systems, and anything that makes room for a new idea.</p><a className="quiet-link" href="#statement"><span>Begin the record</span><ArrowDown size={17} strokeWidth={1.5} /></a></div>
        </div>
        <HeroTypographyScene />
        <div className="proof-hero__edge" aria-hidden="true"><span>Vibex / personal record</span><span>2026</span></div>
      </section>

      <section className="proof-statement" id="statement" data-scene aria-labelledby="statement-title">
        <div className="section-rule" aria-hidden="true" /><div className="proof-statement__marginal">Creative · Authentic · Loyal</div>
        <div className="proof-statement__body"><p className="proof-caption section-caption">The person behind the name</p><h2 id="statement-title" className="section-title wipe-reveal">Hi, I&apos;m Ash. I make things that didn&apos;t exist before I needed them.</h2></div>
        <div className="proof-statement__note"><CornerDownRight size={18} strokeWidth={1.35} /><p>I&apos;m a teenager managing academics alongside independent editing, software experiments, and AI projects. I value genuine connection, self-expression, individuality, and work that feels meaningful. This record intentionally leaves out my face, voice, location, and personal relationships.</p></div>
      </section>

      <section className="proof-method proof-story" id="story" data-scene aria-labelledby="story-title">
        <div className="proof-method__head"><p className="proof-caption">A story in revisions</p><span className="method-rule" aria-hidden="true" /><p className="proof-method__aside">Not a straight line. A continuing practice.</p></div>
        <div className="proof-method__frame">
          <h2 id="story-title" className="method-title">I started at eleven.<br />The <em>work</em> kept changing.</h2>
          <div className="story-ledger" aria-label="Ash's creative story">
            {storyEntries.map((entry) => <article className="story-entry" key={entry.mark}><p className="story-entry__mark">{entry.mark}</p><div><h3>{entry.title}</h3><p>{entry.text}</p></div></article>)}
          </div>
          <p className="story-closing">I don&apos;t have shiny awards or big names behind me. If learning, growth, improvement, and consistency count as achievements, I&apos;ve earned those back to back.</p>
          <StoryFlight />
        </div>
      </section>

      <section className="proof-works" id="works" data-scene aria-labelledby="works-title">
        <div className="works-head"><p className="proof-caption">Selected signals</p><span className="method-rule" aria-hidden="true" /><p className="proof-method__aside">Public work, private systems, ongoing experiments.</p></div>
        <h2 id="works-title" className="works-title">What I make when an idea won&apos;t leave me <em>alone.</em></h2>
        <div className="work-grid">
          {works.map((work) => <article className="work-card" key={work.number}>
            <div className="work-card__top"><span>{work.number}</span><span>{work.label}</span></div>
            <div className="work-card__body"><h3>{work.title}</h3><p>{work.text}</p></div>
            <div className="work-card__foot"><span>{work.meta}</span>{work.href && work.action ? <ExternalLink href={work.href} className="work-link">{work.action} <ArrowUpRight size={14} /></ExternalLink> : <span className="work-status">In the record</span>}</div>
          </article>)}
        </div>
        <div className="skills-strip" aria-label="Skills"><span>Editing</span><span>Software development</span><span>AI engineering</span><span>Visual systems</span></div>
      </section>

      <section className="proof-signal" id="signal" data-scene aria-labelledby="signal-title">
        <div className="proof-floating-lines" aria-hidden="true">
          <AmbientWebGLBoundary><Suspense fallback={null}><FloatingLines linesGradient={["#324035", "#9bae9f", "#d8c19a"]} enabledWaves={["middle", "bottom"]} lineCount={[3, 4]} lineDistance={[13, 19]} middleWavePosition={{ x: 2.7, y: 0.06, rotate: 0.12 }} bottomWavePosition={{ x: 1.5, y: -0.5, rotate: 0.24 }} animationSpeed={0.18} interactive={false} parallax={false} mixBlendMode="screen" /></Suspense></AmbientWebGLBoundary>
        </div>
        <div className="proof-signal__mark"><VibexStar /></div>
        <div className="signal-copy">
          <p className="proof-caption proof-signal__caption">Nice to meet you.</p>
          <h2 id="signal-title">The goal is not more edits. It&apos;s to build what <em>evolves.</em></h2>
          <p className="proof-signal__copy">One day, I hope the work speaks in places I have not reached yet: a video, a paper, a stage, or something that has not been invented. Until then, I&apos;ll keep making the next thing myself.</p>
        </div>
        <div className="signal-contact" aria-label="Contact links">
          {contactLinks.map((link) => <ExternalLink href={link.href} className="contact-link" key={link.label}><span>{link.label}</span><strong>{link.detail}</strong><ArrowUpRight size={14} /></ExternalLink>)}
        </div>
        <a className="proof-return" href="#index">Return to the first page <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}
