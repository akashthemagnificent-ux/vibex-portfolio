/**
 * VIBEX — Ash's personal content model.
 * Everything Ash disclosed lives here: chapters, narrator lines, stats, works, links.
 * Boundaries: no face, no voice, no location, no relationships.
 */

export const links = {
  email: "Vibexforbusiness@gmail.com",
  youtube: "https://youtube.com/@vibe.x.",
  discord: "https://discord.com/users/944637135477178409",
  tiktok: "https://tiktok.com/@tf.ash__",
  pinterest: "https://pin.it/292aIB7hf",
  github: "https://github.com/akashthemagnificent-ux",
} as const;

export const heroLines = [
  "People know the name.",
  "Almost nobody knows the person behind it.",
  "Hi, I'm Ash. You might know me as Vibex.",
];

export const chapters = [
  {
    id: "who",
    index: "01",
    title: "Who he is",
    narrator: "He's 17. He doesn't have a job — he has obsessions. Edits, software, AI. Time zone: IST, UTC+5:30. Pronouns: he/him. He builds things that didn't exist before, because something inside him won't let him not.",
    stats: [
      { value: 17, suffix: "", label: "years old" },
      { value: 3, suffix: "", label: "creative fields" },
      { value: 24, suffix: "/7", label: "curiosity" },
    ],
    traits: ["Creative", "Authentic", "Loyal"],
  },
  {
    id: "story",
    index: "02",
    title: "How it started",
    narrator: "Every story starts somewhere. This is his.",
    timeline: [
      {
        year: "2020",
        title: "The spark",
        body: "At 11, Ash opened Alight Motion for the first time after seeing an edit of his favourite anime character online. He kept reopening the project, trying to recreate what he saw — and failing, every single time.",
      },
      {
        year: "The turn",
        title: "Stop chasing. Start creating.",
        body: "He realised chasing other editors' styles was a trap. The way forward was a style that only he could make.",
      },
      {
        year: "6 years",
        title: "116 released edits. ~1000 unfinished projects.",
        body: "Some edits changed direction. Some he disappeared for months. Some he thought about quitting. Every time he came back, he expressed his vision differently — not for fame, but because of the need inside him to grow.",
      },
      {
        year: "Now",
        title: "He creates everything himself.",
        body: "Edits, software, websites, LLMs, bots, visuals, designs, 3D. Still not perfect. Still learning. Still experimenting — and that's the most exciting part.",
      },
      {
        year: "Where he's going",
        title: "The vision",
        body: "The goal was never more edits. It's to build something that keeps evolving. One day you'll hear about him in a big YouTuber's video. Maybe in the news. Maybe in a research paper. Maybe on a stage. And you'll know exactly who he is.",
      },
    ],
    quote: "Nice to meet you.",
  },
  {
    id: "works",
    index: "03",
    title: "What he builds",
    narrator: "The evidence, in no particular order. Everything below was made by his own hands.",
    works: [
      {
        name: "Edits",
        type: "Signature anime edits · 2020 → now",
        stat: "54 public edits",
        body: "His calling card. Mixed styles, constant experimentation, a signature that grew from 116 released edits and almost a thousand unfinished ones. Every edit is a small experiment in becoming.",
        link: links.youtube,
        linkLabel: "Watch on YouTube",
      },
      {
        name: "Nebula",
        type: "Custom LLM · in development",
        stat: "Months of training",
        body: "A language model he built and trained himself on publicly available developer data — a self-trained assistant in the spirit of ChatGPT, built by hand. Still evolving, and still his.",
        link: links.github,
        linkLabel: "Find the traces on GitHub",
      },
      {
        name: "Custom Discord client",
        type: "Software · closed source",
        stat: "Fully functional",
        body: "A Discord client built entirely from scratch. Not a theme, not a mod — the whole thing, working end to end.",
        link: undefined,
        linkLabel: undefined,
      },
      {
        name: "Bots & open source",
        type: "Development · for fun",
        stat: "Countless",
        body: "Discord bots of every kind, countless websites and applications, and contributions to open-source projects that matter to him.",
        link: links.github,
        linkLabel: "Explore on GitHub",
      },
    ],
    skills: ["Editing", "Software development", "AI engineering", "Web development", "3D & visuals"],
  },
  {
    id: "hi",
    index: "04",
    title: "Say hi",
    narrator: "That's the person behind Vibex. Nice to meet you — now go say it back.",
  },
];

/** Answers for the "Ask Vibex" conversational layer (first-person, in Ash's voice). */
export type QA = {
  q: string;
  answer: string;
};

export const presetQuestions = [
  "Who is Vibex?",
  "What's your story?",
  "What is Nebula?",
  "Show me your edits",
  "What do you want to become?",
] as const;

export const answers: QA[] = [
  {
    q: "Who is Vibex?",
    answer:
      "Vibex is my artist name. The real me is Ash — 17, he/him, living on IST time. I'm not a company and I'm not looking for work; I'm a teenager with an unreasonable need to create things that don't exist yet — edits, software, AI, all of it. People know the name. This site is me showing the person behind it.",
  },
  {
    q: "What's your story?",
    answer:
      "In 2020, at 11, I opened Alight Motion after seeing an edit of my favourite anime character online. I failed to recreate it every time — and that failure taught me the most important lesson of my life: stop chasing other people's style, and build your own. Six years later that became 116 released edits, roughly a thousand unfinished projects, and a whole set of skills I built entirely by myself.",
  },
  {
    q: "What is Nebula?",
    answer:
      "Nebula is a language model I built and trained myself on publicly available developer data — my own take on something like ChatGPT, made from scratch. It's been months of work and it's still evolving. I think it's the closest thing I've made to proof that I can take an idea from nothing to something that thinks.",
  },
  {
    q: "Show me your edits",
    answer:
      "They're all on my YouTube channel @vibe.x — 54 edits and counting. Each one is an experiment; I mix styles on purpose so every edit has a piece of signature in it. Open them and tell me what you feel. That's the whole point.",
  },
  {
    q: "What do you want to become?",
    answer:
      "The goal was never to make more edits or recreate what already exists. The goal is to build something that keeps evolving. One day you'll hear about me in a big YouTuber's video — maybe in the news, maybe in a research paper, maybe on a stage. And you'll know exactly who I am. I'm still learning, still experimenting, and honestly? That's the most exciting part.",
  },
  {
    q: "What can you do?",
    answer:
      "I create everything myself: edits, software, websites, LLMs, bots, visuals, designs, 3D objects. Not because I'm hired to, but because I want to. I value genuine connections, self-expression, individuality, and building things that feel meaningful.",
  },
  {
    q: "Where are you based?",
    answer:
      "IST — UTC+5:30. Beyond the time zone, some things stay private. My face, my voice, and my exact location aren't on the internet, and that's a choice I'm comfortable with. This page is everything I chose to share.",
  },
];

export const defaultAnswer: QA = {
  q: "…",
  answer:
    "Fair question — but that's one I'll keep for myself for now. Some things stay private: my face, my voice, my location. Try one of the questions above; the rest of me is an open book.",
};
