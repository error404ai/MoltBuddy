import { register } from "node:module";
register("./tsnode-esm-loader.mjs", import.meta.url);

async function init() {
  try {
    // Prefer runtime TypeScript source when using ts-node/esm loader
    const mod = await import("../src/middleware/requestContext.js").catch(() => {
      return import("../dist/middleware/requestContext.js");
    });

    if (mod && mod.RequestContext && typeof mod.RequestContext.run === "function") {
      mod.RequestContext.run(() => {});
    }
  } catch (err) {
    // Non-fatal: do not throw, many scripts may not require RequestContext
    console.warn("init-request-context: failed to initialize RequestContext -", err && err.message);
  }
}

await init();
