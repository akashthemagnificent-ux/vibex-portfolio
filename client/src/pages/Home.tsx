/**
 * VIBEX / Cobalt Proof Sheet
 * Auteur build register: lit mineral paper, a physical cobalt identity artifact,
 * expressive structural grotesque, and a strictly limited motion vocabulary.
 */
import { ArrowDown, ArrowUpRight, CornerDownRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BoxLoader from "@/components/ui/box-loader";

const navigation = [
  { label: "Index", target: "index" },
  { label: "Statement", target: "statement" },
  { label: "Method", target: "method" },
  { label: "Signal", target: "signal" },
];

function VibexStar({ className = "" }: { className?: string }) {
  return (
    <span className={`vibex-star ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  const artifactRef = useRef<HTMLAnchorElement>(null);
  const [activeScene, setActiveScene] = useState("index");
  const [entryState, setEntryState] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    const minimumDwellMs = 760;
    const startedAt = performance.now();
    let revealTimer: number | undefined;

    const reveal = () => {
      const remaining = Math.max(0, minimumDwellMs - (performance.now() - startedAt));
      revealTimer = window.setTimeout(() => setEntryState("leaving"), remaining);
    };

    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal, { once: true });

    return () => {
      window.removeEventListener("load", reveal);
      if (revealTimer) window.clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    if (entryState !== "leaving") return;
    const exitTimer = window.setTimeout(() => setEntryState("done"), 420);
    return () => window.clearTimeout(exitTimer);
  }, [entryState]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const primary = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (primary) setActiveScene(primary.target.id);
      },
      { threshold: [0.25, 0.55, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const artifact = artifactRef.current;
    if (!artifact || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = artifact.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      artifact.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      artifact.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
      artifact.style.setProperty("--shift-x", `${(x * 9).toFixed(1)}px`);
      artifact.style.setProperty("--shift-y", `${(y * 9).toFixed(1)}px`);
    };

    const reset = () => {
      artifact.style.setProperty("--tilt-x", "0deg");
      artifact.style.setProperty("--tilt-y", "0deg");
      artifact.style.setProperty("--shift-x", "0px");
      artifact.style.setProperty("--shift-y", "0px");
    };

    artifact.addEventListener("pointermove", handlePointerMove);
    artifact.addEventListener("pointerleave", reset);
    return () => {
      artifact.removeEventListener("pointermove", handlePointerMove);
      artifact.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <main className={`proof-shell ${entryState !== "done" ? "is-loading" : ""}`} aria-busy={entryState !== "done"}>
      {entryState !== "done" ? (
        <div className={`entry-loader ${entryState === "leaving" ? "is-leaving" : ""}`}>
          <BoxLoader label="Loading Vibex" />
        </div>
      ) : null}
      <header className="proof-header" aria-label="Primary navigation">
        <a className="proof-wordmark" href="#index" aria-label="Vibex home">
          <VibexStar />
          <span>V I B E X</span>
        </a>

        <nav className="proof-nav" aria-label="Page sections">
          {navigation.map((item) => (
            <a
              className={activeScene === item.target ? "proof-nav__item is-active" : "proof-nav__item"}
              href={`#${item.target}`}
              key={item.target}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="proof-menu" href="#signal">
          <span>Open file</span>
          <ArrowUpRight size={15} strokeWidth={1.7} />
        </a>
      </header>

      <section className="proof-hero" id="index" data-scene aria-labelledby="proof-title">
        <div className="proof-hero__copy">
          <p className="proof-caption proof-hero__caption motion-clip motion-clip--1">
            A personal identity, in active revision.
          </p>
          <h1 id="proof-title" className="proof-title">
            <span className="motion-clip motion-clip--2">Not a portfolio.</span>
            <span className="motion-clip motion-clip--3">A proof of <em>intent.</em></span>
          </h1>
          <div className="proof-hero__foot motion-clip motion-clip--4">
            <p>A first surface for a body of work that is still taking its shape.</p>
            <a className="quiet-link" href="#statement">
              <span>Read the statement</span>
              <ArrowDown size={17} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <a
          className="proof-artifact motion-clip motion-clip--2"
          href="#statement"
          ref={artifactRef}
          aria-label="Open the visual statement"
        >
          <img
            src="/manus-storage/vibex-cobalt-proof-sheet_07e6f1c8.png"
            alt="A cobalt folded proof sheet with a cut-out Vibex star"
            fetchPriority="high"
          />
          <span className="proof-artifact__fold" aria-hidden="true" />
          <span className="proof-artifact__sticker" aria-hidden="true">
            <VibexStar />
            <small>001</small>
          </span>
          <span className="proof-artifact__label" aria-hidden="true">Identity fragment / 001</span>
        </a>

        <div className="proof-hero__edge" aria-hidden="true">
          <span>Vibex / Issue 00</span>
          <span>2026</span>
        </div>
      </section>

      <section className="proof-statement" id="statement" data-scene aria-labelledby="statement-title">
        <div className="section-rule" aria-hidden="true" />
        <div className="proof-statement__marginal">There is no final version.</div>
        <div className="proof-statement__body">
          <p className="proof-caption section-caption">The page is the first object</p>
          <h2 id="statement-title" className="section-title wipe-reveal">
            Built for the person I&apos;m becoming, not the version easiest to describe.
          </h2>
        </div>
        <div className="proof-statement__note">
          <CornerDownRight size={18} strokeWidth={1.35} />
          <p>
            The work, the experiments, and the story can take their time. This establishes the language first.
          </p>
        </div>
      </section>

      <section className="proof-method" id="method" data-scene aria-labelledby="method-title">
        <div className="proof-method__head">
          <p className="proof-caption">A working method</p>
          <span className="method-rule" aria-hidden="true" />
          <p className="proof-method__aside">Three decisions that hold the page together.</p>
        </div>
        <div className="proof-method__frame">
          <h2 id="method-title" className="method-title">Less surface.<br />More <em>signal.</em></h2>
          <div className="proof-specimens" aria-label="Design principles">
            <article className="specimen specimen--type">
              <span className="specimen__symbol">Aa</span>
              <div>
                <h3>Type has weight.</h3>
                <p>It carries the page before decoration does.</p>
              </div>
            </article>
            <article className="specimen specimen--space">
              <span className="specimen__symbol specimen__symbol--star"><VibexStar /></span>
              <div>
                <h3>Space is a material.</h3>
                <p>It gives an idea enough room to matter.</p>
              </div>
            </article>
            <article className="specimen specimen--motion">
              <span className="specimen__symbol">→</span>
              <div>
                <h3>Movement earns its place.</h3>
                <p>It points forward when the story changes.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="proof-signal" id="signal" data-scene aria-labelledby="signal-title">
        <div className="proof-signal__mark"><VibexStar /></div>
        <p className="proof-caption proof-signal__caption">File stays open.</p>
        <h2 id="signal-title">A name is only<br />the first <em>layer.</em></h2>
        <p className="proof-signal__copy">The record is still being made.</p>
        <a className="proof-return" href="#index">Return to the first page <ArrowUpRight size={15} /></a>
      </section>
    </main>
  );
}
