# Ash (Vibex) — Full disclosed content (from user messages)

## Identity
- Nickname: "Ash", artist name: "Vibex", pronouns he/him, straight, age 17, time zone IST (UTC+5:30)
- One-liner: "People know the name, Almost nobody knows the person behind it."
- Doesn't work (17). Hobbies: editing (mostly anime) — posts on YouTube channel @vibe.x. (54 edits publicly available); also builds software for fun.

## Biggest achievements
- Self-trained LLM "Nebula" (trained on publicly available data for developers), like ChatGPT, months of work, still developing
- Built his own agentic workflow
- Countless custom Discord bots for fun
- Custom Discord client made from scratch, fully functional (currently closed-source)
- Many apps, websites; contributions to open-source projects
- Editing: 6 years, 116 released edits, ~1000 unfinished projects; started 2020 at age 11 with Alight Motion after seeing an anime character edit online; failed to recreate others' work → realized to stop chasing, create his own style
- "Not because I wanted fame but because of the need inside of me to grow and become better"

## Personal story (verbatim-ish key lines)
- "Hi, I'm Ash. A normal teenager with a burning passion to create things that didn't exist before."
- 2020 (age 11): opened Alight Motion for first time after seeing random edit of favourite anime character online; kept reopening project, failed every time; realized stop chasing existing styles, create his own
- "Sometimes I completely changed directions. Sometimes I disappeared. Sometimes I thought about quitting... But every time I came back with a different way to express my vision."
- Vision: "One day you'll hear about me in a video of a big youtuber, maybe even news reports for building something exceptional, maybe in a research paper, maybe on a stage and you'll know exactly who I am."
- "Today I create everything myself (Edits, Softwares, Websites, LLMs, Bots, Visuals, Designs, 3D objects). I am still not perfect, I am still learning, still experimenting — that's the most exciting part."
- Ends with: "Nice to meet you"

## Achievements framing
- No awards; "if learning, growth and improving over time while staying consistent counts as an achievement then I've earned it back to back."

## Skills
- Editing, software development, AI engineering etc.

## Education
- Teenager actively managing academics alongside all of this.

## Personality & values
- Creative · Authentic · Loyal; values genuine connections, self-expression, individuality, building things that feel meaningful.

## Contact & links
- Email: Vibexforbusiness@gmail.com
- YouTube: https://youtube.com/@vibe.x.
- Discord: https://discord.com/users/944637135477178409
- TikTok: tiktok.com/@tf.ash__
- Pinterest: https://pin.it/292aIB7hf
- GitHub: https://github.com/akashthemagnificent-ux

## Content boundaries
- No face, no voice, no location, no personal relationships disclosed officially.

## Visual references (user-given)
1. TikTok video /home/ubuntu/upload/1000118195.mp4 — analyzed, saved to /home/ubuntu/video_1000118195_analysis_20260816_065432.md
   - Celestial Editorial aesthetic: pitch black/midnight, ethereal white glowing serif text, CRT retro segments, dotted journey path, animated counters (599 projects), slow liquid motion, calm voiceover, sub-bass, glitch cuts
2. https://lisa.locomotive.ca/en — Locomotive studio page featuring a conversational AI ("Lisa") chatbot persona; dark, minimal, elegant serif typography
3. Ash wants: chatbot that talks with visitors, sound design + animations like the video — "self interview website", no pile of text.

## Site plan
- /home/ubuntu/orbit-portfolio/vibex-plan.md — chapter structure: Hook (hero typewriter "People know the name…"), Who he is, The story (timeline), What he builds (4 works + skills), Say hi (links + boundary note)
- Content model lives in client/src/lib/ash.ts; chat panel in client/src/components/AskVibex.tsx; celestial WebGL in CelestialScene.tsx; typewriter hooks in hooks/useNarrator.ts

## Assets (uploaded/generated, use URLs as-is)
- /manus-storage/orbit-hero-monolith_2fd74721.png (16:9 hero monolith art)
- /manus-storage/orbit-project-lumen_b35926a9.png (4:5 glass project art)
- /manus-storage/orbit-project-signal_c07b913d.png (4:5 disc/ribbon project art)
- /manus-storage/orbit-symbol_15db209d.png (1:1 split-orbit brand symbol, transparent)

## Build state notes (VIBEX rebuild, Aug 16)
- Pages/components done: Home.tsx (5 chapters: Hero/Who/Story/Works/Hi), CelestialScene.tsx (WebGL), AskVibex.tsx (chat), useNarrator.ts (typewriter + inView), lib/ash.ts (content), index.css (full theme).
- TypeScript check passes. Build works.
- Fix history: (1) removed div wrapper in CelestialScene (R3F DOM error); (2) moved useReducedMotion to top of Narrator (conditional hook); (3) removed malformed `color: #a9ad a2;` CSS line; (4) useTypewriter always calls hooks, guards inside effect.
- STILL OPEN: hero headline (.vibex-hero-line) renders blank in viewport screenshot while CTA shows (doneAll=true). Motion.h1 with AnimatePresence mode=wait + key={lineIdx}. Text present in DOM per logic (CTA appears after 3 lines type) but headline space empty. Suspect: initial animation state opacity:0 stuck, or text color inherited oklch issue, or ::after overlay z-index, or text-shadow blur(0px) filter issue on h1. NEXT: check computed style in browser console via JS, try plain <h1> without motion to isolate.
- Asset URLs verified 307→redirect OK for all 4 images + favicon.
- Fonts: Cormorant Garamond + DM Mono + Space Grotesk in index.html. Title "Vibex — The Person Behind the Name".
- Ask Vibex chat panel: bottom-right fixed, triggers work; typing indicator fine.

## ROOT CAUSE FOUND (hero blank line)
Browser console check confirmed: h1 exists, opacity 1, color #f4f3ec, height 98px — but textContent = "". The cycle advances lineIdx past heroLines.length (to 3) and sets doneAll, and the final <motion.h1 key={3}> renders with line = heroLines[3] = undefined → "". So the last typed line ("Hi, I'm Ash...") is skipped by the CTA appearing too early, OR last line text is empty string in ash.ts. FIX: check lib/ash.ts heroLines array for a trailing empty string or verify lineIdx should cap at length-1 before showing CTA (i.e., wait until final line's done). Simplest robust fix: in Hero, advance only when typewriter for that line finishes (use a visible-duration logic) and don't show CTA while displaying final line; alternatively ensure last line is non-empty. The intended behavior: cycle lines 0..n-1 then stop with last line visible + CTA.

## Verification status (Aug 16, ~07:02)
Hero is now VERIFIED WORKING: typewriter cycles "People know the name." → "Almost nobody knows the person behind it." → "Hi, I'm Ash. You might know me as Vibex." and the final line persists with the CTA (confirmed via browser console: h1Text present, ctaPresent true, opacity 1). Also confirmed: counters animate (saw 53→54 on Edits card), narrators type in chapter 01/02/04, all links and sections render correctly in live browser. The earlier screenshot-tool blank hero was the freeze-at-first-frame artifact. Remaining: test Ask Vibex panel open + preset answer, then checkpoint and deliver. Dev URL: https://3000-ix0nrzgtd027voc782y2m-f6fc460c.us4.manus.computer

## Chat verification (Aug 16, 07:02)
Ask Vibex panel: opens/closes, shows header + preset questions, welcome message, and free-text input. Clicked "What is Nebula?" preset — answer types out in italic serif as designed (confirmed in screenshot). SPEAK button + sound toggle + close all present. Full end-to-end verified. All previous checks pass: hero typewriter cycle persists, counters animate (53→54), chapter narrators type, links correct. Ready to checkpoint and deliver. Next steps for user: publish via UI button; optionally add YouTube embed previews of edits.
