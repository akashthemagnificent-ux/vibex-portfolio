import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(import.meta.dirname, "ThrottledSplineCanvas.tsx"), "utf8");

describe("ThrottledSplineCanvas", () => {
  it("uses the lazy desktop Spline wrapper with render-on-demand and visibility lifecycle safeguards", () => {
    expect(source).toContain("@splinetool/react-spline");
    expect(source).toContain("renderOnDemand");
    expect(source).toContain("IntersectionObserver");
    expect(source).toContain("application.stop()");
    expect(source).toContain("application.play()");
    expect(source).toContain("application.stop()");
    expect(source).toContain("application.play()");
    expect(source).toContain("IntersectionObserver");
  });
});
