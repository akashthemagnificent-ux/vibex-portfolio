import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";

type SplineObjectLike = {
  name: string;
  children?: SplineObjectLike[];
  visible?: boolean;
  geometry?: { name?: string } | null;
};

type SplineApplication = {
  stop: () => void;
  play: () => void;
  requestRender: () => void;
  root?: SplineObjectLike | null;
};

/**
 * Hide sphere/ball decorations from the scene so only the typography motion
 * remains. Objects are identified by spherical geometry names; the typography
 * meshes are preserved untouched.
 */
function hideSphericalDecorations(application: SplineApplication) {
  const raw = application as unknown as Record<string, unknown>;
  const sceneRoot =
    (raw.root as SplineObjectLike | undefined) ??
    (raw._scene as SplineObjectLike | undefined) ??
    ((raw._scene as unknown as { root?: SplineObjectLike })?.root);
  const seed = sceneRoot?.children ?? (raw.root !== undefined ? [] : undefined);
  if (seed === undefined) return;

  const sphericalPattern = /sphere|ball|globe|orb|parent|follow|child/i;
  const pending: SplineObjectLike[] = [...seed];
  while (pending.length > 0) {
    const candidate = pending.pop();
    if (!candidate) continue;
    const geometryName = candidate.geometry?.name ?? "";
    const geometryType = (candidate.geometry as { type?: string } | null)?.type ?? "";
    const isSphereByName = sphericalPattern.test(candidate.name);
    const isSphereGeometry = sphericalPattern.test(geometryName) || geometryType === "SphereGeometry";
    if ((isSphereByName || isSphereGeometry) && candidate.visible !== false) {
      candidate.visible = false;
    }
    if (candidate.children) {
      pending.push(...candidate.children);
    }
  }
}

type ThrottledSplineCanvasProps = {
  scene: string;
  className?: string;
  onReady: () => void;
  onFailure: () => void;
};

/**
 * Desktop-only scene host. This component is itself lazily imported, so neither
 * the Spline runtime nor the 4.1 MB scene are requested by the mobile fallback.
 * Spline's render-on-demand mode prevents idle frames; IntersectionObserver
 * pauses the decorative runtime completely once its hero leaves the viewport.
 */
export default function ThrottledSplineCanvas({ scene, className, onReady, onFailure }: ThrottledSplineCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const applicationRef = useRef<SplineApplication | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(([entry]) => {
      const application = applicationRef.current;
      if (!application) return;
      if (entry.isIntersecting) {
        application.play();
        application.requestRender();
      } else {
        application.stop();
      }
    }, { threshold: 0.12 });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={className}>
      <Spline
        scene={scene}
        renderOnDemand
        onLoad={(application) => {
          hideSphericalDecorations(application as SplineApplication);
          applicationRef.current = application as SplineApplication;
          application.requestRender();
          onReady();
        }}
        onError={onFailure}
      />
    </div>
  );
}
