import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const componentDir = dirname(fileURLToPath(import.meta.url));
const component = readFileSync(resolve(componentDir, "StoryFlight.tsx"), "utf-8");
const home = readFileSync(resolve(componentDir, "..", "pages", "Home.tsx"), "utf-8");
const css = readFileSync(resolve(componentDir, "..", "index.css"), "utf-8");

describe("Story flight artifact", () => {
  it("appears directly after the achievement statement in the Story section", () => {
    expect(home).toMatch(/className="story-closing"[\s\S]*?<\/p>\s*<StoryFlight \/>/);
  });

  it("keeps the original flight language while using only the portfolio palette", () => {
    expect(component).toContain('className="story-flight"');
    expect(component).toContain('className="loader"');
    expect(component).toContain('className="longfazers"');
    expect(component).toContain('className="clouds"');
    expect(component).toContain('className="story-flight__caption"');
    expect(css).toContain(".longfazers span {");
    expect(css).toContain("var(--mystery)");
    expect(css).toContain("var(--interactive)");
  });

  it("uses transform-and-opacity flight motion and disables it for reduced motion", () => {
    expect(css).toContain("@keyframes storyFazer");
    expect(css).toContain("@keyframes storyMoveClouds");
    expect(css).toContain("@keyframes storyLf");
    expect(css).toContain("@keyframes storySpeeder");
    expect(css).toContain(".longfazers span, .cloud { animation: none !important; }");
    expect(css).toContain(".loader { animation: none !important; transform: translate(0, 0);");
  });
});
