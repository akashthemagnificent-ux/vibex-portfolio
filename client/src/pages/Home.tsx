/**
 * VIBEX / Memory Observatory homepage.
 * The copy is intentionally secondary: it annotates an explorable WebGL world instead of replacing it.
 */
import { useCallback, useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Box, Move3D, Orbit, Sparkles } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import MemoryObservatory, { observatoryLandmarks } from "@/components/MemoryObservatory";
import { socialLinks } from "@/lib/ash";

const storyStops = [
  {
    eyebrow: "00 / THE PERSON BEHIND THE NAME",
    statement: "People know the name.\nAlmost nobody knows the person behind it.",
    body: "Hi, I’m Ash. Vibex is the name I create under. I’m 17, on IST, and obsessed with building things that did not exist before.",
    action: "Explore the observatory",
  },
  {
    eyebrow: "01 / THE FIRST FRAME",
    statement: "I stopped chasing the light.\nThen I learned to create it.",
    body: "In 2020, at 11, I opened Alight Motion after watching an anime edit. I kept failing to recreate it. That was the moment I decided my style did not need to look like anybody else’s.",
    action: "Find the archive",
  },
  {
    eyebrow: "02 / THE ARCHIVE",
    statement: "116 released edits.\nAlmost a thousand ways to learn.",
    body: "54 edits are public on my YouTube. The rest are experiments, restarts, and unfinished ideas. I never wanted to make more of the same — I wanted each one to become more mine.",
    action: "Open YouTube",
  },
  {
    eyebrow: "03 / THE NEBULA CORE",
    statement: "I taught an idea\nhow to think back.",
    body: "Nebula is my custom language model, trained on publicly available developer data. Around it: a Discord client built from scratch, countless bots, websites, software, and open-source contributions.",
    action: "See GitHub",
  },
  {
    eyebrow: "04 / THE OPEN PORTAL",
    statement: "I am still learning.\nThat is the whole point.",
    body: "I am not looking for a title or a label. I am building toward something exceptional, wherever the next experiment takes me. Creative, authentic, loyal — and far from finished.",
    action: "Keep in touch",
  },
] as const;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const stops = Array.from(document.querySelectorAll<HTMLElement>("[data-story-stop]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveIndex(Number((visible.target as HTMLElement).dataset.storyStop));
    }, { threshold: [0.35, 0.52, 0.72], rootMargin: "-8% 0px -12% 0px" });
    stops.forEach((stop) => observer.observe(stop));
    return () => observer.disconnect();
  }, []);

  const goToLandmark = useCallback((index: number) => {
    setActiveIndex(index);
    document.getElementById(`landmark-${index}`)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [reducedMotion]);

  const contentAction = (index: number) => {
    if (index === 2) return <a href="https://youtube.com/@vibe.x." target="_blank" rel="noreferrer">{storyStops[index].action}<ArrowUpRight size={16} /></a>;
    if (index === 3) return <a href="https://github.com/akashthemagnificent-ux" target="_blank" rel="noreferrer">{storyStops[index].action}<ArrowUpRight size={16} /></a>;
    if (index === 4) return <a href="mailto:Vibexforbusiness@gmail.com">{storyStops[index].action}<ArrowUpRight size={16} /></a>;
    return <button type="button" onClick={() => goToLandmark(index + 1)}>{storyStops[index].action}<ArrowDownRight size={16} /></button>;
  };

  return <main className="observatory-page">
    <MemoryObservatory activeIndex={activeIndex} onSelect={goToLandmark} reduceMotion={reducedMotion} />
    <a className="skip-link" href="#landmark-0">Skip to story</a>
    <header className="observatory-header"><a href="#landmark-0" onClick={(event) => { event.preventDefault(); goToLandmark(0); }}>VIBEX<span>●</span></a><p>ASH / PERSONAL OBSERVATORY</p><p>IST / UTC +5:30</p></header>
    <div className="observatory-instructions"><Move3D size={15} /><span>Move through the world</span><i /> <span>Hover the artefacts</span><i /> <span>Scroll the path</span></div>
    <div className="story-layer">
      {storyStops.map((stop, index) => <section key={stop.eyebrow} id={`landmark-${index}`} data-story-stop={index} className={`story-stop story-stop--${index}`}>
        <article className="story-card">
          <p className="story-card__eyebrow">{stop.eyebrow}</p>
          <h1>{stop.statement.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="story-card__body">{stop.body}</p>
          <div className="story-card__action">{contentAction(index)}</div>
          <p className="story-card__object"><Box size={14} /> {observatoryLandmarks[index].title}</p>
        </article>
      </section>)}
      <section className="contact-deck">
        <div><p className="story-card__eyebrow">SIGNAL / KEEP IN TOUCH</p><h2>Everything I share,<br /><em>on my terms.</em></h2><p>My face, voice, location, and personal relationships remain private. The work is public. That is enough.</p></div>
        <nav aria-label="Vibex social links">{socialLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><span>{link.label}</span><b>{link.value}</b><ArrowUpRight size={15} /></a>)}</nav>
        <div className="contact-deck__seal"><Orbit size={18} /><span>VIBEX / ASH</span><Sparkles size={15} /></div>
      </section>
    </div>
  </main>;
}
