# CBAiQ Libraries — content repo & GitHub Pages site

> **If you are an AI agent reading this:** start here. This document tells you everything
> you need to know to add content, update the site, and maintain the repo correctly.
> Read this file fully before making any changes.

---

## What this repo is

This is the **single source of truth** for CommBank iQ's four internal libraries (Prompts,
Context, Workflows, and Solutions) published as a GitHub Pages site. The site is entirely
driven by markdown files in this repo — you never edit HTML directly.

**The flow:**

```
You add or edit a .md file in content/   →   push to main
        ↓
GitHub Actions runs scripts/build.js
        ↓
Generates a complete static site in site/
        ↓
GitHub Pages deploys site/ to the live URL
        ↓
New page is live — no manual HTML work needed
```

---

## Repo layout

```
/
├── README.md              ← You are here. AI entry point.
├── CONTRIBUTING.md        ← Detailed schemas, rules, and versioning guide
├── package.json           ← Node.js build dependencies
├── scripts/
│   └── build.js           ← Converts content/ → site/ (HTML)
├── assets/                ← Design system files (tracked in git, do not modify)
│   ├── css/styles.css
│   ├── js/app.js
│   └── img/
├── content/               ← ALL markdown source files live here
│   ├── solutions/
│   │   ├── property/
│   │   │   └── centre-iq.md          ← one file = one solution page
│   │   └── consumer-brands/
│   │       └── enrich-iq.md
│   ├── prompts/
│   │   ├── review-and-validate/
│   │   │   └── project-validator.md  ← one file = one prompt page
│   │   └── communicate-and-collaborate/
│   ├── context/
│   │   └── create-stories-and-outputs/
│   │       └── tone-of-voice.md      ← one file = one context file page
│   └── workflows/
│       └── find-and-understand/
│           └── using-the-prompt-library.md
├── .github/
│   └── workflows/
│       └── build.yml      ← Runs build.js on push to main → deploys to Pages
├── index.html             ← Static landing page (not generated, do not edit)
└── site/                  ← GITIGNORED — generated output, never commit this
```

---

## Content types and their folder paths

### Solutions (`content/solutions/<vertical>/<slug>.md`)

A solution is a CommBank iQ data product sold to external clients.
The detail page renders the full markdown body for human reading and AI ingestion.

**Vertical folder names** — use exactly as written:

| Folder | Display label |
|---|---|
| `property` | Property |
| `consumer-brands` | Consumer Brands |
| `healthcare` | Healthcare |
| `government` | Government |
| `financial-services` | Financial Services |
| `retail` | Retail |

**Example:** `content/solutions/property/centre-iq.md`
→ generates: `site/solutions/property/centre-iq/index.html`
→ live at: `/solutions/property/centre-iq/`

---

### Prompts (`content/prompts/<intent>/<slug>.md`)

A prompt is a reusable AI instruction users copy into their AI tool.
The detail page shows the latest prompt body in a copy block with version history.

---

### Context files (`content/context/<intent>/<slug>.md`)

A context file is a markdown document users upload to their AI tool's project knowledge
(Claude Projects, ChatGPT Projects) for persistent, session-wide context.
The detail page leads with a download card.

---

### Workflows (`content/workflows/<intent>/<slug>.md`)

A workflow is a numbered step-by-step guide for completing a task using AI tools.

---

### Intent folder names — shared by prompts, context, workflows

Use these **exactly** as the second-level folder. The build maps them to display labels.

| Folder | Display label |
|---|---|
| `get-set-up` | Get set up & access |
| `find-and-understand` | Find & understand |
| `plan-and-prioritise` | Plan & prioritise |
| `decide-and-govern` | Decide & govern |
| `review-and-validate` | Review, validate & get approval |
| `analyse-and-generate-insights` | Analyse & generate insights |
| `work-with-data` | Work with data |
| `create-stories-and-outputs` | Create stories & outputs |
| `communicate-and-collaborate` | Communicate & collaborate |
| `engage-customers` | Engage customers & sell |
| `measure-and-improve` | Measure & improve |
| `operate-and-support` | Operate & support |
| `manage-money` | Manage money & vendors |

---

## How to add new content (step by step)

### Adding a new prompt

1. Create a new `.md` file in `content/prompts/<intent>/`:
   ```
   content/prompts/review-and-validate/insights-pack-reviewer.md
   ```

2. Use the prompt schema from `CONTRIBUTING.md`. The minimum required front-matter:
   ```yaml
   ---
   title: "Insights Pack Reviewer"
   intent: "review-and-validate"
   owner: "Full Name"
   version: "v1.0"
   updated: "YYYY-MM-DD"
   description: "One sentence — appears on the catalogue card."
   versions:
     - version: "v1.0"
       date: "YYYY-MM-DD"
       author: "Full Name"
       summary: "Initial version."
       body: |
         [Full prompt text here]
   ---

   ## When to use it
   [prose description]
   ```

3. Push to `main`. The build runs automatically.

### Adding a new context file

1. Create `content/context/<intent>/<slug>.md`
2. Use the context schema from `CONTRIBUTING.md`
3. The file body IS the context file content — write it in full markdown
4. Push to `main`

### Adding a new solution

1. Create `content/solutions/<vertical>/<slug>.md`
2. Use the solution schema from `CONTRIBUTING.md`
3. Write the full solution description in the body
4. Push to `main`

### Adding a new workflow

1. Create `content/workflows/<intent>/<slug>.md`
2. Use the workflow schema from `CONTRIBUTING.md`
3. Write the numbered steps in the body
4. Push to `main`

---

## Versioning — how it works

Versioning works differently depending on content type. See `CONTRIBUTING.md` for the
full rules. The short version:

### Prompts — inline versioning

All versions of a prompt are stored **inside the same file** in the `versions:` YAML array.
Each entry has a `body:` field containing the full prompt text for that version. When you
update a prompt, prepend a new entry to the array and bump the top-level `version:` field.

```yaml
versions:
  - version: "v2.0"        ← newest first
    date: "2026-05-15"
    author: "Full Name"
    summary: "What changed."
    body: |
      [new prompt text]
  - version: "v1.0"        ← previous version, still accessible in the UI
    date: "2026-03-01"
    author: "Full Name"
    summary: "Initial version."
    body: |
      [old prompt text]
```

The UI shows all versions in a collapsible accordion so users can view and copy any version.

### Context files, Solutions, Workflows — file-based versioning

For these types, the file body itself IS the content (a full markdown document), so storing
multiple full versions in YAML front-matter is not practical. Instead:

**Current version:** always in the main file (`content/context/intent/slug.md`)

**Archived versions:** stored as separate files in a `_versions/` subfolder alongside
the main file:
```
content/context/create-stories-and-outputs/
├── tone-of-voice.md                              ← always the CURRENT version
└── _versions/
    ├── tone-of-voice_v1.1_20260315.md            ← archived v1.1
    └── tone-of-voice_v1.0_20260201.md            ← archived v1.0
```

**How to update a context file / solution / workflow:**
1. Archive the current file: copy `slug.md` → `_versions/slug_v<current-version>_<YYYYMMDD>.md`
2. Edit `slug.md` with the new content
3. In the front-matter, bump `version:` and `updated:`
4. Prepend a new entry to the `versions:` changelog (no `body:` field — just metadata)
5. The previous version entry should add a `filename:` pointing to its archived file
6. Push to `main`

Example front-matter after updating from v1.1 to v1.2:
```yaml
versions:
  - version: "v1.2"                           ← new current, no filename (IS the current file)
    date: "2026-04-30"
    author: "Will Haigh"
    summary: "Added data storytelling language section."
  - version: "v1.1"                           ← now archived
    date: "2026-03-15"
    author: "Will Haigh"
    summary: "Expanded examples."
    filename: "_versions/tone-of-voice_v1.1_20260315.md"
    filesize: "16 KB"
  - version: "v1.0"
    date: "2026-02-01"
    author: "Will Haigh"
    summary: "Initial version."
    filename: "_versions/tone-of-voice_v1.0_20260201.md"
    filesize: "14 KB"
```

The build script copies `_versions/` folders to `site/` so archived files are downloadable.

---

## Content currently in this repo

All content files exist and have basic structure. Most are stubs marked
`Content coming soon — migrating from Confluence.` — the AI's primary job is to
migrate and write the actual content for these files, following the schemas in `CONTRIBUTING.md`.

**Fully written:**
- `content/solutions/property/centre-iq.md` — complete solution description
- `content/prompts/review-and-validate/project-validator.md` — complete with version history

**Stubs needing content:** everything else. Front-matter needs to be completed and body
content written. Follow the schemas in `CONTRIBUTING.md` for each type.

---

## Running the build locally

```bash
npm install           # install gray-matter and marked
npm run build         # generates site/ from content/
```

Open `site/index.html` in a browser to preview. The build also generates
`site/search-index.json` which powers the search function.

---

## GitHub setup (for first-time repo upload)

After uploading this repo to GitHub:

1. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `GitHub Actions` (not a branch)
   - Save

2. **Check Actions permissions:**
   - Go to Settings → Actions → General
   - Workflow permissions: `Read and write permissions`
   - Save

3. **Push to `main`** — the `build.yml` workflow runs automatically, generates `site/`, and deploys it to Pages

4. **Get the URL:** GitHub will show the Pages URL in Settings → Pages after the first deploy succeeds

---

## Design system

All pages use the Lumen design system defined in `assets/css/styles.css`.
Do not modify `assets/css/styles.css` or `assets/js/app.js` for content changes.
These files define site-wide styling and interactive behaviour.

Key CSS classes used in generated pages:

| Class | Purpose |
|---|---|
| `.cb-shell` + `.cb-shell-side` + `.cb-shell-main` | Page layout |
| `.cb-section-h2` / `.cb-section-h3` | Section headings |
| `.cb-prose` | Prose content wrapper |
| `.cb-table` | Data tables |
| `.cb-acc` + `.cb-acc-head` | Version history accordions |
| `.cb-card` + `.cb-card-grid` | Catalogue index cards |
| `.cb-btn` + `.cb-btn-dark` / `.cb-btn-light` | Buttons |
| `.cb-code` + `.cb-prompt-block` | Prompt body display |

---

## Rules for AI agents

1. **Never edit HTML files.** Only edit markdown in `content/`. Generated HTML is in `site/` (gitignored) — it is overwritten on every build.
2. **Never edit `assets/`** for content changes.
3. **Never edit `index.html`** at the repo root — it is the static landing page, managed separately.
4. **Front-matter is the source of truth** for title, intent/vertical, owner, version, description.
5. **Intent and vertical folder names must match exactly** — use the canonical lists above.
6. **Bump version on every meaningful content change** — add a new entry to `versions:` and update the top-level `version:` and `updated:` fields.
7. **Australian English.** No emoji. No filler sentences.
8. **Keep descriptions to one sentence** — they appear on catalogue cards.
9. **Run `npm run build` locally** before pushing to verify no build errors.
