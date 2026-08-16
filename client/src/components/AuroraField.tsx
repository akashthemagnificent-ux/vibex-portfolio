/**
 * VIBEX / Visual direction: midnight-blue void, shutter-light trails, soft bokeh and a dotted story path.
 * This canvas is environmental atmosphere, never a dashboard-like 3D object.
 */
import { useEffect, useRef } from "react";

type AuroraFieldProps = { className?: string; intensity?: "low" | "high" };

export default function AuroraField({ className = "", intensity = "high" }: AuroraFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animation = 0;
    let pointer = { x: 0.5, y: 0.46 };
    const dots = Array.from({ length: 82 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.25,
      drift: (Math.random() - 0.5) * 0.00018,
      phase: Math.random() * Math.PI * 2,
      index,
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight };
    };
    const draw = () => {
      frame += 1;
      const time = frame * 0.008;
      context.clearRect(0, 0, width, height);
      const background = context.createRadialGradient(
        width * (0.52 + (pointer.x - 0.5) * 0.06),
        height * (0.42 + (pointer.y - 0.5) * 0.06),
        0,
        width * 0.5,
        height * 0.43,
        Math.max(width, height) * 0.8,
      );
      background.addColorStop(0, intensity === "high" ? "rgba(22, 54, 136, .24)" : "rgba(12, 32, 82, .15)");
      background.addColorStop(0.43, "rgba(5, 12, 40, .08)");
      background.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const orbX = width * (0.63 + (pointer.x - 0.5) * 0.045);
      const orbY = height * (0.35 + Math.sin(time * 0.45) * 0.028);
      const orb = context.createRadialGradient(orbX, orbY, 0, orbX, orbY, Math.min(width, height) * 0.28);
      orb.addColorStop(0, "rgba(208, 222, 255, .34)");
      orb.addColorStop(0.22, "rgba(122, 150, 255, .18)");
      orb.addColorStop(0.62, "rgba(53, 84, 211, .045)");
      orb.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = orb;
      context.beginPath();
      context.arc(orbX, orbY, Math.min(width, height) * 0.28, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.translate(width * 0.5, height * 0.44);
      context.rotate(time * 0.095);
      context.globalCompositeOperation = "screen";
      for (let i = 0; i < 3; i += 1) {
        context.strokeStyle = `rgba(${i === 0 ? "143, 171, 255" : "207, 220, 255"}, ${0.08 - i * 0.015})`;
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(0, 0, width * (0.26 + i * 0.09), height * (0.09 + i * 0.035), i * 1.15, 0, Math.PI * 1.78);
        context.stroke();
      }
      context.restore();
      context.globalCompositeOperation = "source-over";

      context.setLineDash([2, 10]);
      context.strokeStyle = "rgba(223, 231, 255, .35)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(width * 0.08, height * 0.75);
      context.bezierCurveTo(width * 0.28, height * 0.59, width * 0.66, height * 0.78, width * 0.92, height * 0.28);
      context.stroke();
      context.setLineDash([]);

      dots.forEach((dot) => {
        const alpha = 0.16 + (Math.sin(time + dot.phase) + 1) * 0.12;
        context.fillStyle = `rgba(225, 236, 255, ${alpha})`;
        context.beginPath();
        context.arc((dot.x + time * dot.drift) * width, (dot.y + Math.sin(time * 0.25 + dot.index) * 0.002) * height, dot.r, 0, Math.PI * 2);
        context.fill();
      });
      animation = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(animation);
    };
  }, [intensity]);

  return <canvas aria-hidden="true" ref={canvasRef} className={`aurora-field ${className}`} />;
}
