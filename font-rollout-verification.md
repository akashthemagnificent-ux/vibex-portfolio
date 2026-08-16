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
