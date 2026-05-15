# CONTRIBUTING — schemas, versioning, and AI agent rules

Read `README.md` first for the system overview. This file has the technical details.

---

## Front-matter schemas

### Solution (`content/solutions/<vertical>/<slug>.md`)

```yaml
---
title: "Centre iQ"
vertical: "property"                      # must match a canonical vertical folder name
status: "Established"                     # Established | Emerging
commercial_owner: "Callan Cameron"
technical_owner: "Alistair Knox"
version: "1.00"                           # format: "1.00", "1.01", "2.00"
updated: "2026-05-07"                     # format: YYYY-MM-DD
description: "One sentence — appears on the catalogue card and meta description."
loe_url: "https://commbank.sharepoint.com/..."     # optional
sop_url: "https://commbank.atlassian.net/..."      # optional
github_url: "https://github.com/..."               # optional
filename: "Property_Centre-iQ_Solution_v1.00_20260507.md"
filesize: "32 KB"
versions:
  - version: "1.00"
    date: "2026-05-07"
    author: "Mantas Zegeris-Kaleda"
    summary: "Initial draft from catalogue Excel and client lead description."
    # no filename: for current version — it IS the current file
  # when v1.01 is released, add it above and add filename to v1.00:
  # - version: "1.00"
  #   ...
  #   filename: "_versions/centre-iq_v1.00_20260507.md"
  #   filesize: "32 KB"
---

# Centre iQ

[Full markdown body — tables, prose, lists. No raw HTML.]
```

**Filename convention for slug:** `<kebab-case-product-name>.md`
Examples: `centre-iq.md`, `enrich-iq.md`, `market-monitor-iq-brand.md`

**Filename convention for archived versions:** `<slug>_v<version>_<YYYYMMDD>.md`
Goes in a `_versions/` subfolder alongside the main file.
Examples: `centre-iq_v1.00_20260507.md`

---

### Prompt (`content/prompts/<intent>/<slug>.md`)

```yaml
---
title: "Project Validator"
intent: "review-and-validate"             # must match a canonical intent folder name
owner: "Mantas Zegeris-Kaleda"
version: "v2.3"                           # format: "v1.0", "v2.3" (lowercase v)
updated: "2026-05-07"                     # format: YYYY-MM-DD
description: "One sentence — appears on the catalogue card."
copy_count: 142                           # optional — omit if unknown
attachments:                              # optional
  - type: "context"                       # context | workflow | prompt
    title: "CBAiQ Delivery Culture Framework"
    url: "/context/decide-and-govern/delivery-culture-framework/"
versions:
  - version: "v2.3"                       # newest first
    date: "2026-05-07"
    author: "Mantas Zegeris-Kaleda"
    summary: "Added risk flag section."
    body: |
      # Project Validator

      You are a senior project reviewer…

      ## Inputs
      - {{project_brief}} — the one-pager or PRD

      Use Australian English throughout.
  - version: "v2.0"
    date: "2026-02-11"
    author: "Mantas Zegeris-Kaleda"
    summary: "Full rewrite — structured rubric introduced."
    body: |
      [previous prompt body]
---

## When to use it

[Prose: when to reach for this prompt, what stage of work it suits.]

## Attachments & context

[List any context files or workflows to pair with this prompt.]
```

**Versioning rule for prompts:** Store ALL versions inline in the `versions:` array.
Bodies are small enough to fit in YAML. Never delete old versions — users may rely on them.

**Body formatting:** The `body:` field is verbatim prompt text. Preserve whitespace.
`{{variable}}` placeholders are kept as-is for users to fill in.

---

### Context file (`content/context/<intent>/<slug>.md`)

```yaml
---
title: "CBAiQ Tone of Voice"
intent: "create-stories-and-outputs"      # must match a canonical intent folder name
owner: "Will Haigh"
version: "v1.2"                           # format: "v1.0", "v1.2"
updated: "2026-04-30"                     # format: YYYY-MM-DD
description: "One sentence — appears on the catalogue card."
filename: "CBAiQ_Tone-of-Voice_Context_v1.2_20260430.md"
filesize: "18 KB"
versions:
  - version: "v1.2"                       # current version — no filename needed
    date: "2026-04-30"
    author: "Will Haigh"
    summary: "Added data storytelling language section."
  - version: "v1.1"                       # archived — filename points to _versions/
    date: "2026-03-15"
    author: "Will Haigh"
    summary: "Expanded examples. Added chart labelling guidance."
    filename: "_versions/tone-of-voice_v1.1_20260315.md"
    filesize: "16 KB"
---

## Description

[What the file covers, why it exists, what problem it solves.]

## Use case

[When to attach this file. Which AI tools, which project types.]

## How to use it

1. Download the file using the button above.
2. Upload to your AI tool's project knowledge.
3. Reference it in your prompt: "Write in line with the [file name] in your project knowledge."
```

**The body of the context file IS the context content.** Write it as you would write the
actual context document — thorough, structured, in Australian English.

**Filename convention:** `<PascalCaseTitle>_Context_v<version>_<YYYYMMDD>.md`
The top-level `filename:` matches the file as it will appear when downloaded.

**Archived versions** go in `_versions/` alongside the main file and follow the same naming:
`_versions/<slug>_v<version>_<YYYYMMDD>.md`

---

### Workflow (`content/workflows/<intent>/<slug>.md`)

```yaml
---
title: "Using the Prompt Library"
intent: "find-and-understand"             # must match a canonical intent folder name
owner: "Mantas Zegeris-Kaleda"
version: "v1.0"
updated: "2026-05-01"
description: "One sentence — appears on the catalogue card."
filename: "CBAiQ_Using-the-Prompt-Library_Workflow_v1.0_20260501.md"
filesize: "8 KB"
versions:
  - version: "v1.0"
    date: "2026-05-01"
    author: "Mantas Zegeris-Kaleda"
    summary: "Initial version."
---

## Overview

[Brief explanation of what this workflow covers and who it is for.]

## Steps

1. Step one — be specific.
2. Step two.
3. Step three.

## Tips

[Optional: useful hints, common mistakes, related resources.]
```

---

## Canonical intent folder names

| Folder name | Display label |
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

## Canonical vertical folder names (solutions only)

| Folder name | Display label |
|---|---|
| `property` | Property |
| `consumer-brands` | Consumer Brands |
| `healthcare` | Healthcare |
| `government` | Government |
| `financial-services` | Financial Services |
| `retail` | Retail |

---

## File and slug naming rules

| Type | Slug format | Example |
|---|---|---|
| Solution | kebab-case product name | `centre-iq.md`, `enrich-iq.md` |
| Prompt | kebab-case verb phrase | `project-validator.md`, `bet-builder.md` |
| Context | kebab-case topic | `tone-of-voice.md`, `delivery-culture-framework.md` |
| Workflow | kebab-case verb phrase | `using-the-prompt-library.md`, `set-up-docusign.md` |

Rules: lowercase, hyphens only, no spaces, no underscores, no special characters.

---

## Versioning in detail

### When to bump the version

- Any change to prompt body text → bump version, add new `versions:` entry with new body
- Any change to context file content → bump version, archive old file to `_versions/`
- Any change to solution body content → bump version, archive old file to `_versions/`
- Metadata-only changes (fix typo in `description:`, correct owner name) → do NOT bump version

### How to update a prompt (inline versioning)

1. Prepend a new entry to the `versions:` array (newest first)
2. The new entry must include: `version`, `date`, `author`, `summary`, `body`
3. Update top-level `version:` and `updated:` to match the new entry
4. Old entries remain in the array — do not delete them

### How to update a context file / solution / workflow (file-based versioning)

1. Decide the new version number (e.g. current is `v1.1`, new is `v1.2`)
2. Archive the current file:
   ```
   cp content/context/intent/slug.md \
      content/context/intent/_versions/slug_v1.1_YYYYMMDD.md
   ```
3. Edit `slug.md` — update the content
4. In front-matter:
   - Bump `version:` to `v1.2`
   - Bump `updated:` to today's date
   - Prepend a new entry to `versions:` (no `filename:` — it IS the current file)
   - Add `filename: "_versions/slug_v1.1_YYYYMMDD.md"` to the v1.1 entry
5. The build script copies `_versions/` to `site/` automatically

### Stub files (content coming soon)

Most files in this repo are stubs with minimal front-matter (`title:` only).
When migrating content for a stub:

1. Open the stub file
2. Replace the front-matter with the full schema for that content type
3. Write the body content in full
4. The `version:` for fresh content starts at `v1.0` (prompts/context/workflows) or `1.00` (solutions)

---

## Checklist before pushing

- [ ] Front-matter has all required fields for the content type
- [ ] `intent` or `vertical` exactly matches one of the canonical folder names
- [ ] `version` and `updated` are consistent with `versions[0]`
- [ ] `description` is one sentence, no filler
- [ ] Body is plain markdown — no raw HTML, no emoji
- [ ] Australian English used throughout
- [ ] `npm run build` runs without errors
- [ ] For solutions and context files being updated: old version archived to `_versions/`

---

## Prohibited actions

- Do not edit any file in `site/` (it is gitignored — generated on every build)
- Do not modify `assets/css/styles.css` or `assets/js/app.js`
- Do not modify `index.html` at the repo root (static landing page)
- Do not invent new intent or vertical identifiers
- Do not use raw HTML in markdown body content
- Do not delete version history entries from `versions:` arrays
- Do not use US English spelling
