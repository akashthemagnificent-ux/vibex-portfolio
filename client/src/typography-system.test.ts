/** Protects the four-font typography register: every explicit font-family
 * declaration in the design system must name one of the licensed typefaces
 * (Rosnoc, Eurostile, PVC Dynasty, Satoshi) with an allowed stack. */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const srcDir = resolve(dirname(fileURLToPath(import.meta.url)));
const stylePath = resolve(srcDir, "index.css");
const htmlPath = resolve(srcDir, "..", "index.html");

const css = readFileSync(stylePath, "utf-8");
const html = readFileSync(htmlPath, "utf-8");

const allowedFamilies = ["Rosnoc", "Eurostile", "PVC Dynasty", "Satoshi"];
const explicitDeclarations = css.match(/font-family:\s*([^;{]+);/g) ?? [];

const retiredFamilies = [
  "Bricolage Grotesque",
  "Bricolage",
  "Manrope",
  "Inter",
  "Space Grotesk",
];

describe("Four-font typography register", () => {
  it("declares @font-face sources only for the four licensed typefaces", () => {
    const faces = css.match(/@font-face\s*{[^}]+}/g) ?? [];
    expect(faces.length).toBeGreaterThanOrEqual(7);
    for (const face of faces) {
      const familyMatch = face.match(/font-family:\s*"?([^";]+)"?/);
      expect(familyMatch).toBeTruthy();
      const family = familyMatch![1].trim();
      expect(allowedFamilies).toContain(family);
      const srcMatch = face.match(/src:\s*url\("([^"]+)"\)/);
      expect(srcMatch).toBeTruthy();
      expect(srcMatch![1]).toMatch(/\/manus-storage\/.*\.woff2$/);
    }
  });

  it("uses only allowed typefaces in every explicit font-family declaration", () => {
    for (const decl of explicitDeclarations) {
      const families = decl
        .replace(/font-family:\s*/, "")
        .replace(/;$/, "")
        .split(",")
        .map((f) => f.trim().replace(/"/g, ""));
      for (const family of families) {
        if (family === "ui-sans-serif" || family === "system-ui" || family === "sans-serif") continue;
        const isAllowed = allowedFamilies.some((allowed) => family.startsWith(allowed));
        const isRetired = retiredFamilies.some((retired) => family.startsWith(retired));
        expect({ family, isAllowed, isRetired }).toMatchObject({ isAllowed: true, isRetired: false });
      }
    }
  });

  it("never references retired typefaces anywhere in the client source", () => {
    for (const retired of retiredFamilies) {
      expect(css).not.toContain(retired);
      expect(html).not.toContain(retired);
    }
  });

  it("preloads the two heaviest typefaces (Rosnoc, Satoshi Regular) in index.html", () => {
    for (const token of ["Rosnoc-Regular", "Satoshi-Regular"]) {
      expect(html).toMatch(new RegExp(`rel="preload"[^>]*${token}`));
    }
  });

  it("assigns each licensed typeface at least once in the design system", () => {
    for (const family of allowedFamilies) {
      expect(css).toContain(`"${family}"`);
    }
  });
});

describe("Signal shared left-column boundary", () => {
  it("keeps the copy column clear of the right visual field at all breakpoints", () => {
    expect(css).toContain("/* Signal composition lock: copy belongs to the left field, never the luminous field on the right. */");
    expect(css).toContain("--signal-column-width: min(500px, calc(100% - var(--signal-visual-field) - clamp(72px, 13vw, 190px)))");
    expect(css).toContain(".proof-signal .signal-copy { width: var(--signal-column-width); max-width: none; }");
    expect(css).toContain(".proof-signal .signal-copy h2 { width: 100%; max-width: none; margin-top: 0; }");
    expect(css).toContain(".proof-signal .signal-copy .proof-signal__copy { width: min(74%, 360px); max-width: none;");
    expect(css).toContain("--signal-column-width: calc(62vw - 48px);");
  });
});
