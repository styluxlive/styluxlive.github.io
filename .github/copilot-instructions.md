<!-- Copilot / AI agent instructions tailored to this Hugo Blox site -->
# Copilot Instructions for this Repository

These notes help an AI coding agent be productive quickly in this Hugo Blox-based site.

- **Project type:** Hugo static site using the Hugo Blox `academic-cv` template (see `hugoblox.yaml`).
- **Hugo version:** `0.152.2` (set in `hugoblox.yaml` and CI). Keep changes compatible with this version.
- **Package manager:** `pnpm` (see `package.json`); Node tooling used for Tailwind, Pagefind, and build helpers.

**Quick local commands**

- Install deps: `pnpm install`
- Dev server: `pnpm run dev` (runs `hugo server --disableFastRender`)
- Production build: `pnpm run build` (runs `hugo --minify`)
- CI/Netlify build uses: `hugo --gc --minify -b $URL --logLevel debug` (see `netlify.toml`)
- Search indexing: `pnpm dlx pagefind --source public` (used in CI and Netlify)

**Key files & where to look**

- Site config: `config/_default/hugo.yaml` — global Hugo options and important patterns (ignoreFiles, outputs).
- Template identity: `hugoblox.yaml` — this repo is the `academic-cv` template.
- Content: `content/` — create or edit Markdown pages and sections here (e.g., `content/blog`, `content/publications`).
- Publications: `content/publications/*` often include `cite.bib` files — preserve BibTeX formatting and front matter.
- Layouts & partials: `layouts/` and `layouts/_partials/` — custom HTML/shortcodes; example: `layouts/_partials/hooks/head-end/github-button.html`.
- Static assets: `assets/` and `static/` — images and uploads; processed assets live in `resources/` during build and `public/` after build.
- CI: `.github/workflows/deploy.yml` — GitHub Actions build for Pages; `netlify.toml` — Netlify build used by Netlify hosting.

**Conventions & patterns to follow**

- Do not edit the generated `/public` directory in source control — it is the build artifact.
- Content pages use Hugo front matter (YAML); match existing fields (e.g., `title`, `date`, `summary`, `authors`).
- Publications rely on `.bib` files under `content/publications/*` — keep BibTeX entries intact and update citation keys carefully.
- Tailwind is configured via dependencies in `package.json`; prefer editing styles through `assets/` and Tailwind utilities.
- If adding JS components, follow the existing lightweight approach (small `preact` usage listed in `package.json`) instead of adding heavy frameworks.

**CI / deploy notes an agent should respect**

- CI installs via `pnpm install` and then runs `hugo --minify`. Preserve these commands and their environment variables when changing build logic.
- Netlify and GitHub Actions set `HUGO_ENV`, `HUGO_VERSION`, and `NODE_VERSION`. Avoid breaking compatibility with those versions unless updating CI config too.
- Pagefind indexing runs after build; if you modify output paths, update the `pagefind` invocation.

**Examples of safe, repo-specific code changes**

- To add a blog post: create `content/blog/YYYY-MM-DD-title.md` with standard Hugo front matter and include `summary` for lists.
- To update the header partial: edit `layouts/_partials/header.html` (or hook partials in `layouts/_partials/hooks/`) and test with `pnpm run dev`.
- To change Tailwind config or styles: update files under `assets/` and rebuild (`pnpm run build`) and check `resources/` caching in CI.

If anything in these notes is unclear or you want more examples (e.g., common front-matter fields, sample publication entry, or CI-related debugging steps), ask and I will expand this file.

<!-- End of Copilot guidance -->
