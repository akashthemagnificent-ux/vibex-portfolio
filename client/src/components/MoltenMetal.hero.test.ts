import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const componentsDir = resolve(dirname(fileURLToPath(import.meta.url)));
const home = readFileSync(resolve(componentsDir, "..", "pages", "Home.tsx"), "utf-8");
const moltenMetal = readFileSync(resolve(componentsDir, "MoltenMetal.jsx"), "utf-8");
const styles = readFileSync(resolve(componentsDir, "..", "index.css"), "utf-8");

describe("Molten Metal page background", () => {
  it("mounts the full-quality shader as a global layer behind all page content", () => {
    expect(home).toContain('import MoltenMetal from "@/components/MoltenMetal"');
    expect(home).toContain('className="proof-molten-metal"');
    expect(home.indexOf('<div className="proof-molten-metal"')).toBeLessThan(home.indexOf("<header"));
    expect(home).toContain('detail={8}');
    expect(home).toContain('mouseInteraction={true}');
    expect(home).toContain('color1="#17221d"');
    expect(home).toContain('color3="#f4d79f"');
    expect(home).toContain('glow={3.4}');
    expect(home).toContain('blackPoint={0}');
  });

  it("keeps the original interactive WebGL animation machinery intact", () => {
    expect(moltenMetal).toContain("webgl: 2");
    expect(moltenMetal).toContain("canvas.addEventListener('mousemove', handleMouseMove)");
    expect(moltenMetal).toContain("raf = requestAnimationFrame(loop)");
    expect(moltenMetal).toContain("const io = new IntersectionObserver");
  });

  it("uses a light global veil and readable local content surfaces instead of hiding the shader", () => {
    expect(styles).toContain(".proof-molten-metal");
    expect(styles).toContain("position: fixed");
    expect(styles).toContain("rgb(10 14 12 / 16%)");
    expect(styles).toContain(".proof-statement { position: relative; z-index: 1");
    expect(styles).not.toContain("rgb(20 23 20 / 88%)");
    expect(styles).toContain("pointer-events: none");
  });
});
