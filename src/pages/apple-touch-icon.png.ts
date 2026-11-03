import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";

// iOS applies its own corner mask, so the icon is rendered square.
export const GET: APIRoute = async () => {
  const svg = (await readFile("public/favicon.svg", "utf8")).replace('rx="14"', 'rx="0"');
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 180 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
