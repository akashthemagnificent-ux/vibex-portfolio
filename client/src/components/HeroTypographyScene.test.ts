import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sceneSource = readFileSync(new URL("./HeroTypographyScene.tsx", import.meta.url), "utf8");

describe("HeroTypographyScene", () => {
  it("loads the supplied scene only on capable, non-reduced-motion devices", () => {
    expect(sceneSource).toContain("vibex-distorting-typography_3bccffc6.splinecode");
    expect(sceneSource).toContain("(max-width: 900px), (pointer: coarse)");
    expect(sceneSource).toContain("window.innerWidth <= 900");
    expect(sceneSource).toContain("viewportSettleTimer");
    expect(sceneSource).toContain("prefers-reduced-motion: reduce");
    expect(sceneSource).toContain("deviceMemory");
    expect(sceneSource).toContain("hardwareConcurrency");
    expect(sceneSource).toContain("saveData");
    expect(sceneSource).toContain("ThrottledSplineCanvas");
  });

  it("keeps a lightweight typography-and-orb fallback while the WebGL scene is unavailable", () => {
    expect(sceneSource).toContain("LightweightFallback");
    expect(sceneSource).toContain("hero-typography-scene__orb");
    expect(sceneSource).toContain("staticFrame={!useSpline}");
  });
});
