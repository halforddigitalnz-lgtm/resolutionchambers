# CLAUDE.md — Frontend Website Rules

## Always Do First — Skills
Invoke these skills, in this order, before writing any frontend code. Every session, no exceptions.

1. **`frontend-design`** — aesthetic direction, typography, and anti-template choices.
2. **`impeccable`** — run `/impeccable context` once per session (via its launcher) so it loads `PRODUCT.md` and `DESIGN.md`. If the project has no `PRODUCT.md` yet, run `/impeccable init` first. Read its `craft-floor` reference immediately before any UI edit.
3. **`emil-design-eng`** — Emil Kowalski's animation and design rules. Apply them to every interactive element and transition.

Then invoke these situationally, whenever the task matches:

- **`animate`** — any time you build a new animation or transition (choose easing, duration, and properties through it, not by hand).
- **`review-animations`** — after adding or changing motion, before you report done.
- **`find-animation-opportunities`** — when a page is static and the user has asked for polish or life.
- **`improve-animations`** — when auditing an existing build's motion.
- **`animation-vocabulary`** — when the user describes motion loosely and you need the precise terms.
- **`apple-design`** — when the brief calls for native-feeling, fluid interfaces.
- **`pick-ui-library`** — before installing or hand-rolling any UI component (toasts, sheets, menus, etc.).
- **`prototype`** — when the user wants several variants of one UI piece to compare.
- **`/impeccable critique`, `audit`, `polish`** — use as the final pass before handing a page back.

Skip `animate-expo`, `write-swift`, and `ask-sonner` unless the project is React Native, Swift, or uses Sonner.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing. Enter animations use `ease-out`, exit animations use `ease-in` (per `emil-design-eng`).
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not skip the skills in "Always Do First", even for small edits
