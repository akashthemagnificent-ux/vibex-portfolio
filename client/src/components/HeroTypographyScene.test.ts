import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sceneSource = readFileSync(new URL("./HeroTypographyScene.tsx", import.meta.url), "utf8");

describe("HeroTypographyScene (reserved field)", () => {
  it("never loads the 3D scene file", () => {
    expect(sceneSource).not.toContain("splinecode");
    expect(sceneSource).not.toContain("ThrottledSplineCanvas");
    expect(sceneSource).not.toContain("lazy");
  });

  it("never renders the fallback frame (orb, lettering, or label)", () => {
    expect(sceneSource).not.toContain("hero-typography-scene__orb");
    expect(sceneSource).not.toContain("LightweightFallback");
    expect(sceneSource).not.toContain("EDIT / PASSION");
  });

  it("keeps the reserved layout slot marked as empty", () => {
    expect(sceneSource).toContain("hero-typography-scene--empty");
    expect(sceneSource).toContain("aria-label=\"Reserved hero field\"");
  });
});
