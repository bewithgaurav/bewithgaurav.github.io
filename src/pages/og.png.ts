import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { person, highlights } from "../data/site";

const font = (pkg: string, weight: number) =>
  readFile(`node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff`);

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

const bg = "#0b0c0f";
const text = "#ebe9e4";
const muted = "#a1a5ad";
const accent = "#ffb454";
const border = "#22252d";

export const GET: APIRoute = async () => {
  const [sans400, sans600, mono500] = await Promise.all([
    font("geist-sans", 400),
    font("geist-sans", 600),
    font("geist-mono", 500),
  ]);

  const pills = highlights.map((b) =>
    h(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "18px 22px",
        border: `1px solid ${border}`,
        borderRadius: 14,
        background: "#121419",
        flex: 1,
        boxSizing: "border-box",
      },
      h("div", { fontFamily: "Geist Mono", fontSize: 34, color: accent, letterSpacing: -1 }, b.value),
      h("div", { fontSize: 20, color: muted }, b.label),
    ),
  );

  const svg = await satori(
    h(
      "div",
      {
        width: 1200,
        height: 630,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: `radial-gradient(900px 600px at 0% 0%, rgba(255,180,84,0.12), transparent 70%), ${bg}`,
        color: text,
        fontFamily: "Geist",
      },
      h(
        "div",
        { display: "flex", flexDirection: "column" },
        h(
          "div",
          { fontFamily: "Geist Mono", fontSize: 22, color: muted, letterSpacing: 2, textTransform: "uppercase" },
          `${person.title} · ${person.org}`,
        ),
        h("div", { fontSize: 96, fontWeight: 600, letterSpacing: -4, marginTop: 18, lineHeight: 1 }, person.name),
        h("div", { fontSize: 38, color: text, marginTop: 26, maxWidth: 940, lineHeight: 1.25 }, person.tagline),
      ),
      h(
        "div",
        { display: "flex", flexDirection: "column", gap: 28 },
        h("div", { display: "flex", gap: 16 }, ...pills),
        h(
          "div",
          { display: "flex", justifyContent: "space-between", fontFamily: "Geist Mono", fontSize: 22, color: muted },
          h("div", {}, "Python · C++ · Django · AI agents"),
          h("div", { color: accent }, person.url.replace("https://", "")),
        ),
      ),
    ) as never,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: sans400, weight: 400, style: "normal" },
        { name: "Geist", data: sans600, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono500, weight: 500, style: "normal" },
      ],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
