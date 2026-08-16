/**
 * Orbiting Monolith style: dark neo-editorial composition, Orbit Acid signals,
 * an asymmetrical flow, and one cursor-responsive WebGL artifact as the hero.
 */
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Asterisk, ChevronDown, Github, Instagram, Linkedin, MoveRight } from "lucide-react";
import OrbitalMonolith from "@/components/OrbitalMonolith";
import SectionLabel from "@/components/SectionLabel";

const projects = [
  {
    number: "01",
    name: "Lumen Field",
    type: "Digital identity / 2025",
    image: "/manus-storage/orbit-project-lumen_b35926a9.png",
    layout: "project-card--wide",
  },
  {
    number: "02",
    name: "Signal Objects",
    type: "Commerce experience / 2024",
    image: "/manus-storage/orbit-project-signal_c07b913d.png",
    layout: "project-card--tall",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + index * 0.08, duration: 0.72 },
  }),
};

export default function Home() {
  const reducedMotion = useReducedMotion();
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="portfolio-shell">
      <div className="noise" aria-hidden="true" />
      <div className="left-rail" aria-hidden="true">
        <span>00</span>
        <div className="rail-line"><i /></div>
        <span className="rail-rotation">SCROLL TO EXPLORE</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Orbit home">
          <img src="/manus-storage/orbit-symbol_15db209d.png" alt="Orbit split-orbit mark" />
          <span>ORBIT</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="availability" href="mailto:hello@orbit-studio.dev"><i /> Available for select work</a>
      </header>

      <section id="top" className="hero">
        <div className="hero-content">
          <motion.div initial="hidden" animate="visible" variants={reveal} custom={0} className="eyebrow">
            <span>Independent creative developer</span><Asterisk size={14} strokeWidth={1.4} /><span>Based everywhere</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} custom={1}>
            Digital work<br />with a <em>pulse.</em>
          </motion.h1>
          <motion.div initial="hidden" animate="visible" variants={reveal} custom={2} className="hero-bottom">
            <p>I build visual identities and digital experiences for people turning meaningful ideas into momentum.</p>
            <button className="round-action" onClick={() => scrollTo("work")} aria-label="View selected work">
              <ArrowDownRight size={26} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>
        <div className="hero-art" aria-label="Interactive 3D orbital sculpture">
          <img className="hero-art-echo" src="/manus-storage/orbit-hero-monolith_2fd74721.png" alt="" />
          <OrbitalMonolith />
          <div className="orbit-note note-one">ORBITAL<br />STUDY / 01</div>
          <div className="orbit-note note-two">DRAG THE<br />HORIZON</div>
        </div>
        <div className="hero-index">
          <span>01 — 04</span>
          <span>2024 / 25</span>
        </div>
      </section>

      <section id="work" className="work-section section-shell">
        <SectionLabel index="01" label="Selected work" />
        <motion.div
          className="section-intro"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
        >
          <p className="intro-kicker">A small orbit of recent commissions</p>
          <h2>Useful <em>and</em><br />unforgettable.</h2>
          <p className="intro-body">From strategy to the final interaction, each engagement is shaped to leave a specific impression—not merely a clean interface.</p>
        </motion.div>

        <div className="project-list">
          {projects.map((project, index) => (
            <motion.a
              href="#contact"
              className={`project-card ${project.layout}`}
              key={project.name}
              initial={reducedMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              custom={index + 1}
            >
              <img src={project.image} alt="" />
              <div className="project-shade" />
              <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
              <div className="project-name"><h3>{project.name}</h3><span><ArrowUpRight size={24} strokeWidth={1.4} /></span></div>
            </motion.a>
          ))}
          <a className="project-link-block" href="mailto:hello@orbit-studio.dev">
            <span>Archive / 03</span>
            <strong>View the<br />full orbit.</strong>
            <MoveRight size={28} strokeWidth={1.35} />
          </a>
        </div>
      </section>

      <section id="about" className="about-section section-shell">
        <SectionLabel index="02" label="Practice" />
        <div className="about-grid">
          <motion.div initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}>
            <p className="intro-kicker">Less agency. More amplifier.</p>
            <h2>I design<br /><em>the signal,</em><br />not the noise.</h2>
          </motion.div>
          <motion.div className="about-copy" initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal} custom={1}>
            <p>Orbit is the independent practice of a multi-disciplinary creative developer. I partner closely with founding teams, cultural institutions, and product leaders who want their work to feel unmistakably theirs.</p>
            <p>I work across the complete system: identity, art direction, interaction design, and expressive front-end builds.</p>
            <a href="mailto:hello@orbit-studio.dev">More about the practice <ArrowUpRight size={15} /></a>
          </motion.div>
        </div>
        <div className="capabilities">
          {[
            ["01", "Brand systems", "A point of view, made usable."],
            ["02", "Digital experiences", "Interfaces with real physicality."],
            ["03", "Creative development", "Responsive motion, built precisely."],
          ].map(([number, title, line]) => <div className="capability" key={number}><span>{number}</span><h3>{title}</h3><p>{line}</p></div>)}
        </div>
      </section>

      <section id="contact" className="contact-section section-shell">
        <SectionLabel index="03" label="Contact" />
        <div className="contact-top">
          <p className="intro-kicker">A new orbit begins here</p>
          <a className="contact-title" href="mailto:hello@orbit-studio.dev">Let’s make<br /><em>something move.</em><ArrowUpRight /></a>
        </div>
        <footer>
          <div><span>© ORBIT STUDIO 2025</span><span>DESIGNED FOR MOTION</span></div>
          <div className="socials"><a href="#top" aria-label="Instagram"><Instagram size={17} /></a><a href="#top" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#top" aria-label="Github"><Github size={17} /></a></div>
        </footer>
      </section>
      <button className="scroll-cue" onClick={() => scrollTo("work")} aria-label="Scroll to selected work"><ChevronDown size={17} /></button>
    </main>
  );
}
