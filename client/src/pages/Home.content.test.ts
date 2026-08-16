import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");

describe("Vibex introduction content", () => {
  it("preserves the supplied creative record without inventing awards or personal details", () => {
    expect(homeSource).toContain("People know the name.");
    expect(homeSource).toContain("116 released. Nearly 1,000 unfinished.");
    expect(homeSource).toContain("I don&apos;t have shiny awards or big names behind me.");
    expect(homeSource).toContain("This record intentionally leaves out my face, voice, location, and personal relationships.");
    expect(homeSource).toContain("No face, voice, location, or personal relationship information is shared here.");
  });

  it("keeps each approved public contact destination available", () => {
    expect(homeSource).toContain("https://youtube.com/@vibe.x.");
    expect(homeSource).toContain("https://github.com/akashthemagnificent-ux");
    expect(homeSource).toContain("mailto:Vibexforbusiness@gmail.com");
    expect(homeSource).toContain("https://discord.com/users/944637135477178409");
    expect(homeSource).toContain("https://tiktok.com/@tf.ash__");
    expect(homeSource).toContain("https://pin.it/292aIB7hf");
  });

  it("keeps decorative WebGL layers lazy, hardware-aware, and locally contained", () => {
    expect(homeSource).toContain('lazy(() => import("@/components/FloatingLines"))');
    expect(homeSource).toContain("shouldEnableAmbientWebGL");
    expect(homeSource).toContain("AmbientWebGLBoundary");
    expect(homeSource).toContain("deviceMemory");
    expect(homeSource).toContain("prefers-reduced-motion: reduce");
  });
});
