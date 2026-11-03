# bewithgaurav.github.io

Source for [bewithgaurav.github.io](https://bewithgaurav.github.io), the personal site of Gaurav Sharma.

A single static page built with [Astro](https://astro.build). It ships with no framework runtime: the only
client-side JavaScript is a theme toggle and the section scroll-spy.

## Develop

Requires Node 22.23.4 or later.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # type-checks, then builds to dist/
npm run preview   # serves dist/
```

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | All content. Edit this to change anything on the page. |
| `src/pages/index.astro` | Page layout and section order |
| `src/components/` | Benchmark bars, project cards, section wrapper, icons, theme toggle |
| `src/styles/global.css` | Design tokens (light and dark via `light-dark()`), base styles |
| `src/pages/og.png.ts` | Builds the social preview image from the content, at build time |
| `public/favicon.svg` | The mark: a long "before" bar over a short "after" bar |

## Content rules

Every fact here comes from the public, verified records in a private career inventory, and the wording
follows the approved résumé. Change a fact there first, then mirror it in `src/data/site.ts`. Never add a
number, technology or claim of scope the inventory does not support. Numbers are point-in-time, so update
`scaleAsOf` whenever you refresh them.

Do not publish the résumé PDF here: it carries contact details that stay private.

## Deploy

Every push to `master` builds and deploys through GitHub Actions (`.github/workflows/deploy.yml`) to
GitHub Pages. In the repository's Pages settings, the source must be **GitHub Actions**.

## License

Code is MIT licensed. The written content and the portrait are © Gaurav Sharma, all rights reserved.
