import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const componentsDir = resolve(dirname(fileURLToPath(import.meta.url)));
const particleText = readFileSync(resolve(componentsDir, "ParticleText.jsx"), "utf-8");
const home = readFileSync(resolve(componentsDir, "..", "pages", "Home.tsx"), "utf-8");

describe("ParticleText hero legibility", () => {
  it("keeps the original four-line hero copy at a large editorial scale", () => {
    expect(home).toContain("People know\\nthe name.\\nAlmost nobody\\nknows the person.");
    expect(home).toContain('fontSize="clamp(3.1rem, 13.5vw, 6.6rem)"');
    expect(home).toContain("lineHeight={0.86}");
  });

  it("begins legibly settled while retaining the full pointer interaction physics", () => {
    expect(home).toContain("initiallySettled={true}");
    expect(particleText).toContain("if (reducedMotion || initiallySettled)");
    expect(particleText).toContain("canvas.addEventListener('pointermove', handlePointerMove)");
    expect(particleText).toContain("pointerRepel > 0 && repelRadius > 0");
  });
});
