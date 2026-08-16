# VIBEX — Personal Self-Introduction Site Plan

## The Big Idea

> "People know the name. Almost nobody knows the person behind it."

This single line becomes the entire concept: the site is an **invitation to meet the person behind Vibex**. Instead of static sections with walls of text, the site behaves like a **guided self-interview**. A calm, confident AI narrator ("the guide") asks the visitor questions or walks them through chapters of Ash's story, typing each line on screen with cinematic pacing — inspired by the reference video's quiet-power vibe and lisa.locomotive.ca's conversational persona.

## Reference DNA

From the TikTok video analysis:
- **Mood:** introspective, mysterious, quiet power, "digital diary" of a creator
- **Palette:** pitch black / deep midnight, ethereal white text with soft glow/bloom, one electric accent (we keep Orbit Acid chartreuse #D7FF36 for brand continuity — it contrasts beautifully against black)
- **Typography:** elegant italic serif for narrative lines (Cormorant Garamond) + clean sans for technical data
- **Motion:** liquid floating physics, breathing text, dotted path lines connecting scenes, slow ease everything
- **Sound:** ambient sub-bass + soft whooshes; we add a **toggle-able soft ambient pad + typing whoosh + soft chime** for the conversational scenes (all opt-in, muted by default)
- **Data proof:** counters ("116 released edits", "6 years", "~1000 unfinished projects") animated like digital counters in the video

## The Experience — Scene/Chapter System

The site is one continuous scrolling journey divided into **5 chapters**, each a "scene" in the interview. A narrator line types on at the start of each chapter; ambient visuals + data counters carry the emotion.

### Chapter 0 — THE HOOK (hero)
- Full-screen dark scene with drifting glowing orb/stars (WebGL, celestial like the video)
- Types out, letter by letter: *"People know the name. Almost nobody knows the person behind it."*
- Then: *"Hi, I'm Ash. You might know me as Vibex."*
- A single entry button: "Meet him →" (scrolls to chapter 1)

### Chapter 1 — WHO HE IS
- Narrator types the intro: "I'm 17. IST time zone (UTC+5:30). he/him. I don't work a job — I build things."
- Three quick stats with animated counters: 17 / 3 fields / ∞ ambition
- Personality chips: Creative · Authentic · Loyal

### Chapter 2 — THE STORY (origin story, the emotional core)
- Timeline / dotted-path design like the video's journey line
- 2020: opens Alight Motion at 11, inspired by an anime edit → fails to recreate others' work → realizes he must create his own style
- "6 years. 116 released edits. ~1000 unfinished projects."
- Quote: "Not because I wanted fame — because of the need inside me to become better every time."
- The vision: "One day you'll hear about me in a big YouTuber's video. Maybe in the news. Maybe in a research paper. Maybe on a stage."
- Values: genuine connections · self-expression · individuality · meaningful builds

### Chapter 3 — WHAT HE BUILDS (works)
- 4 build cards (the "evidence"):
  1. **Edits** — 54 edits on YouTube (@vibe.x.), his signature anime-editing style
  2. **Nebula LLM** — custom self-trained language model, trained on public developer data, months of work, still evolving
  3. **Discord client** — fully functional custom client built from scratch (closed-source)
  4. **Bots & open source** — countless Discord bots for fun + open-source contributions
- Each card has a hover glow and links out where appropriate (YouTube card → youtube.com/@vibe.x.)
- Skills row: Editing · Software development · AI engineering · Websites · 3D

### Chapter 4 — SAY HI (contact)
- Narrator: "That's the person behind Vibex. Nice to meet you."
- All links: Email (Vibexforbusiness@gmail.com), YouTube, Discord, TikTok, Pinterest, GitHub
- Boundary note (subtle): "Face, voice, location — some things stay private. This page is everything I chose to share."

## Conversational Layer (the chatbot)

- A floating **"Ask Vibex"** button (bottom-right). Opens a **guided interview chat** panel styled like a cinematic terminal.
- Ash chose the name "Vibex" as the artist identity; the chat persona speaks in first person as **Ash/Vibex** — "I". It answers pre-authored questions in a warm, humble, ambitious voice (matches his story).
- Flow options (preset questions the visitor can click + free typing against a keyword-matched answer library):
  - "Who is Vibex?" → the intro
  - "What's your story?" → the Alight Motion origin
  - "What is Nebula?" → the LLM
  - "Show me your edits" → YouTube
  - "What do you want to become?" → the vision quote
- **Text-to-speech:** use the browser-native Web Speech API (no API keys, works offline) with a calm voice — optional "Speak" toggle per answer. This replicates the video's voiced narration with zero cost and zero backend.
- Sound toggle (ambient pad + UI whooshes) on by default: OFF — visitor opts in.
- Fallback: graceful if Web Speech isn't available (chat still works, speech button hidden).

## Visual System (updates to existing design)
- Keep: inky black shell, Orbit Acid chartreuse #D7FF36 signal color, DM Mono labels, Space Grotesk display
- Add: Cormorant Garamond italics for narrator dialogue (like the video's elegant serif narration) — this is the one editorial accent, used intentionally for the voice
- WebGL: celestial scene — drifting nebula particles, glowing core, dotted orbit path (journey motif), cursor-reactive parallax
- Kinetic typography: text types in (typewriter with caret), words breathe, counters roll
- Data counters: 116, 54, 1000+, 6, 17 — animated number roll-ups
- Boundaries respected: no face, no voice recording, no location — avatar = abstract glowing orb/monolith (already generated, reuse and adapt), voice = TTS synthesis only

## Content Boundaries
- Never reference face, voice, real location, relationships
- Age (17) and he/him mentioned in who-he-is chapter (Ash disclosed them willingly)
- "Based in IST (UTC+5:30)" — keep timezone as data, not location
