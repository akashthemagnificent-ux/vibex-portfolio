/**
 * VIBEX / Quiet Precision foundation
 * Warm editorial canvas, ink typography, cobalt as a scarce signal, and slide-like motion.
 */
import { ArrowDownRight, Asterisk, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", target: "home" },
  { label: "Record", target: "record" },
  { label: "Motion", target: "motion" },
  { label: "Signal", target: "signal" },
];

function VibexMark({ className = "" }: { className?: string }) {
  return (
    <span className={`vibex-mark ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  const [activeScene, setActiveScene] = useState("home");

  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveScene(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7] },
    );
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="vibex-shell">
      <header className="vibex-header" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="Vibex home">
          <VibexMark />
          <span>Vibex</span>
        </a>

        <nav className="nav-rail" aria-label="Page sections">
          {navItems.map((item) => (
            <a
              className={activeScene === item.target ? "nav-item is-active" : "nav-item"}
              href={`#${item.target}`}
              key={item.target}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <span className="header-note">EST. 2020</span>
          <a className="header-cta" href="#signal">
            <span>Enter</span>
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>
      </header>

      <section className="hero-scene" data-scene id="home" aria-labelledby="hero-title">
        <div className="hero-meta hero-reveal hero-reveal--1">
          <span className="micro-label">00 / Private creative signal</span>
          <span className="micro-label">Ash — India</span>
        </div>

        <div className="hero-gridline" aria-hidden="true" />
        <div className="hero-cursor" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow hero-reveal hero-reveal--1">The person behind the name</p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-line hero-reveal hero-reveal--2">People know</span>
            <span className="hero-line hero-reveal hero-reveal--3">the <em>name.</em></span>
            <span className="hero-line hero-reveal hero-reveal--4">Almost nobody</span>
            <span className="hero-line hero-reveal hero-reveal--5">knows the person.</span>
          </h1>
        </div>

        <aside className="hero-aside hero-reveal hero-reveal--5">
          <span className="aside-rule" aria-hidden="true" />
          <p>
            A personal record of visual experiments, creative systems, and whatever comes next.
          </p>
        </aside>

        <a className="hero-prompt hero-reveal hero-reveal--5" href="#record">
          <span>Open the record</span>
          <ArrowDownRight size={19} strokeWidth={1.5} />
        </a>

        <div className="hero-stamp hero-reveal hero-reveal--4" aria-hidden="true">
          <VibexMark />
          <span>V</span>
          <span>I</span>
          <span>B</span>
          <span>E</span>
          <span>X</span>
        </div>

        <div className="hero-index hero-reveal hero-reveal--5">
          <span>01</span>
          <span>Identity / 00</span>
        </div>
      </section>

      <section className="editorial-scene scene-record" data-scene id="record" aria-labelledby="record-title">
        <div className="scene-index">01</div>
        <div className="scene-line" aria-hidden="true" />
        <div className="scene-layout">
          <p className="eyebrow scene-kicker">A foundation, not a résumé</p>
          <h2 id="record-title" className="scene-title">Everything begins<br />with a <em>signal.</em></h2>
          <div className="scene-note">
            <span className="aside-rule" aria-hidden="true" />
            <p>
              This is the visual base. The work, stories, and experiments will arrive one considered chapter at a time.
            </p>
          </div>
        </div>
        <div className="number-ghost" aria-hidden="true">01</div>
      </section>

      <section className="motion-scene" data-scene id="motion" aria-labelledby="motion-title">
        <div className="motion-topline">
          <p className="eyebrow">02 / Motion language</p>
          <p className="micro-label">Precision in movement</p>
        </div>
        <h2 id="motion-title" className="motion-title">The page moves<br />only when it has <em>something to say.</em></h2>
        <div className="slide-strip" aria-label="Visual motion principles">
          <article className="slide-card slide-card--ink">
            <span className="slide-number">A</span>
            <p>Text arrives in measured layers.</p>
          </article>
          <article className="slide-card slide-card--paper">
            <span className="slide-number">B</span>
            <p>Space holds the attention.</p>
          </article>
          <article className="slide-card slide-card--blue">
            <span className="slide-number">C</span>
            <p>Cobalt marks what matters.</p>
          </article>
        </div>
      </section>

      <section className="signal-scene" data-scene id="signal" aria-labelledby="signal-title">
        <div className="signal-lockup">
          <VibexMark />
          <p className="eyebrow">03 / Base signal established</p>
        </div>
        <h2 id="signal-title">The next instruction<br />sets the <em>direction.</em></h2>
        <p className="signal-copy">The base is intentionally quiet. Send the next part when you’re ready.</p>
        <a className="signal-link" href="#home">Back to top <Asterisk size={13} /></a>
      </section>
    </main>
  );
}
