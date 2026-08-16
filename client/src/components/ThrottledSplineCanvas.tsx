import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";

type SplineApplication = {
  stop: () => void;
  play: () => void;
  requestRender: () => void;
};

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
          applicationRef.current = application as SplineApplication;
          application.requestRender();
          onReady();
        }}
        onError={onFailure}
      />
    </div>
  );
}
