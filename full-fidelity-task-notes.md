# Full-Fidelity Animation Task (Checkpoint bfe44871 baseline)

## User requirements (verbatim intent)
1. Add React Bits ParticleText (`@react-bits/ParticleText-JS-CSS`) to the hero headline "People know the name. Almost nobody knows the person."
2. DO NOT optimize, degrade, throttle, or simplify the component. Preserve ALL effects: hover, touch, particle fidelity, interactions. Keep enabled on MOBILE (no device gating).
3. Only palette matching allowed (theme: #141714 bg, #e7e2d7 foreground, #d8c19a gold, #9bae9f green, #f2ebdd mystery).
4. User complained the previous Story flight component was degraded. Must rebuild at FULL fidelity of the original concept (from /home/ubuntu/upload/pasted_content.txt: speed-flight scene with loader craft, shaking speeder animation, fazer wind lines, longfazers, moving clouds).
5. Flight component rebuild also allowed theme matching + enhancement, NOT quality reduction.

## Current state
- Hero headline is a PVC Dynasty h2 (`.proof-index h1`? verify selector) in client/src/pages/Home.tsx hero section.
- StoryFlight.tsx is currently a tiny static CSS artifact (streaks + craft + caption "Iteration / 06") — degraded vs original concept.
- Original concept CSS at /home/ubuntu/upload/pasted_content.txt: .loader (speeder 0.4s shake), .base span (triangle body), .face (cockpit), .loader>span (trailing streaks, red #f51313 -> theme to #d8c19a oxidized gold?), span>span = fazer1-4 white wind lines, .longfazers lf1-4, .clouds cloud1-5 white 0.25 opacity moving right-to-left.
- Dev URL: https://3000-ix0nrzgtd027voc782y2m-f6fc460c.us4.manus.computer

## Implementation plan
1. npx shadcn@latest add @react-bits/ParticleText-JS-CSS (in /home/ubuntu/orbit-portfolio). Install any peer deps.
2. Mount ParticleText inside hero headline, preserving original component props/behavior; recolor particle colors only to theme. No gating.
3. Rebuild StoryFlight as faithful full concept: craft (CSS shapes: triangle base + circular engine + cockpit face), speeder shake keyframes, fazer wind streaks, longfazers, drifting clouds. Recolor: body #f3cfcf -> #e7e2d7 (paper), accent #f51313 -> #d8c19a (gold), clouds/white -> rgba(#e7e2d7, .25), trail sparks white-ish warm.
4. Keep component in the same Story slot after .story-closing p.
5. Preserve existing regression tests (update guards as needed), add guard that ParticleText mounts on the hero h1 and flight contains all original classes (.loader, .base, .face, .longfazers, .clouds, speeder/fazer keyframes).
6. Verify visually at 1280x720 and 390x844 (ParticleText canvas needs adequate size on mobile — original canvas is fixed ~1100x300; scale container with CSS or use component's responsive handling WITHOUT downgrading; original demo is a fixed canvas, so wrap in a responsive container preserving particle density).
7. Tests + pnpm check + build, checkpoint, deliver.

## Palette tokens (index.css root vars)
- --bg: #141714, --fg: #e7e2d7, --primary: #d8c19a, --interactive: #9bae9f, --mystery: #f2ebdd

## Progress log (updated)
- [x] npx shadcn add @react-bits/ParticleText-JS-CSS → client/src/components/ParticleText.jsx + ParticleText.css
- [x] Mounted ParticleText on hero h1#proof-title in Home.tsx: removed motion-clip span wrappers, added proof-title--particles class + aria-label, kept full-fidelity props (particleSize 2, density 4, scatter 180, gatherDuration 1600, stagger 420, pointerRepel 40, repelRadius 120, idleDrift 0.7, trigger mount, glow true). color #e7e2d7, highlightColor #d8c19a, fontSize clamp(2.9rem,7.2vw,6.6rem), fontWeight 500, fontFamily 'PVC Dynasty','Eurostile',sans-serif.
- [x] ParticleText.d.ts created with @/components/ParticleText module declaration; pnpm exec tsc --noEmit clean.
- [ ] Add CSS for .proof-title--particles (fixed/min height so canvas has space, remove PVC Dynasty font on h1 since particles render own text; keep aria-label for accessibility; sr-only fallback text)
- [ ] Rebuild StoryFlight.tsx at FULL fidelity of original concept (speeder 0.4s shake, triangle .base span with ::before engine circle + ::after fin, .face cockpit w/ red (theme: gold) dot, 4 fazer wind lines, 4 .longfazers, 5 moving clouds). Recolor: body #f3cfcf→var(--ink-soft) or #e7e2d7-ish, accent #f51313→#d8c19a, white elements → rgba(#e7e2d7,.45), clouds rgba(#e7e2d7,.15). KEEP ALL original keyframes/durations unchanged (speeder .4s, fazer .2/.4/.4/1s, lf .6/.8/.6/.5s, clouds 2/3/4/3/2s translateX(-2000px)).
- [ ] Update Home.content.test.ts / typography tests if they assert motion-clip inside proof-title or old StoryFlight classes.
- [ ] Screenshots 1280x720 + 390x844 to verify ParticleText renders (needs container height!) and flight artifact full fidelity.
- [ ] pnpm test && pnpm check && pnpm build, checkpoint, deliver.

## CSS note
Current .proof-title uses PVC Dynasty clamp ~4.6-7rem w/ tight leading. ParticleText needs .proof-title--particles { position relative; height ~ clamp(14rem, 34vw, 26rem); width 100% } and ParticleText container must be h-full. Keep h1 semantics via aria-label; original h1 text replaced by canvas — ensure sr text exists.
## Story slot CSS class
Current flight artifact uses class "story-flight" in .proof-method__frame. Original concept classes to keep verbatim in markup: .loader > span (trails w/ child fazer spans), .base span, .face, .longfazers span(4), .clouds .cloud1-5.
## Flight slot sizing
Original .loader assumes 100px width scene (~margin-left -50px). Story slot is a wide band (.proof-method__frame); wrap scene in container with fixed height (~180px desktop, ~120px mobile) and position absolute loader centered.
## Palette mapping for flight
- #f3cfcf (pink body) → var(--ink) with slight softness #e7e2d7
- #f51313 (red accents) → var(--cobalt-dark) #d8c19a (oxidized gold) — or keep subtle red? User said theme matching OK; use gold.
- #ffffff (fazer/longfazer/clouds) → rgba(242,235,221,.55) / .35 / .14

## State update (latest)

DONE (all):
- ParticleText mounted hero h1#proof-title (Home.tsx line 153), full-fidelity props, no gating.
- CSS .proof-title--particles: desktop height clamp(13.5rem,27vw,21rem) mt34; mobile(820px) height clamp(15rem,42vw,24rem); .particle-text absolute inset 0; .particle-text__sr hidden; .proof-title--sr hidden added.
- StoryFlight.tsx FULL fidelity rebuild (loader span, base span w/ ::before engine ::after fin, face w/ ::after gold dot, fazer1-4, longfazers lf1-4 .6/.8/.6/.5s, clouds1-5 2/3/4/3/2s). Recolored: body var(--ink-soft), face::after var(--cobalt-dark), clouds rgba(232 226 208 / 20%) @.25 opacity, fazer rgba(232 226 208 / 82%), longfazers rgba(232 226 208 / 34%).
- CSS keyframes storyLf/Lf2/Lf3/Lf4, storyMoveClouds, storyFazer1-4, storySpeeder (.4s shake). Reduced-motion kills .loader, .longfazers, .cloud. Orphan storyStreak/storyCraft keyframes removed.
- Type check clean. Desktop screenshot 1 OK (particles formed). Screenshot 2 (/#story) had ghost static text → FIXED by .proof-title--sr hidden rule.

REMAINING:
1. Re-screenshot / to verify ghost text gone.
2. Mobile screenshot verify ParticleText + full-fidelity flight.
3. Review/update StoryFlight.test.ts to new structure BEFORE pnpm test.
4. pnpm test && pnpm check && pnpm build.
5. Checkpoint + deliver.

## Diagnosis (flight scene invisible in screenshots)
- Craft geometry CSS matches original exactly (loader/base/face all verbatim except palette).
- Likely causes: (1) reduced-motion media query kills .loader/.longfazers/.cloud animations → screenshot tool may force reduced motion → craft invisible; must show craft statically when animation disabled. Fix: remove animation:none for .loader (or keep static craft by giving .loader a static transform); best: change media query to only hide .longfazers/.cloud and slow .loader, so craft remains visible.
- (2) Craft is tiny/paper-ish: base span border-right: 100px solid var(--ink-soft) = near-white-on-dark? var(--ink-soft) is soft dark ink, may contrast poorly against dark bg → that's intentional theme but craft appears faint in screenshot. Original used #f3cfcf (light pink on... actually original bg was pink). Verify var(--ink-soft) value: check root vars.
- Clouds start left:1100-2000px but scene width ~480px, animation starts translateX(0) → clouds initially OUTSIDE scene → invisible until animation begins (screenshot catches moment 0). Add negative animation-delays so clouds mid-flight.
- Hero ParticleText on mobile looks thin/single-line and small — acceptable but could bump. Desktop render fine.
- Next: fix visibility (cloud delays, reduced-motion static craft), verify screenshot, then tests/check/build.

## State after visibility fixes (Aug 17)
Cloud negative delays added, craft recolored to --mystery (#f2ebdd near-white, good contrast), reduced-motion keeps static craft. ParticleText mounted in Home.tsx hero h1 (proof-title--particles) with text "People know the name. Almost nobody knows the person.", color #e7e2d7, highlight #d8c19a, glow true, fontSize clamp(2.9rem,7.2vw,6.6rem), font PVC Dynasty. Container height clamp(13.5rem,27vw,21rem) desktop, mobile height clamp(15rem,42vw,24rem), font clamp(3.5rem,14vw,5.6rem) on mobile.
Screenshots show ParticleText canvas rendering dots (desktop + mobile OK). Hero foot still shows "Begin the record" link (correct - that's the CTA, not headline).
Flight artifact still NOT visible in Story screenshots — need further diagnosis: possibly screenshot captured before hash scroll (showed hero). Desktop /#story screenshot showed hero area duplicated? Actually two scenes captured (screenshot tool captured page twice stacked). NEXT: capture full-page screenshot to see story section, verify flight DOM via console element check, then run pnpm test && pnpm check && pnpm build. Remaining: add regression tests for ParticleText mount + flight visibility, checkpoint, deliver.
Flight regression test file exists: client/src/components/StoryFlight.test.ts (check it doesn't assert hidden visibility incorrectly).

## Flight artifact visibility CONFIRMED (desktop full page crop)
The rebuilt flight component now renders clearly: near-white craft with fazers/trails, streak lines, caption "ITERATION / 05 ... UNKNOWN FIELD". Craft recolored to --mystery; clouds staggered with negative delays so scene isn't empty on first paint. Desktop verified. Still to verify: mobile viewport crop, then run tests/check/build, update regression guards if needed, checkpoint, deliver.

## Mobile flight artifact VERIFIED
Mobile 390px full-page crop shows the rebuilt flight scene clearly under the achievement statement: the near-white craft with fazers/trails is visible, streak lines render on the left, and the "ITERATION / 05 ... UNKNOWN FIELD" caption strip sits at the bottom of the artifact. Both desktop and mobile confirmations complete. Next: run pnpm test && pnpm check && pnpm build, verify regression guards (StoryFlight.test.ts + typography tests), then checkpoint and deliver.

## Final state before checkpoint (full-fidelity upgrade)
- Flight artifact: desktop + mobile crops verified visible. CSS keyframes confirmed present: storyLf(1-4), storyMoveClouds, storyFazer(1-4), storySpeeder, storyLf uses `left`/`opacity` (accepted transform+opacity family per original design); reduced motion sets `.longfazers span, .cloud` animation none and `.loader` none.
- StoryFlight.test.ts rewritten to match rebuilt structure (story-flight, loader, longfazers, clouds, caption classes; keyframe assertions storyFazer/storyMoveClouds/storyLf/storySpeeder; reduced-motion assertions).
- ParticleText on hero headline, all effects preserved (install at full fidelity via shadcn, no throttling), recolored only; ghost static text hidden with proof-title--sr rule; container given fixed height (desktop + mobile) so canvas samples text.
- Next: run pnpm test && pnpm check && pnpm build (check/build passed previously; only test assertions needed update), then webdev_save_checkpoint, deliver.
- Note: CSS class selector in test uses ".longfazers span {" — confirmed present at index.css line 118.
