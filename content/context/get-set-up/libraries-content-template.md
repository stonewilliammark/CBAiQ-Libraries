---
title: "CBAiQ Libraries Content Template"
intent: "get-set-up"
owner: "William Stone"
description: "Schemas and templates for creating README.md and version files for all four CBAiQ Libraries content types."
filename: "CBAiQ_Libraries-Content-Template_Context_v1.0_20260520.md"
filesize: "6 KB"
versions:
  - version: "v1.0"
    date: "2026-05-20"
    author: "William Stone"
    summary: "Initial version — covers prompts, context files, workflows, and solutions."
---

## Description

This file contains the exact schemas and file templates for creating content entries in the CBAiQ Libraries GitHub repo. Attach it to any AI project that will be creating or updating library content. The AI uses it to produce correctly structured README.md and version file pairs ready to drop into the repo.

## Use case

Attach to the Prompt Builder project when using Pathway 3 (Add to CBAiQ Libraries). Also useful for any AI session where you are migrating content from Confluence or creating new library entries from scratch.

## How to use it

1. Add this file to your AI project's knowledge.
2. Use the Prompt Builder prompt with Pathway 3, or instruct the AI directly: "Create a CBAiQ Libraries README and version file for [content]."
3. The AI produces two files. Save them into the correct folder in the repo and push to main.

---

## Versioning rules

Format: `v[major].[minor]` — two parts only.

| Version | When to use |
|---|---|
| `v0.1`, `v0.2` | Draft — not yet ready to share widely |
| `v1.0` | First published version |
| `v1.1`, `v1.2` | Minor update — added section, refined wording |
| `v2.0` | Major rewrite or fundamentally different approach |

Do not bump for: typo fixes in description, owner name corrections, fixing a broken link.

Rule of thumb: would a user notice a difference if they used the old version vs the new one? Yes → bump. No → don't.

---

## Folder structure

```
content/<type>/<group>/<slug>/
├── README.md
└── <prefix>_v1.0.md
```

Version file naming:
- Prompts: `prompt_v1.0.md`
- Context files: `{slug}_v1.0.md` (e.g. `tone-of-voice_v1.2.md`)
- Workflows: `workflow_v1.0.md`
- Solutions: `solution_v1.00.md`

---

## README.md schema — Prompts

```yaml
---
title: "Prompt Title"
intent: "intent-folder-name"
owner: "Full Name"
description: "One sentence — appears on the catalogue card. No filler."
copy_count: 0                    # omit if unknown
attachments:
  - title: "Context File Name"
    type: context                # context | workflow | prompt
    url: "/context/intent/slug/"
related:
  - title: "Related item title"
    type: workflow
    url: "/workflows/intent/slug/"
---

## Use case
When to reach for this prompt. What stage of work it suits. What problems it solves.

## Tips
Optional: useful hints, common mistakes, variables to fill in, how to combine with other prompts.
```

---

## README.md schema — Context files

```yaml
---
title: "Context File Title"
intent: "intent-folder-name"
owner: "Full Name"
description: "One sentence — appears on the catalogue card."
filename: "CBAiQ_Title_Context_v1.0_20260101.md"
filesize: "12 KB"
---

## Description
What this file covers, why it exists, what problem it solves.

## Use case
When to attach this file. Which AI tools, which project types.

## How to use it
1. Download the file using the button above.
2. Upload to your AI tool's project knowledge.
3. Reference it in your prompt: "Write in line with the [file name] in your project knowledge."
```

---

## README.md schema — Workflows

```yaml
---
title: "Workflow Title"
intent: "intent-folder-name"
owner: "Full Name"
description: "One sentence — appears on the catalogue card."
---

## Overview
Brief explanation of what this workflow covers and who it is for.

## Tips
Optional: useful hints, common mistakes, related resources.
```

---

## README.md schema — Solutions

```yaml
---
title: "Solution Title"
vertical: "vertical-folder-name"
status: "Established"            # Established | Emerging | Pilot
commercial_owner: "Full Name"
technical_owner: "Full Name"
description: "One sentence — appears on the catalogue card."
loe_url: "https://..."           # optional
sop_url: "https://..."           # optional
github_url: "https://..."        # optional
filename: "Title_Solution_v1.00.md"
filesize: "32 KB"
---
```

Solution README body is typically empty or brief — the full content goes in the version file.

---

## Version file schema (all types)

```yaml
---
date: "YYYY-MM-DD"
author: "Full Name"
summary: "One line describing what changed in this version."
---

[Full content here]
```

For prompts: the raw prompt text — exactly what a user would copy into their AI tool.
For context files: the complete context document.
For workflows: the full numbered steps and any supporting content.
For solutions: the complete solution description (all sections).

No extra wrapper, no metadata repeated from README. Just the content.

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

## Canonical vertical folder names (solutions only)

| Folder name | Display label |
|---|---|
| `property` | Property |
| `consumer-brands` | Consumer Brands |
| `healthcare` | Healthcare |
| `government` | Government |
| `financial-services` | Financial Services |
| `retail` | Retail |
| `visitor-economy` | Visitor Economy |
