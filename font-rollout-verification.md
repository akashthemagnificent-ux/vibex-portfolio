# Four-Font Rollout — Verification Notes (16 Aug 2026)

## Hosted font URLs (webdev storage, permanent)
- Rosnoc Regular (woff2): /manus-storage/Rosnoc-Regular_62aa1d37.woff2
- Eurostile Regular (woff2): /manus-storage/Eurostile-Regular_c3a3265f.woff2
- PVC Dynasty Regular (woff2): /manus-storage/PVCDynasty-Regular_26bd78b9.woff2
- Satoshi: /manus-storage/Satoshi-Regular_23b19f81.woff2 (400), Satoshi-Medium_fcc2c867 (500), Satoshi-Bold_a6419edd (700), Satoshi-Light_bb8495c2 (300)

## Internal font metadata confirmed
- Rosnoc: family "Rosnoc", Regular, 84 glyphs (caps-oriented display)
- Eurostile: family "Eurostile OT", Regular, 234 glyphs
- PVC Dynasty: family "PVC Dynasty", Regular, 97 glyphs (limited character set)
- Satoshi: 506 glyphs per weight

## Screenshot observations (desktop 1280 & mobile 390x844)
- All four typefaces render correctly: PVC Dynasty on big editorial headlines (hero, statement, story, works, signal), Rosnoc on V I B E X wordmark (not yet visible at this zoom — verify crop), Eurostile on nav/metadata/labels, Satoshi on body.
- Headlines are tall and thin (PVC Dynasty is a sharp narrow serif) — fits the liminal editorial vibe; contrast ratio is fine (faded paper on charcoal).
- Issue 1: Hero headline "People know the name / Almost nobody knows the person" wraps to 3 lines on desktop now vs 2 before (PVC Dynasty is narrower). Acceptable, balanced text.
- Issue 2: Works card titles "Anime edits", "Custom Discord client", "Bots & workflows" render in PVC Dynasty and look distinct. Card footers use Eurostile uppercase. Good.
- Issue 3: Mobile full page looks consistent; works cards titles readable.
- No overflow, no broken layout detected at 1280px or 390px.
- Wordmark "V I B E X" in Rosnoc — verify on header crop (was small in full page shot).

## Remaining TODO before checkpoint
- [ ] Run pnpm test && pnpm check && pnpm build
- [ ] Mark todo.md font items complete
- [ ] Save checkpoint


## Signal Alignment Fix (mobile) — state after CSS changes

Requested by user (screenshot with green lines): (1) "The goal is not more edits…" headline must stay inside the left text column on mobile (was overflowing right past the marked boundary); (2) headline + "One day…" paragraph should be vertically centered between the section top and the contact grid; (3) remove the "This is intentionally a partial record…" privacy note entirely.

Changes made:
- Home.tsx: wrapped h2#signal-title + p.proof-signal__copy in a new `.signal-copy` wrapper; removed the `.privacy-note` <p>.
- index.css: added `.signal-copy` max-width `min(calc(62vw - 48px), 430px)` at base; in the existing `@media (max-width: 820px)` block added: proof-signal becomes flex column, signal-copy flex:1 with justify-content center, max-width `min(calc(62vw - 48px), 330px)`, left margin `min(6vw, 20px)`; h2 margin-top 0 and reduced clamp `clamp(3.35rem, 13vw, 5.1rem)`; copy margin-left 0; removed old mobile overrides `.proof-signal h2 { max-width: 310px; }` and the copy margin-left 8% rule (deleted via edit); removed both `.privacy-note` CSS blocks. proof-return bottom moved to 148px on mobile to clear the nav bar + return link.

Verification pending: mobile screenshot at 390px shows signal section — need to confirm h2 within column, paragraph centered between caption and contact grid, no privacy note. Full-page mobile shot at 390x844 shows headline fits in ~4 lines, left-aligned with caption, contact grid below. Then: pnpm test (12 tests incl typography register), pnpm check, pnpm build, mark todo items, checkpoint, deliver.
