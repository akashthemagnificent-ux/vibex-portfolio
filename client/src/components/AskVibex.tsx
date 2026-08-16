/**
 * VIBEX conversational layer: "Ask Vibex" — an opt-in self-interview chat.
 * Cinematic terminal styling, click preset questions or type your own,
 * keyword-matched first-person answers in Ash's voice, optional Web Speech
 * narration (browser-native, no keys), and an optional ambient sound toggle.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AudioLines, Mic, Send, Volume2, VolumeX, X } from "lucide-react";
import { answers, defaultAnswer, presetQuestions, type QA } from "@/lib/ash";

function matchAnswer(input: string): QA {
  const t = input.toLowerCase();
  if (/vibex|who are you|who is|about you|introduce/.test(t)) return answers[0];
  if (/story|start|alight|began|history|origin/.test(t)) return answers[1];
  if (/nebula|llm|ai|model|chatgpt/.test(t)) return answers[2];
  if (/edit|youtube|video|anime/.test(t)) return answers[3];
  if (/become|goal|future|dream|vision/.test(t)) return answers[4];
  if (/can you do|skills|what do you|abilities|build/.test(t)) return answers[5];
  if (/where|based|location|live|country/.test(t)) return answers[6];
  return defaultAnswer;
}

const hasSpeech = typeof window !== "undefined" && "speechSynthesis" in window;

export default function AskVibex() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<QA[]>([{ q: "Who is Vibex?", answer: answers[0].answer }]);
  const [typing, setTyping] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [sound, setSound] = useState(false);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const speak = useCallback((text: string) => {
    if (!hasSpeech) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.pitch = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /male|en-US/i.test(v.name) && /en/i.test(v.lang)) ||
      voices.find((v) => /en/i.test(v.lang)) ||
      voices[0];
    if (preferred) utter.voice = preferred;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  const ask = useCallback(
    (question: string) => {
      if (typing) return;
      const answer = matchAnswer(question);
      setMessages((m) => [...m, { q: question, answer: answer.answer }]);
      setTyping(true);
      if (sound) playChime();
      setTimeout(() => {
        setTyping(false);
        if (speaking) speak(answer.answer);
      }, 700 + Math.min(answer.answer.length * 6, 1400));
    },
    [typing, sound, speaking, speak],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setInput("");
    ask(t);
  };

  return (
    <>
      <button
        className="ask-vibex-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close the conversation" : "Start a conversation with Vibex"}
      >
        <span>Ask Vibex</span>
        <AudioLines size={17} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ask-vibex-panel"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            role="dialog"
            aria-label="Conversation with Vibex"
          >
            <header>
              <div>
                <strong>Talk to the person behind the name</strong>
                <span>Ask me anything. I'll answer honestly.</span>
              </div>
              <div className="ask-actions">
                {hasSpeech && (
                  <button
                    className={speaking ? "active" : ""}
                    onClick={() => (speaking ? stopSpeaking() : speak(messages[messages.length - 1]?.answer ?? ""))}
                    aria-label={speaking ? "Stop speaking" : "Read the last answer aloud"}
                    title={speaking ? "Stop speaking" : "Read aloud"}
                  >
                    {speaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                )}
                <button
                  className={sound ? "active" : ""}
                  onClick={() => setSound((s) => !s)}
                  aria-label="Toggle interface sounds"
                  title="Interface sounds"
                >
                  <Mic size={15} />
                </button>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X size={15} />
                </button>
              </div>
            </header>

            <div className="ask-messages" ref={listRef}>
              {messages.map((m, i) => (
                <div key={i} className="ask-msg">
                  <div className="ask-q">{m.q}</div>
                  <div className="ask-a">
                    <p>{m.answer}</p>
                    {hasSpeech && !typing && (
                      <button className="speak-btn" onClick={() => speak(m.answer)} aria-label="Read answer aloud">
                        <Volume2 size={12} /> Speak
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="ask-msg">
                  <div className="ask-a typing"><i /><i /><i /></div>
                </div>
              )}
            </div>

            <div className="ask-presets">
              {presetQuestions.map((q) => (
                <button key={q} onClick={() => ask(q)} disabled={typing}>
                  {q}
                </button>
              ))}
            </div>

            <form className="ask-input" onSubmit={submit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something…"
                aria-label="Type your question"
                disabled={typing}
              />
              <button type="submit" aria-label="Send question" disabled={typing || !input.trim()}>
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    /* audio unavailable */
  }
}
