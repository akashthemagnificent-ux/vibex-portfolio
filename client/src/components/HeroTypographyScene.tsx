import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ThrottledSplineCanvas = lazy(() => import("@/components/ThrottledSplineCanvas"));

const SCENE_URL = "/manus-storage/vibex-distorting-typography_3bccffc6.splinecode";

type ExtendedNavigator = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string; saveData?: boolean };
};

function canRenderSpline() {
  if (typeof window === "undefined") return false;

  const navigatorInfo = navigator as ExtendedNavigator;
  const prefersLowMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const compactViewport = window.innerWidth <= 900 || document.documentElement.clientWidth <= 900;
  const compactOrTouch = compactViewport || window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  const constrainedConnection = navigatorInfo.connection?.saveData || ["slow-2g", "2g", "3g"].includes(navigatorInfo.connection?.effectiveType ?? "");
  const limitedHardware = (navigatorInfo.deviceMemory ?? 8) < 4 || (navigatorInfo.hardwareConcurrency ?? 8) < 4;

  return !prefersLowMotion && !compactOrTouch && !constrainedConnection && !limitedHardware;
}

function LightweightFallback({ subdued, staticFrame }: { subdued: boolean; staticFrame: boolean }) {
  return (
    <div className={`hero-typography-scene__fallback ${subdued ? "is-subdued" : ""} ${staticFrame ? "is-static" : ""}`} aria-hidden="true">
      <span className="hero-typography-scene__orb" />
      <div className="hero-typography-scene__type">
        <span>VIBE</span>
        <span>X.</span>
      </div>
      <p>EDIT / PASSION</p>
    </div>
  );
}

export default function HeroTypographyScene() {
  const [useSpline, setUseSpline] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateQualityTier = () => {
      const allowed = canRenderSpline();
      setUseSpline(allowed);
      if (!allowed) setIsReady(false);
    };

    const viewportSettleTimer = window.setTimeout(updateQualityTier, 450);
    const mediaQuery = window.matchMedia("(max-width: 900px), (pointer: coarse), (prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", updateQualityTier);
    return () => {
      window.clearTimeout(viewportSettleTimer);
      mediaQuery.removeEventListener("change", updateQualityTier);
    };
  }, []);

  return (
    <div ref={sceneContainerRef} className="hero-typography-scene motion-clip motion-clip--2" aria-label="A moving 3D Vibex typography object">
      <LightweightFallback subdued={useSpline && isReady} staticFrame={!useSpline} />
      {useSpline ? (
        <Suspense fallback={null}>
          <ThrottledSplineCanvas
            className={`hero-typography-scene__spline ${isReady ? "is-ready" : ""}`}
            scene={SCENE_URL}
            onReady={() => setIsReady(true)}
            onFailure={() => {
              setIsReady(false);
              setUseSpline(false);
            }}
          />
        </Suspense>
      ) : null}
      <span className="hero-typography-scene__note" aria-hidden="true">TYPE / MOTION / 001</span>
    </div>
  );
}
