/**
 * Ash / Vibex — hero decoration field (currently reserved).
 * The 3D typography scene and its fallback frame have been removed by request;
 * this slot stays in the hero layout so a future custom component can be
 * dropped into the same position without layout changes.
 */
export default function HeroTypographyScene() {
  return (
    <div className="hero-typography-scene hero-typography-scene--empty motion-clip motion-clip--2" aria-hidden="true" aria-label="Reserved hero field" />
  );
}
