import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");

describe("Vibex introduction content", () => {
  it("preserves the supplied creative record without inventing awards or personal details", () => {
    expect(homeSource).toContain("People know the name.");
    expect(homeSource).toContain("116 released. Nearly 1,000 unfinished.");
    expect(homeSource).toContain("I don&apos;t have shiny awards or big names behind me.");
    expect(homeSource).toContain("This record intentionally leaves out my face, voice, location, and personal relationships.");
    expect(homeSource).not.toContain("This is intentionally a partial record");
  });

  it("keeps each approved public contact destination available", () => {
    expect(homeSource).toContain("https://youtube.com/@vibe.x.");
    expect(homeSource).toContain("https://github.com/akashthemagnificent-ux");
    expect(homeSource).toContain("mailto:Vibexforbusiness@gmail.com");
    expect(homeSource).toContain("https://discord.com/users/944637135477178409");
    expect(homeSource).toContain("https://tiktok.com/@tf.ash__");
    expect(homeSource).toContain("https://pin.it/292aIB7hf");
  });

  it("keeps the Floating Lines layer always enabled and locally contained", () => {
    expect(homeSource).toContain('lazy(() => import("@/components/FloatingLines"))');
    expect(homeSource).toContain("AmbientWebGLBoundary");
    expect(homeSource).not.toContain("shouldEnableAmbientWebGL");
    expect(homeSource).not.toContain("deviceMemory");
  });

  it("keeps the hero reserved field empty of the 3D scene on all devices", () => {
    const sceneSource = readFileSync(new URL("../components/HeroTypographyScene.tsx", import.meta.url), "utf8");
    expect(sceneSource).not.toContain("splinecode");
    expect(sceneSource).not.toContain("ThrottledSplineCanvas");
    expect(sceneSource).not.toContain("hero-typography-scene__orb");
    expect(sceneSource).toContain("hero-typography-scene--empty");
  });
});
