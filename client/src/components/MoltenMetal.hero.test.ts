import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const componentsDir = resolve(dirname(fileURLToPath(import.meta.url)));
const home = readFileSync(resolve(componentsDir, "..", "pages", "Home.tsx"), "utf-8");
const moltenMetal = readFileSync(resolve(componentsDir, "MoltenMetal.jsx"), "utf-8");
const styles = readFileSync(resolve(componentsDir, "..", "index.css"), "utf-8");

describe("Molten Metal hero background", () => {
  it("mounts the full-quality shader behind the first-page hero", () => {
    expect(home).toContain('import MoltenMetal from "@/components/MoltenMetal"');
    expect(home).toContain('className="proof-molten-metal"');
    expect(home).toContain('detail={8}');
    expect(home).toContain('mouseInteraction={true}');
    expect(home).toContain('color1="#1c211c"');
    expect(home).toContain('color3="#d8c19a"');
  });

  it("keeps the original interactive WebGL animation machinery intact", () => {
    expect(moltenMetal).toContain("webgl: 2");
    expect(moltenMetal).toContain("canvas.addEventListener('mousemove', handleMouseMove)");
    expect(moltenMetal).toContain("raf = requestAnimationFrame(loop)");
    expect(moltenMetal).toContain("const io = new IntersectionObserver");
  });

  it("uses a dedicated exposure veil so hero copy stays visually distinct", () => {
    expect(styles).toContain(".proof-molten-metal");
    expect(styles).toContain("rgb(20 23 20 / 88%)");
    expect(styles).toContain("pointer-events: none");
  });
});
