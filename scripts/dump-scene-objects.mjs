// Dump the object tree of the deployed Spline scene so the ball can be targeted by its real name/type.
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const sceneUrl = process.argv[2] ?? "http://localhost:3000/manus-storage/vibex-distorting-typography_3bccffc6.splinecode";

const out = execSync(`curl -s "${sceneUrl}"`, { encoding: "binary" });
writeFileSync("/tmp/scene.bin", out);
console.log("scene bytes:", out.length);

// The splinecode format is a Spline-internal protobuf-like binary; try the runtime's Scene parser.
const runtimePath = "./node_modules/.pnpm/@splinetool+runtime@1.12.98/node_modules/@splinetool/runtime/dist/runtime.js";
try {
  const runtime = await import(runtimePath);
  const Application = runtime.Application ?? runtime.default?.Application;
  console.log("runtime exports:", Object.keys(runtime).join(", "));
} catch (err) {
  console.log("runtime load failed:", err.message);
}
