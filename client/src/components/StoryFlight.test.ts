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
    expect(component).toContain('className="story-flight__streaks"');
    expect(component).toContain('className="story-flight__craft"');
    expect(css).toContain(".story-flight__body");
    expect(css).toContain(".story-flight__trail");
    expect(css).toContain("var(--interactive)");
    expect(css).toContain("var(--mystery)");
  });

  it("uses transform-and-opacity flight motion and disables it for reduced motion", () => {
    expect(css).toContain("@keyframes storyStreak");
    expect(css).toContain("@keyframes storyCraft");
    expect(css).toContain(".story-flight__streaks span, .story-flight__craft { animation: none; }");
  });
});
