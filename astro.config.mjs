// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bewithgaurav.github.io",
  trailingSlash: "ignore",
  build: { inlineStylesheets: "always" },
});
