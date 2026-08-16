/**
 * VIBEX / Reference-led homepage: an interactive midnight self-interview that unfolds as full-screen scenes.
 * The layout prioritizes film-like pacing, emotional scale, light, and narrative breathing room.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Sparkles } from "lucide-react";
import AuroraField from "@/components/AuroraField";
import SelfInterview from "@/components/SelfInterview";
import { skills, socialLinks, type AudioScene } from "@/lib/ash";
import { useCinematicAudio } from "@/hooks/useCinematicAudio";

const sceneMotion = {
  initial: { opacity: 0, y: 26, filter: "blur(9px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { amount: 0.48, once: true },
  transition: { duration: 0.92, ease: [0.23, 1, 0.32, 1] as const },
};

export default function Home() {
  const [hasBegun, setHasBegun] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { begin, playScene, started } = useCinematicAudio();
  const rootRef = useRef<HTMLElement>(null);

  const startFilm = useCallback(async () => {
    await begin();
    setHasBegun(true);
  }, [begin]);

  useEffect(() => {
    if (!started || !rootRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playScene(entry.target.getAttribute("data-audio-scene") as AudioScene);
        });
      },
      { threshold: 0.6 },
    );
    const scenes = rootRef.current.querySelectorAll<HTMLElement>("[data-audio-scene]");
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [started, playScene]);

  return (
    <main ref={rootRef} className={`vibex-film ${hasBegun ? "has-begun" : ""}`}>
      <AuroraField />
      <div className="film-grain" aria-hidden="true" />
      <a className="skip-link" href="#origin">Skip to the story</a>

      <AnimatePresence>
        {!hasBegun && (
          <motion.section className="begin-gate" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }}>
            <AuroraField intensity="low" />
            <div className="begin-gate__content">
              <p className="scene-kicker">VIBEX / A SELF-INTERVIEW</p>
              <div className="signal-dot" aria-hidden="true"><i /><i /><i /></div>
              <h1>People know the name.<br />Almost nobody knows the person.</h1>
              <p>This story is meant to be heard.</p>
              <button type="button" className="begin-button" onClick={startFilm}>
                <Play size={15} fill="currentColor" /> Begin the self-interview
              </button>
            </div>
            <p className="begin-gate__foot">Sound begins after you enter.</p>
          </motion.section>
        )}
      </AnimatePresence>

      <header className="film-header">
        <span>VIBEX</span><span>ASH / IST</span><span>2026</span>
      </header>

      <section data-audio-scene="signal" className="scene scene--signal">
        <motion.div {...sceneMotion} className="scene__center signal-copy">
          <p className="scene-kicker">VIBEX / A PERSONAL INTRODUCTION</p>
          <div className="eyes" aria-hidden="true"><i /><i /></div>
          <h1>
            <span>People know the name.</span>
            <em>Almost nobody knows the person behind it.</em>
          </h1>
          <p className="scene__lede">Hi, I’m Ash. You might know me as Vibex.</p>
        </motion.div>
        <a className="scene-scroll" href="#origin" aria-label="Scroll to the beginning"><ArrowDown size={17} /></a>
      </section>

      <section id="origin" data-audio-scene="origin" className="scene scene--origin">
        <div className="scene__copy scene__copy--left">
          <motion.p {...sceneMotion} className="scene-kicker">01 / THE BEGINNING</motion.p>
          <motion.h2 {...sceneMotion}>Every story starts somewhere.<br /><em>This one began in 2020.</em></motion.h2>
          <motion.p {...sceneMotion} className="scene__body">At 11, Ash opened Alight Motion after seeing an edit of his favourite anime character. He tried to create something like it. Then, again. And again.</motion.p>
        </div>
        <div className="origin-terminal" aria-hidden="true"><span>2020</span><b>ALIGHT MOTION</b><small>INITIALIZING A DIFFERENT DIRECTION...</small></div>
        <div className="echo-words" aria-hidden="true"><span>again</span><span>again</span><span>again</span></div>
      </section>

      <section data-audio-scene="becoming" className="scene scene--becoming">
        <div className="bokeh bokeh--one" /><div className="bokeh bokeh--two" /><div className="bokeh bokeh--three" />
        <motion.div {...sceneMotion} className="scene__center becoming-copy">
          <p className="scene-kicker">02 / THE WORK</p>
          <p className="interlude">He stopped chasing a style. He started building one.</p>
          <div className="number-cloud">
            <strong>6</strong><span>years creating</span>
            <strong>116</strong><span>released edits</span>
            <strong>~1000</strong><span>unfinished attempts</span>
          </div>
          <p className="scene__body">Sometimes he changed direction. Sometimes he disappeared. Every return was another way to express the same need: create something that did not exist before.</p>
        </motion.div>
        <div className="bubble-stream" aria-label="Creative fields"><span>anime edits</span><span>visuals</span><span>design</span><span>3D</span><span>experiments</span></div>
      </section>

      <section data-audio-scene="builds" className="scene scene--builds">
        <div className="build-monitor">
          <div className="build-monitor__top"><span>03 / WHAT HE BUILDS</span><span>STATUS: EVOLVING</span></div>
          <motion.div {...sceneMotion} className="build-lines">
            <article><span>01</span><h3>Edits</h3><p>54 public edits on YouTube. The calling card that started it all.</p><a href="https://youtube.com/@vibe.x." target="_blank" rel="noreferrer">Watch the edits <ArrowUpRight size={15} /></a></article>
            <article><span>02</span><h3>Nebula</h3><p>A self-trained language model for developer data. Still in motion.</p><a href="https://github.com/akashthemagnificent-ux" target="_blank" rel="noreferrer">Find the traces <ArrowUpRight size={15} /></a></article>
            <article><span>03</span><h3>Discord client</h3><p>A fully functional custom client, built from scratch. Closed source.</p></article>
            <article><span>04</span><h3>Bots + open source</h3><p>Countless bots, applications, websites, and contributions made for curiosity.</p></article>
          </motion.div>
        </div>
        <button className="interview-launch" type="button" onClick={() => setInterviewOpen(true)}><Sparkles size={15} /> Ask Ash something</button>
      </section>

      <section data-audio-scene="vision" className="scene scene--vision">
        <div className="planet planet--large" /><div className="planet planet--small" /><div className="glint glint--one">✦</div><div className="glint glint--two">✦</div>
        <motion.div {...sceneMotion} className="scene__center vision-copy">
          <p className="scene-kicker">04 / WHERE HE IS GOING</p>
          <h2>The goal was never<br /><em>more of the same.</em></h2>
          <p className="scene__body">It is to build something that keeps evolving. Maybe one day the name shows up in a video, on a stage, in research, or somewhere new. The person behind it will still be learning.</p>
        </motion.div>
      </section>

      <section className="scene scene--close">
        <motion.div {...sceneMotion} className="scene__center close-copy">
          <p className="scene-kicker">THE END / OR THE START</p>
          <h2>Nice to meet you.</h2>
          <div className="skill-roll">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          <p className="scene__body">Creative. Authentic. Loyal. Building things that feel meaningful — while managing school, learning out loud, and keeping the private parts private.</p>
          <div className="social-roll">
            {socialLinks.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><span>{link.label}</span>{link.value}<ArrowUpRight size={14} /></a>)}
          </div>
          <p className="privacy-note">Face, voice, location, and personal relationships stay private. This is everything Ash chose to share.</p>
        </motion.div>
      </section>

      <footer className="film-footer"><span>VIBEX / ASH</span><span>BUILT WITH OBSESSION</span><button type="button" onClick={() => setInterviewOpen(true)}>OPEN SELF-INTERVIEW</button></footer>
      <SelfInterview open={interviewOpen} onClose={() => setInterviewOpen(false)} />
      {!shouldReduceMotion && <div className="corner-orbit" aria-hidden="true" />}
    </main>
  );
}
