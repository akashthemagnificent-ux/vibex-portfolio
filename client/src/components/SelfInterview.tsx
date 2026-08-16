/**
 * VIBEX / Interaction direction: a full-screen interview interlude, not a support-widget chat card.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { questionBank } from "@/lib/ash";

type SelfInterviewProps = { open: boolean; onClose: () => void };

export default function SelfInterview({ open, onClose }: SelfInterviewProps) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const answer = questionBank[activeQuestion];

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          aria-label="Self interview"
          className="self-interview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="self-interview__noise" />
          <header className="self-interview__bar">
            <span>VIBEX / SELF-INTERVIEW</span>
            <button type="button" onClick={onClose} aria-label="Close self interview" className="plain-icon-button">
              <X size={18} />
            </button>
          </header>
          <div className="self-interview__content">
            <p className="scene-kicker">ASK THE PERSON BEHIND THE NAME</p>
            <div className="interview-questions" role="tablist" aria-label="Questions for Ash">
              {questionBank.map((entry, index) => (
                <button
                  key={entry.question}
                  type="button"
                  role="tab"
                  aria-selected={activeQuestion === index}
                  className={activeQuestion === index ? "is-active" : ""}
                  onClick={() => setActiveQuestion(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {entry.question}
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.article
                key={answer.question}
                className="interview-answer"
                initial={{ opacity: 0, y: 18, filter: "blur(7px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="scene-kicker">ASH ANSWERS</p>
                <h2>{answer.question}</h2>
                <p>{answer.answer}</p>
              </motion.article>
            </AnimatePresence>
          </div>
          <p className="self-interview__endnote">[ PRESS ESC OR CLOSE TO RETURN TO THE FILM ]</p>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
