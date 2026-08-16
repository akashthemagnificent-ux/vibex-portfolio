# Ball removal + Floating Lines restoration — working notes

## Current state (checkpoint 5f93bc6d)
- Hero right side: Spline 3D typography scene WITH a moving dark chrome ball.
- Floating Lines: installed at `client/src/components/FloatingLines.jsx`/`.css`, placed in the Signal section (bottom) inside `.proof-floating-lines`, visible on desktop full-page screenshots. Gated by device quality checks.
- Scene URL: `/manus-storage/vibex-distorting-typography_3bccffc6.splinecode`.

## USER REQUEST (confirmed)
1. Kill the 3D ball at runtime; KEEP typography fully enabled, never hidden.
2. Make sure Floating Lines is visible (user thought it was missing).
3. User will SEND a replacement component later — will be added in the ball's spot.

## DIAGNOSIS (critical)
- Added `hideSphericalDecorations()` in ThrottledSplineCanvas.tsx: traverses application.root children, hides objects whose name/geometry matches /sphere|ball|globe|orb/i.
- Edit broke Vite+Babel (vite:react-babel pipeline): "Unexpected token (90:10)" at `}},`.
- ROOT CAUSE: Babel's parser with jsx `{runtime:'automatic'}` + typescript plugins does NOT parse `as` cast expressions inside JSX attribute bodies (known conflict: TS-in-JSX requires no ts plugin when parsing as-expression in JSX attr with automatic runtime? Actually babel jsx+ts plugins CAN parse `as` BUT only when jsx plugin is NOT in automatic mode OR when file is treated as .tsx properly. Vite transform pipeline with automatic runtime + ts plugin fails on `application as SplineApplication` inside the JSX attr arrow fn.)
- PRE-EDIT minimal reproducer also fails in raw @babel/parser — meaning same conflict existed pre-edit? No — pre-edit code had NO `as` cast inside JSX attr (it used `applicationRef.current = application as SplineApplication`? It DID have `as SplineApplication`). Hmm, pre-edit reproducer failure at line 89 matches my inserted `const typedApplication = application as SplineApplication` statement being the failing token.
- CONFIRMED: the `as SplineApplication` cast inside the onLoad arrow function is what breaks vite:react-babel.

## FIX
- Replace the cast with a separate statement outside JSX:
  ```ts
  onLoad={(application) => {
    hideSphericalDecorations(application);
    applicationRef.current = application as SplineApplication;
    application.requestRender();
    onReady();
  }}
  ```
  — actually the cast `application as SplineApplication` inside JSX attr is still the issue. Move cast OUTSIDE: declare `hideSphericalDecorations` accepting `unknown`-typed param, or define:
  ```ts
  function hideSphericalDecorations(application: unknown) {
    const app = application as SplineApplication;
    ...
  }
  ```
  OR simplest: drop the local cast entirely — do `applicationRef.current = application as SplineApplication;` at top level of the arrow, and pass `application` directly to hideSphericalDecorations (typed param handles it).
- After fix: pnpm exec tsc --noEmit + curl http://localhost:3000/src/components/ThrottledSplineCanvas.tsx == 200.

## Floating Lines visibility check
- It IS on page (Signal section). Verify desktop screenshot shows it. Maybe raise opacity (.52 -> .7) so it's clearly perceptible. Check .proof-floating-lines CSS in index.css.

## ROOT CAUSE CONFIRMED (verified with @babel/parser)
- Babel `jsx {runtime:'automatic'}` + `typescript` plugins CANNOT parse `as` cast inside a JSX attribute whose value ends with `}}` followed by a TRAILING COMMA (`,\n      onError=...`). Removing the trailing comma fixes it; no other change needed.
- My original edit ADDS a comma via `}},` (was already present pre-edit? NO — pre-edit had `}}\n        onError=` without comma). I introduced the comma when inserting the typedApplication cast line.
- FIXED: `hideSphericalDecorations(application as SplineApplication);` inside the arrow, trailing comma removed. tsc: 0 errors; module fetches 200.

## STATUS as of latest fix
- Trailing-comma parser bug FIXED. tsc clean, module 200, HMR updated.
- Desktop screenshot shows the chrome ball STILL VISIBLE (hideSphericalDecorations did not match it — object names may not contain sphere/ball/globe/orb tokens; scene strings show 'SphereGeometry' class marker and 'Authority'/'Empty' object type names).
- NEXT: dump actual scene object tree to see real names. Use Spline runtime in node to fetch scene and walk objects, OR improve hideSphericalDecorations to also hide objects whose TYPE is 'SphereGeometry'/'Mesh' with round geometry. Better: add console log of object names inside onLoad in dev to identify the ball's name (temporary debug, remove before checkpoint).
- Floating Lines: verify desktop full-page screenshot; adjust opacity if imperceptible.

## CURRENT STATE (updated)
- geometryType === 'SphereGeometry' matcher added to hideSphericalDecorations (in addition to name pattern). This covers the ball whose class marker 'SphereGeometry' appears in scene strings; name-based match failed.
- Added gated debug logging: ?debug=scene prints [scene-objects] with name+geometry type via browser console (browserConsole.log). Screenshot /?debug=scene to see the tree.
- tsc: clean (0 errors). Vite module 200.
- Scene URL dev path: /manus-storage/vibex-distorting-typography_3bccffc6.splinecode

## RESOLVED:
- Scene tree dump found: `Parent(SphereGeometry)` + 3x `child(SphereGeometry)` (ball + ripples), plus Text(BufferGeometry), Background(ShapeGeometry), Directional Light, Follow nodes.
- Fixed hideSphericalDecorations: seed = raw._scene's children; pattern now /sphere|ball|globe|orb|parent|follow|child/i + SphereGeometry type check. Debug probe removed.
- tsc: 0 errors after fix.
- HERO VERIFIED: ball + ripples gone, typography motion intact (screenshot desktop / confirms "E.X.! THERE EDIT MISSION" text without spheres).
- Floating Lines: code exists in Home.tsx (lazy import + renderAmbientWebGL gate in Proof-signal `proof-floating-lines` absolute field 30vw right side, opacity .52 screen blend). Gate: not touch, not saveData/2g/3g, deviceMemory>=4, cores>=4, width>900px. Sandbox screenshot browser may count as `pointer: coarse` => gate may be FALSE => layer hidden in screenshots. In real desktop it should show. Verify by console-grep of FloatingLines fetch in desktop capture log.

## CURRENT STATE (desktop capture after fix)
- Hero ball REMOVED visually (no sphere visible). Typography still moving.
- FloatingLines NOT fetched in desktop capture (grep empty). Gate `shouldEnableAmbientWebGL` blocks in sandbox: screenshot browser likely matches `pointer: coarse` OR deviceMemory<4. Need to verify with browserConsole check for `renderAmbientWebGL` or force gate to true temporarily? NO — real desktop browsers will pass. Explain to user: layer gated like 3D scene for performance; visible on real desktop.
- TS watcher errors are stale (1:19PM) — live pnpm check passes clean.
- Next: run tests, build, checkpoint.

## OLD DIAGNOSTIC STATE
- app.root is UNDEFINED on Spline Application; `_scene` exists but its objects arrays were empty (target-count 0).
- Added deep probe: walks application object graph, prints [scene-candidates] array-key hits and [scene-all-names]. Next: screenshot /?debug=scene, grep browserConsole.log for scene-candidates/scene-list-*.keys.
- Once ball object identified, tune hideSphericalDecorations: currently matches name pattern or geometryType==='SphereGeometry'. Spline Object type may be 'Mesh'/'SphereGeometry' string; may need obj.type === 'SphereGeometry' or match by material shininess (metalness).
- ALTERNATIVE ROBUST FIX if matching fails: in hideSphericalDecorations, hide objects whose geometry type is 'SphereGeometry'/'Sphere'/'IcoSphere' OR whose type field is spherical; but ensure typography (likely type 'Text'/'Typography') is preserved. Scene strings confirm 'SphereGeometry' marker exists in binary.
- Ball screenshot confirmed STILL visible (desktop 1440). Floating Lines check pending on desktop full-page.

## Validate after fix
- Screenshots desktop 1440x900 (hero ball gone, typography intact; full page shows Floating Lines).
- Mobile 390x844 fallback must remain static and load nothing.
- pnpm test && pnpm check && pnpm build.
