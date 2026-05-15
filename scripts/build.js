#!/usr/bin/env node
'use strict';

/**
 * CBAiQ Libraries — site build script
 *
 * Reads:   content/<type>/<group>/<slug>.md  (YAML front-matter + markdown body)
 * Writes:  site/<type>/<group>/<slug>/index.html  (full HTML page)
 *          site/<type>/index.html                  (catalogue index per library)
 *          site/search-index.json                  (client-side search data)
 *
 * Also copies:
 *   assets/  →  site/assets/
 *   index.html  →  site/index.html
 *   content/<type>/<group>/_versions/  →  site/<type>/<group>/_versions/
 *
 * Run:  node scripts/build.js
 * Deps: gray-matter, marked  (install with: npm install)
 */

const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const ROOT    = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const SITE    = path.join(ROOT, 'site');
const ASSETS  = path.join(ROOT, 'assets');

// ─── Intent / vertical label maps ───────────────────────────────────────────

const INTENT_LABELS = {
  'get-set-up':                    'Get set up & access',
  'find-and-understand':           'Find & understand',
  'plan-and-prioritise':           'Plan & prioritise',
  'decide-and-govern':             'Decide & govern',
  'review-and-validate':           'Review, validate & get approval',
  'analyse-and-generate-insights': 'Analyse & generate insights',
  'work-with-data':                'Work with data',
  'create-stories-and-outputs':    'Create stories & outputs',
  'communicate-and-collaborate':   'Communicate & collaborate',
  'engage-customers':              'Engage customers & sell',
  'measure-and-improve':           'Measure & improve',
  'operate-and-support':           'Operate & support',
  'manage-money':                  'Manage money & vendors',
};
const INTENT_ORDER = Object.keys(INTENT_LABELS);

const VERTICAL_LABELS = {
  'property':           'Property',
  'consumer-brands':    'Consumer Brands',
  'healthcare':         'Healthcare',
  'government':         'Government',
  'financial-services': 'Financial Services',
  'retail':             'Retail',
  'visitor-economy':    'Visitor Economy',
};

// ─── SVG constants ───────────────────────────────────────────────────────────

const LOGO_SVG = `<svg width="144" height="20" viewBox="0 0 144 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15.6316 12.8317C14.9894 16.4159 12.2778 17.993 8.71005 17.993C3.92921 17.993 0.860901 14.6955 0.860901 9.31916C0.860901 3.94281 4.00056 0.573639 8.71005 0.573639C12.2778 0.573639 14.9894 2.22238 15.6316 5.73493H12.7773C12.4206 4.08618 10.9934 3.01091 8.6387 3.01091C5.64175 3.01091 3.57243 5.23314 3.57243 9.24747C3.57243 13.2618 5.57039 15.484 8.6387 15.484C10.9221 15.484 12.4206 14.4088 12.7773 12.76H15.6316V12.8317Z" fill="currentColor"/><path d="M27.549 11.7566C27.549 15.6992 25.1942 17.9931 21.9119 17.9931C18.6295 17.9931 16.2034 15.6992 16.2034 11.7566C16.2034 7.8139 18.5581 5.51999 21.9119 5.51999C25.2656 5.51999 27.549 7.8139 27.549 11.7566ZM18.9863 11.7566C18.9863 14.3372 20.0566 15.8426 21.9119 15.8426C23.7671 15.8426 24.8375 14.4089 24.8375 11.7566C24.8375 9.1759 23.6958 7.67053 21.9119 7.67053C20.0566 7.67053 18.9863 9.10422 18.9863 11.7566Z" fill="currentColor"/><path d="M46.8856 9.60595V17.7063H44.2455V10.1794C44.2455 8.38731 43.3178 7.74215 42.1048 7.74215C40.6777 7.74215 39.3219 8.74573 39.3219 11.1113V17.778H36.6817V10.1794C36.6817 8.38731 35.7541 7.74215 34.6124 7.74215C33.1853 7.74215 31.8295 8.74573 31.8295 11.1113V17.778H29.1894V5.73498H31.8295V7.59878C32.6144 6.23677 33.8989 5.44824 35.54 5.44824C37.2526 5.44824 38.6083 6.30846 39.1792 7.88552C39.9641 6.30846 41.3199 5.44824 43.1751 5.44824C45.3158 5.51993 46.8856 6.95362 46.8856 9.60595Z" fill="currentColor"/><path d="M66.7917 9.60595V17.7063H64.1515V10.1794C64.1515 8.38731 63.2239 7.74215 62.0108 7.74215C60.5837 7.74215 59.228 8.74573 59.228 11.1113V17.778H56.5164V10.1794C56.5164 8.38731 55.5888 7.74215 54.4471 7.74215C53.02 7.74215 51.6642 8.74573 51.6642 11.1113V17.778H49.024V5.73498H51.6642V7.59878C52.4491 6.23677 53.7335 5.44824 55.3747 5.44824C57.0873 5.44824 58.443 6.30846 59.0139 7.88552C59.7988 6.30846 61.1546 5.44824 63.0098 5.44824C65.2218 5.51993 66.7917 6.95362 66.7917 9.60595Z" fill="currentColor"/><path d="M69.149 17.706V0.860138H75.8565C79.8524 0.860138 81.6363 2.58057 81.6363 5.37627C81.6363 7.24007 80.566 8.81713 78.7821 9.17555C80.8514 9.60566 82.0645 11.111 82.0645 13.0465C82.0645 15.9139 79.9951 17.706 75.9992 17.706H69.149ZM71.8606 8.0286H75.7851C77.8545 8.0286 78.9248 7.24007 78.9248 5.59132C78.9248 3.94257 77.8545 3.15404 75.7851 3.15404H71.8606V8.0286ZM71.8606 15.4121H75.9992C78.2112 15.4121 79.3529 14.4802 79.3529 12.9031C79.3529 11.3261 78.2826 10.4659 76.1419 10.4659H71.7892V15.4121H71.8606Z" fill="currentColor"/><path d="M94.1951 15.8424V17.7778C93.8383 17.8495 93.4102 17.9212 92.9107 17.9212C91.6263 17.9212 90.6986 17.3477 90.4132 16.2008C89.6283 17.3477 88.1298 17.9212 86.7741 17.9212C84.348 17.9212 82.7068 16.4875 82.7068 14.1219C82.7068 12.0431 84.2766 10.8244 86.6314 10.5377L90.1278 10.1076V9.67748C90.1278 8.1721 89.4142 7.52694 87.9871 7.52694C86.4173 7.52694 85.6324 8.1721 85.347 9.17569H82.7068C83.1349 6.8101 85.1329 5.3764 88.1298 5.3764C90.8414 5.3764 92.768 6.66673 92.768 9.53411V14.552C92.768 15.4839 93.1247 15.7707 93.767 15.7707C93.981 15.914 94.0524 15.914 94.1951 15.8424ZM90.1992 13.3334V12.0431L87.4163 12.4015C86.0605 12.6165 85.4183 13.0467 85.4183 14.0502C85.4183 15.0538 86.0605 15.8424 87.3449 15.8424C88.558 15.914 90.1992 15.2689 90.1992 13.3334Z" fill="currentColor"/><path d="M105.468 9.60595V17.7063H102.827V10.1794C102.827 8.38731 101.9 7.74215 100.615 7.74215C99.1883 7.74215 97.7611 8.74573 97.7611 11.1113V17.778H95.0496V5.73498H97.6898V7.59878C98.4747 6.23677 99.8305 5.44824 101.472 5.44824C103.898 5.51993 105.468 6.95362 105.468 9.60595Z" fill="currentColor"/><path d="M118.242 17.706H114.889L110.179 11.7562V17.706H107.539V0.860138H110.179V11.2544L114.889 5.80637H118.1L113.105 11.4695L118.242 17.706Z" fill="currentColor"/><path d="M123.166 0.860138H126.092V3.65584H123.166V0.860138ZM125.949 5.73469V17.706H123.309V5.73469H125.949Z" fill="currentColor"/><path d="M141.291 15.8425L143.075 17.9213L141.434 19.4267L139.507 17.1328C138.437 17.7063 137.152 17.993 135.654 17.993C130.802 17.993 127.733 14.6238 127.733 9.31916C127.733 4.0145 130.802 0.573639 135.654 0.573639C140.506 0.573639 143.574 3.87113 143.574 9.24748C143.574 12.1149 142.718 14.3371 141.291 15.8425ZM137.723 15.1256L135.939 13.0468L137.581 11.5414L139.507 13.7636C140.292 12.6883 140.72 11.183 140.72 9.24748C140.72 5.23314 138.794 3.01092 135.654 3.01092C132.443 3.01092 130.516 5.30482 130.516 9.24748C130.516 13.2618 132.443 15.484 135.654 15.484C136.439 15.5557 137.152 15.4124 137.723 15.1256Z" fill="currentColor"/></svg>`;

const CHEVRON = `<svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 4.29289C7.68342 3.90237 8.31658 3.90237 8.70711 4.29289L13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071C6.90237 15.3166 6.90237 14.6834 7.29289 14.2929L11.5858 10L7.29289 5.70711C6.90237 5.31658 6.90237 4.68342 7.29289 4.29289Z" fill="currentColor"/></svg>`;

const SEARCH_SVG = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 8.625C3.75 6.20875 5.70875 4.25 8.125 4.25C10.5412 4.25 12.5 6.20875 12.5 8.625C12.5 11.0412 10.5412 13 8.125 13C5.70875 13 3.75 11.0412 3.75 8.625ZM8.125 3C5.0184 3 2.5 5.5184 2.5 8.625C2.5 11.7316 5.0184 14.25 8.125 14.25C9.45316 14.25 10.6738 13.7897 11.6361 13.0199L16.4331 17.8168L17.3169 16.933L12.52 12.136C13.2897 11.1737 13.75 9.95311 13.75 8.625C13.75 5.5184 11.2316 3 8.125 3Z" fill="currentColor"/></svg>`;

const COPY_SVG = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 3C5.7835 3 5 3.7835 5 4.75V13.25C5 14.2165 5.7835 15 6.75 15H13.25C14.2165 15 15 14.2165 15 13.25V4.75C15 3.7835 14.2165 3 13.25 3H6.75ZM6.25 4.75C6.25 4.47386 6.47386 4.25 6.75 4.25H13.25C13.5261 4.25 13.75 4.47386 13.75 4.75V13.25C13.75 13.5261 13.5261 13.75 13.25 13.75H6.75C6.47386 13.75 6.25 13.5261 6.25 13.25V4.75ZM3.25 6.75H4.5V15.5C4.5 15.7761 4.72386 16 5 16H11.75V17.25H5C4.0335 17.25 3.25 16.4665 3.25 15.5V6.75Z" fill="currentColor"/></svg>`;

const DOWNLOAD_SVG = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.5C10.3452 2.5 10.625 2.77982 10.625 3.125V11.6161L13.3661 8.875L14.3839 9.89277L10 14.2767L5.61612 9.89277L6.63388 8.875L9.375 11.6161V3.125C9.375 2.77982 9.65482 2.5 10 2.5ZM3.125 16.25V14.375H4.375V16.25H15.625V14.375H16.875V16.25C16.875 16.9404 16.3154 17.5 15.625 17.5H4.375C3.68464 17.5 3.125 16.9404 3.125 16.25Z" fill="currentColor"/></svg>`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(s) {
  if (!s) return '';
  const parts = String(s).split('-');
  if (parts.length !== 3) return String(s);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(parts[2], 10)} ${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
}

function ensure(p) { fs.mkdirSync(p, { recursive: true }); }

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensure(dest);
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f);
    const d = path.join(dest, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ─── Read content — skip _versions/ subdirectories ───────────────────────────

function readContent(type) {
  const dir = path.join(CONTENT, type);
  if (!fs.existsSync(dir)) return [];
  const items = [];

  function walk(d, parts) {
    for (const f of fs.readdirSync(d).sort()) {
      if (f === '_versions') continue; // skip archived version files
      const full = path.join(d, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full, [...parts, f]);
      } else if (f.endsWith('.md')) {
        const slug  = f.replace(/\.md$/, '');
        const group = parts[parts.length - 1] || '';
        const raw   = fs.readFileSync(full, 'utf8');
        const { data, content } = matter(raw);
        items.push({ type, slug, group, data, content });
      }
    }
  }
  walk(dir, []);
  return items;
}

// ─── Markdown rendering ───────────────────────────────────────────────────────

function renderBody(md) {
  if (!md || !md.trim()) return '';
  let html = marked.parse(md);
  html = html.replace(/<table>/g, '<table class="cb-table">');
  html = html.replace(/<h2>/g, '<h2 class="cb-section-h2">');
  html = html.replace(/<h3>/g, '<h3 class="cb-section-h3">');
  return `<div class="cb-prose">\n${html}\n</div>`;
}

// ─── Page shell ───────────────────────────────────────────────────────────────

function htmlHead(title, desc, activeNav, rel) {
  const nav = [
    ['home',      rel + 'index.html',           'Home'],
    ['prompts',   rel + 'prompts/index.html',   'Prompts'],
    ['context',   rel + 'context/index.html',   'Context'],
    ['workflows', rel + 'workflows/index.html', 'Workflows'],
    ['skills',    rel + 'skills/index.html',    'Skills'],
    ['solutions', rel + 'solutions/index.html', 'Solutions'],
  ];
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} — CommBank iQ</title>
  <meta name="description" content="${esc(desc)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="${rel}assets/css/styles.css">
</head>
<body>
<header class="cb-top">
  <div class="cb-top-inner">
    <a href="${rel}index.html" class="cb-brand" aria-label="CommBank iQ home">${LOGO_SVG}</a>
    <nav class="cb-nav" aria-label="Primary">
      ${nav.map(([k,h,l]) => `<a href="${h}"${k===activeNav?' class="is-active"':''}>${l}</a>`).join('\n      ')}
    </nav>
    <div class="cb-top-right">
      <button class="cb-icon-btn" aria-label="Search">${SEARCH_SVG}</button>
    </div>
  </div>
</header>`;
}

function htmlFoot(rel) {
  return `\n<script src="${rel}assets/js/app.js"></script>\n</body>\n</html>`;
}

// ─── Sidebars ─────────────────────────────────────────────────────────────────

function solutionSidebar(all, currentSlug, currentVertical, rel) {
  const grouped = {};
  for (const item of all) (grouped[item.group] = grouped[item.group] || []).push(item);

  const verticalOrder = [...Object.keys(VERTICAL_LABELS), ...Object.keys(grouped).filter(v => !VERTICAL_LABELS[v])];
  const rows = [`
  <li><a class="cb-side-row" href="${rel}solutions/index.html"><span class="chev"></span><span class="lbl">All solutions</span><span class="cnt">${all.length}</span></a></li>`];

  const seen = new Set();
  for (const vertical of verticalOrder) {
    if (seen.has(vertical)) continue; seen.add(vertical);
    const items = grouped[vertical]; if (!items || !items.length) continue;
    const label = VERTICAL_LABELS[vertical] || vertical;
    const active = vertical === currentVertical;
    rows.push(`
  <li>
    <button class="cb-side-row${active?' is-active':''}" data-toggle="side-v-${vertical}" aria-expanded="${active}">
      <span class="chev">${CHEVRON}</span><span class="lbl">${esc(label)}</span><span class="cnt">${items.length}</span>
    </button>
    <div id="side-v-${vertical}" class="cb-side-children${active?' is-open':''}">
      ${items.map(it => `<a class="cb-side-child${it.slug===currentSlug?' is-active':''}" href="${rel}solutions/${it.group}/${it.slug}/index.html"><span class="child-lbl">${esc(it.data.title||it.slug)}</span></a>`).join('\n      ')}
    </div>
  </li>`);
  }

  return `<div class="cb-side-search">${SEARCH_SVG.replace('width="18" height="18"','width="14" height="14"')}<input type="search" placeholder="Search solution catalogue…" aria-label="Search solution catalogue"></div>
<div class="cb-side-eyebrow">Solution catalogue</div>
<ul class="cb-side-list">${rows.join('')}\n</ul>`;
}

function librarySidebar(type, all, currentSlug, currentGroup, rel) {
  const labels = { prompts:'Prompt library', context:'Context library', workflows:'Workflow library', skills:'Skills library' };
  const typeLabel = labels[type] || type;
  const grouped = {};
  for (const item of all) (grouped[item.group] = grouped[item.group] || []).push(item);

  const orderedGroups = [...INTENT_ORDER, ...Object.keys(grouped).filter(g => !INTENT_LABELS[g])];
  const rows = [`
  <li><a class="cb-side-row" href="${rel}${type}/index.html"><span class="chev"></span><span class="lbl">All ${type}</span><span class="cnt">${all.length}</span></a></li>`];

  for (const intent of orderedGroups) {
    const items = grouped[intent]; if (!items || !items.length) continue;
    const label = INTENT_LABELS[intent] || intent;
    const active = intent === currentGroup;
    rows.push(`
  <li>
    <button class="cb-side-row${active?' is-active':''}" data-toggle="side-${intent}" aria-expanded="${active}">
      <span class="chev">${CHEVRON}</span><span class="lbl">${esc(label)}</span><span class="cnt">${items.length}</span>
    </button>
    <div id="side-${intent}" class="cb-side-children${active?' is-open':''}">
      ${items.map(it => `<a class="cb-side-child${it.slug===currentSlug?' is-active':''}" href="${rel}${type}/${it.group}/${it.slug}/index.html"><span class="child-lbl">${esc(it.data.title||it.slug)}</span></a>`).join('\n      ')}
    </div>
  </li>`);
  }

  return `<div class="cb-side-search">${SEARCH_SVG.replace('width="18" height="18"','width="14" height="14"')}<input type="search" placeholder="Search ${typeLabel.toLowerCase()}…" aria-label="Search ${typeLabel.toLowerCase()}"></div>
<div class="cb-side-eyebrow">${esc(typeLabel)}</div>
<ul class="cb-side-list">${rows.join('')}\n</ul>`;
}

// ─── Reusable fragments ───────────────────────────────────────────────────────

function downloadCard(filename, description) {
  if (!filename) return '';
  return `
<div style="border:1px solid var(--shade-15);border-radius:14px;padding:18px 20px;display:flex;align-items:center;gap:16px;margin-top:24px;background:#fff;flex-wrap:wrap;">
  <div style="width:48px;height:48px;border-radius:12px;background:var(--shade-05);display:inline-flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;font-weight:600;color:var(--shade-60);flex:none;">.MD</div>
  <div style="flex:1;min-width:0;">
    <div style="font-weight:600;font-size:14px;">${esc(filename)}</div>
    <div style="font-size:12px;color:var(--shade-60);margin-top:2px;">${esc(description||'')}</div>
  </div>
  <button class="cb-btn cb-btn-light">Copy raw</button>
  <button class="cb-btn cb-btn-dark">Download .md</button>
</div>`;
}

function autoNotice(contentPath) {
  return `
<div style="margin-top:32px;padding:14px 16px;background:var(--shade-05);border-radius:10px;font-size:12px;color:var(--shade-70);border:1px solid var(--shade-10);">
  This page is auto-generated from source markdown on every push to main. Edit <code style="font-family:var(--mono);font-size:11px;background:#fff;padding:2px 6px;border-radius:4px;">${esc(contentPath)}</code> in the repo — do not edit this HTML.
</div>`;
}

function versionAccordion(versions, type) {
  if (!versions || !versions.length) return '';
  return versions.map((v, i) => {
    const latest = i === 0;
    const safeId = `v-body-${String(v.version||i).replace(/[^a-z0-9]/gi,'-')}`;
    let body = '';
    if (type === 'prompts' && v.body) {
      body = `
    <div class="cb-acc-body">
      <div class="cb-prompt-block" style="margin:0;">
        <div class="cb-code-toolbar">
          <span class="cb-tag cb-tag-version">${esc(v.version)}</span>
          <div style="display:flex;gap:8px;">
            <button class="cb-btn cb-btn-light" style="padding:7px 14px;">${DOWNLOAD_SVG} Download .md</button>
            <button class="cb-btn cb-btn-dark" style="padding:7px 14px;" data-copy="${safeId}">${COPY_SVG} Copy prompt</button>
          </div>
        </div>
        <pre class="cb-code" id="${safeId}">${esc(v.body)}</pre>
      </div>
    </div>`;
    } else if (v.filename) {
      body = `
    <div class="cb-acc-body">
      <div style="display:flex;align-items:center;gap:16px;padding:14px 16px;border:1px solid var(--shade-10);border-radius:10px;background:#fff;flex-wrap:wrap;">
        <div style="width:40px;height:40px;border-radius:10px;background:var(--shade-05);display:inline-flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:600;color:var(--shade-60);flex:none;">.MD</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:13px;">${esc(v.filename)}</div>
          <div style="font-size:12px;color:var(--shade-60);margin-top:2px;">${esc(v.filesize||'')} · archived source</div>
        </div>
        <button class="cb-btn cb-btn-light">Copy raw</button>
        <button class="cb-btn cb-btn-dark">Download .md</button>
      </div>
    </div>`;
    }
    return `
  <div class="cb-acc">
    <button class="cb-acc-head">
      <span class="v">${esc(v.version)}${latest?' <span style="margin-left:8px;font-size:10px;font-weight:500;color:var(--shade-60);">LATEST</span>':''}</span>
      <span class="d">${esc(formatDate(v.date))}</span>
      <span class="summary">${esc(v.summary||'')}</span>
      <span class="who">${esc(v.author||'')}</span>
      <span class="chev">${CHEVRON}</span>
    </button>${body}
  </div>`;
  }).join('\n');
}

// ─── Detail page builders ─────────────────────────────────────────────────────

function buildSolutionPage(item, all) {
  const { data, content, slug, group: vertical } = item;
  const rel   = '../../../';
  const title = data.title || slug;
  const vLabel = VERTICAL_LABELS[vertical] || vertical;
  const links = [
    data.loe_url    ? `<a href="${esc(data.loe_url)}" target="_blank" rel="noopener">Standard LOE</a>` : null,
    data.sop_url    ? `<a href="${esc(data.sop_url)}" target="_blank" rel="noopener">SOP</a>` : null,
    data.github_url ? `<a href="${esc(data.github_url)}" target="_blank" rel="noopener">GitHub repo</a>` : null,
  ].filter(Boolean);

  const html = [
    htmlHead(`${title} — ${vLabel} — Solution Catalogue`, data.description||'', 'solutions', rel),
    `<div class="cb-shell"><aside class="cb-shell-side">`, solutionSidebar(all, slug, vertical, rel), `</aside>`,
    `<main class="cb-shell-main" style="max-width:840px">`,
    `<nav class="cb-breadcrumb" aria-label="Breadcrumb"><a href="${rel}index.html">CommBank iQ</a><span class="sep">/</span><a href="${rel}solutions/index.html">Solution Catalogue</a><span class="sep">/</span><span class="current">${esc(title)}</span></nav>`,
    `<p class="cb-eyebrow">Solution · ${esc(vLabel)}</p>`,
    `<h1 class="cb-page-title">${esc(title)}</h1>`,
    data.description ? `<p class="cb-page-lede">${esc(data.description)}</p>` : '',
    `<div class="cb-meta-row" style="margin-top:18px;">`,
    `  <span>Commercial · ${esc(data.commercial_owner||'—')}</span><span class="dot">·</span>`,
    `  <span>Technical · ${esc(data.technical_owner||'—')}</span><span class="dot">·</span>`,
    `  <span>v${esc(data.version||'0.1')} · ${esc(formatDate(data.updated))}</span>`,
    links.length ? `<span class="dot">·</span><span style="display:flex;gap:12px;flex-wrap:wrap;">${links.join(' ')}</span>` : '',
    `</div>`,
    `<div style="margin-top:10px;"><span class="cb-tag${data.status==='Established'?' cb-tag-green':' cb-tag-blue'}">${esc(data.status||'Established')}</span></div>`,
    downloadCard(data.filename, `Source markdown · ${data.filesize||''} · paste into any AI chat for Q&A or drafting`),
    renderBody(content),
    data.versions && data.versions.length ? `<h2 class="cb-section-h2">Version history</h2><p style="color:var(--shade-70);font-size:13px;max-width:62ch;margin:0 0 14px;">Every change is captured here.</p>${versionAccordion(data.versions,'solution')}` : '',
    autoNotice(`content/solutions/${vertical}/${slug}.md`),
    `</main></div>`,
    htmlFoot(rel),
  ].join('\n');

  const out = path.join(SITE, 'solutions', vertical, slug, 'index.html');
  ensure(path.dirname(out));
  fs.writeFileSync(out, html, 'utf8');
  console.log(`  ✓  solutions/${vertical}/${slug}/index.html`);

  // Copy _versions/ if it exists
  const versionsDir = path.join(CONTENT, 'solutions', vertical, '_versions');
  if (fs.existsSync(versionsDir)) copyDir(versionsDir, path.join(SITE, 'solutions', vertical, '_versions'));
}

function buildPromptPage(item, all) {
  const { data, content, slug, group: intent } = item;
  const rel     = '../../../';
  const title   = data.title || slug;
  const iLabel  = INTENT_LABELS[intent] || intent;
  const latest  = (data.versions||[])[0] || {};
  const promptId = `prompt-body-${String(latest.version||'v1').replace(/[^a-z0-9]/gi,'-')}`;

  const attachHtml = (data.attachments||[]).length ? `
<h2 class="cb-section-h2">Attachments &amp; context</h2>
<div class="cb-prose"><ul>${(data.attachments||[]).map(a=>`<li><strong>${esc(a.type==='context'?'Context file':a.type==='workflow'?'Related workflow':'Related prompt')}:</strong> <a href="${esc(a.url||'#')}">${esc(a.title)}</a></li>`).join('')}</ul></div>` : '';

  const html = [
    htmlHead(`${title} — Prompt Library`, data.description||'', 'prompts', rel),
    `<div class="cb-shell"><aside class="cb-shell-side">`, librarySidebar('prompts', all, slug, intent, rel), `</aside>`,
    `<main class="cb-shell-main" style="max-width:840px">`,
    `<nav class="cb-breadcrumb" aria-label="Breadcrumb"><a href="${rel}index.html">CommBank iQ</a><span class="sep">/</span><a href="${rel}prompts/index.html">Prompt Library</a><span class="sep">/</span><span class="current">${esc(title)}</span></nav>`,
    `<p class="cb-eyebrow">Prompt · ${esc(iLabel)}</p>`,
    `<h1 class="cb-page-title">${esc(title)}</h1>`,
    data.description ? `<p class="cb-page-lede">${esc(data.description)}</p>` : '',
    `<div class="cb-meta-row" style="margin-top:18px;"><span>Owner · ${esc(data.owner||'—')}</span><span class="dot">·</span><span>Latest ${esc(data.version||'')} · ${esc(formatDate(data.updated))}</span>${data.copy_count?`<span class="dot">·</span><span>Copied ${esc(String(data.copy_count))} times</span>`:''}</div>`,
    `<div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap;">`,
    `  <button class="cb-btn cb-btn-dark" data-copy="${promptId}">${COPY_SVG} Copy latest prompt</button>`,
    `  <button class="cb-btn cb-btn-light">${DOWNLOAD_SVG} Download as .md</button>`,
    `</div>`,
    renderBody(content),
    attachHtml,
    latest.body ? `<h2 class="cb-section-h2">Latest prompt</h2>
<div class="cb-prompt-block">
  <div class="cb-code-toolbar">
    <div style="display:flex;align-items:center;gap:10px;"><span class="cb-tag cb-tag-version">${esc(latest.version||'')} · LATEST</span><span style="font-size:12px;color:var(--shade-60);">${esc(formatDate(latest.date))} · ${esc(latest.author||'')}</span></div>
    <div style="display:flex;gap:8px;"><button class="cb-btn cb-btn-light" style="padding:7px 14px;">${DOWNLOAD_SVG} Download .md</button><button class="cb-btn cb-btn-dark" style="padding:7px 14px;" data-copy="${promptId}">${COPY_SVG} Copy prompt</button></div>
  </div>
  <pre class="cb-code" id="${promptId}">${esc(latest.body)}</pre>
</div>` : '',
    data.versions && data.versions.length ? `<h2 class="cb-section-h2">Version history</h2><p style="color:var(--shade-70);font-size:13px;max-width:62ch;margin:0 0 14px;">Expand a version to view and copy that specific prompt.</p>${versionAccordion(data.versions,'prompts')}` : '',
    `</main></div>`,
    htmlFoot(rel),
  ].join('\n');

  const out = path.join(SITE, 'prompts', intent, slug, 'index.html');
  ensure(path.dirname(out));
  fs.writeFileSync(out, html, 'utf8');
  console.log(`  ✓  prompts/${intent}/${slug}/index.html`);
}

function buildContextPage(item, all) {
  const { data, content, slug, group: intent } = item;
  const rel    = '../../../';
  const title  = data.title || slug;
  const iLabel = INTENT_LABELS[intent] || intent;

  const html = [
    htmlHead(`${title} — Context Library`, data.description||'', 'context', rel),
    `<div class="cb-shell"><aside class="cb-shell-side">`, librarySidebar('context', all, slug, intent, rel), `</aside>`,
    `<main class="cb-shell-main" style="max-width:840px">`,
    `<nav class="cb-breadcrumb" aria-label="Breadcrumb"><a href="${rel}index.html">CommBank iQ</a><span class="sep">/</span><a href="${rel}context/index.html">Context Library</a><span class="sep">/</span><span class="current">${esc(title)}</span></nav>`,
    `<p class="cb-eyebrow">Context file · ${esc(iLabel)}</p>`,
    `<h1 class="cb-page-title">${esc(title)}</h1>`,
    data.description ? `<p class="cb-page-lede">${esc(data.description)}</p>` : '',
    `<div class="cb-meta-row" style="margin-top:18px;"><span>Owner · ${esc(data.owner||'—')}</span><span class="dot">·</span><span>Latest ${esc(data.version||'')} · ${esc(formatDate(data.updated))}</span></div>`,
    downloadCard(data.filename, `Source markdown · ${data.filesize||''} · upload to Claude Projects, ChatGPT Projects, or paste into any AI chat`),
    renderBody(content),
    data.versions && data.versions.length ? `<h2 class="cb-section-h2">Version history</h2><p style="color:var(--shade-70);font-size:13px;max-width:62ch;margin:0 0 14px;">Each archived version is downloadable as a separate file.</p>${versionAccordion(data.versions,'context')}` : '',
    autoNotice(`content/context/${intent}/${slug}.md`),
    `</main></div>`,
    htmlFoot(rel),
  ].join('\n');

  const out = path.join(SITE, 'context', intent, slug, 'index.html');
  ensure(path.dirname(out));
  fs.writeFileSync(out, html, 'utf8');
  console.log(`  ✓  context/${intent}/${slug}/index.html`);

  const versionsDir = path.join(CONTENT, 'context', intent, '_versions');
  if (fs.existsSync(versionsDir)) copyDir(versionsDir, path.join(SITE, 'context', intent, '_versions'));
}

function buildWorkflowPage(item, all) {
  const { data, content, slug, group: intent } = item;
  const rel    = '../../../';
  const title  = data.title || slug;
  const iLabel = INTENT_LABELS[intent] || intent;

  const html = [
    htmlHead(`${title} — Workflow Library`, data.description||'', 'workflows', rel),
    `<div class="cb-shell"><aside class="cb-shell-side">`, librarySidebar('workflows', all, slug, intent, rel), `</aside>`,
    `<main class="cb-shell-main" style="max-width:840px">`,
    `<nav class="cb-breadcrumb" aria-label="Breadcrumb"><a href="${rel}index.html">CommBank iQ</a><span class="sep">/</span><a href="${rel}workflows/index.html">Workflow Library</a><span class="sep">/</span><span class="current">${esc(title)}</span></nav>`,
    `<p class="cb-eyebrow">Workflow · ${esc(iLabel)}</p>`,
    `<h1 class="cb-page-title">${esc(title)}</h1>`,
    data.description ? `<p class="cb-page-lede">${esc(data.description)}</p>` : '',
    `<div class="cb-meta-row" style="margin-top:18px;"><span>Owner · ${esc(data.owner||'—')}</span><span class="dot">·</span><span>Latest ${esc(data.version||'')} · ${esc(formatDate(data.updated))}</span></div>`,
    downloadCard(data.filename, `Reference guide · ${data.filesize||''}`),
    renderBody(content),
    data.versions && data.versions.length ? `<h2 class="cb-section-h2">Version history</h2>${versionAccordion(data.versions,'workflow')}` : '',
    autoNotice(`content/workflows/${intent}/${slug}.md`),
    `</main></div>`,
    htmlFoot(rel),
  ].join('\n');

  const out = path.join(SITE, 'workflows', intent, slug, 'index.html');
  ensure(path.dirname(out));
  fs.writeFileSync(out, html, 'utf8');
  console.log(`  ✓  workflows/${intent}/${slug}/index.html`);
}

// ─── Catalogue card ───────────────────────────────────────────────────────────

function catalogueCard(item, type) {
  const { data, slug, group } = item;
  const title   = data.title || slug;
  const eyebrow = type==='solutions' ? (VERTICAL_LABELS[group]||group) : (INTENT_LABELS[group]||group);
  const viewHref = `${group}/${slug}/index.html`;
  const actionBtn = type === 'prompts'
    ? `<button class="cb-card-actionbtn is-primary" data-copy-text="${esc(title)}">${COPY_SVG} Copy</button><a class="cb-card-actionbtn" href="${viewHref}">View</a>`
    : `<a class="cb-card-actionbtn is-primary" href="${viewHref}">View</a>`;

  return `
        <div class="cb-card">
          <p class="cb-card-eyebrow">${esc(eyebrow)}</p>
          <h4>${esc(title)}</h4>
          <p class="cb-card-desc">${esc(data.description||'Content migrating from Confluence.')}</p>
          <div class="cb-card-foot">
            <span class="meta">${esc(data.version||'v0.1')} · ${esc(formatDate(data.updated))}</span>
            <div class="actions">${actionBtn}</div>
          </div>
        </div>`;
}

// ─── Index pages ──────────────────────────────────────────────────────────────

function buildSolutionsIndex(all) {
  const rel = '../';
  const grouped = {};
  for (const item of all) (grouped[item.group] = grouped[item.group]||[]).push(item);
  const verticals = [...Object.keys(VERTICAL_LABELS), ...Object.keys(grouped).filter(v=>!VERTICAL_LABELS[v])];
  let sections = '';
  for (const v of verticals) {
    const items = grouped[v]; if (!items||!items.length) continue;
    const label = VERTICAL_LABELS[v]||v;
    sections += `<section id="${v}" style="margin-top:40px;"><div class="intent-heading"><h2>${esc(label)}</h2><span class="cnt">${items.length}</span></div><div class="cb-card-grid">${items.map(i=>catalogueCard(i,'solutions')).join('')}</div></section>`;
  }
  const html = [
    htmlHead('Solution Catalogue — CommBank iQ','Browse CommBank iQ data solutions by vertical.','solutions',rel),
    `<div class="cb-shell"><aside class="cb-shell-side">`,solutionSidebar(all,null,null,rel),`</aside>`,
    `<main class="cb-shell-main"><nav class="cb-breadcrumb"><a href="${rel}index.html">CommBank iQ</a><span class="sep">/</span><span class="current">Solution Catalogue</span></nav>`,
    `<h1 class="cb-page-title">Solution Catalogue</h1><p class="cb-page-lede">Browse CommBank iQ data solutions — downloadable as markdown for AI ingestion or human reference.</p>`,
    `<div class="cb-stats-row" style="margin-top:16px;"><span class="cb-tag">${all.length} solutions</span><span class="cb-tag">${Object.keys(grouped).length} verticals</span></div>`,
    sections, `</main></div>`, htmlFoot(rel),
  ].join('\n');
  const out = path.join(SITE,'solutions','index.html'); ensure(path.dirname(out));
  fs.writeFileSync(out, html, 'utf8'); console.log('  ✓  solutions/index.html');
}

function buildLibraryIndex(type, all) {
  const rel = '../';
  const labels = { prompts:'Prompt Library', context:'Context Library', workflows:'Workflow Library', skills:'Skills Library' };
  const ledes = {
    prompts: 'Reusable AI prompts organised by what you are trying to do. Copy, adapt and iterate.',
    context: 'Structured context files to upload to your AI tool for better, more consistent outputs.',
    workflows: 'Step-by-step guides for completing recurring tasks with AI tools.',
  };
  const typeLabel = labels[type]||type;
  const lede = ledes[type]||'';
  const grouped = {};
  for (const item of all) (grouped[item.group] = grouped[item.group]||[]).push(item);
  let sections = '';
  for (const intent of [...INTENT_ORDER, ...Object.keys(grouped).filter(g=>!INTENT_LABELS[g])]) {
    const items = grouped[intent]; if (!items||!items.length) continue;
    const label = INTENT_LABELS[intent]||intent;
    sections += `<section id="${intent}" style="margin-top:40px;"><div class="intent-heading"><h2>${esc(label)}</h2><span class="cnt">${items.length}</span></div><div class="cb-card-grid">${items.map(i=>catalogueCard(i,type)).join('')}</div></section>`;
  }
  const html = [
    htmlHead(`${typeLabel} — CommBank iQ`, lede, type, rel),
    `<div class="cb-shell"><aside class="cb-shell-side">`,librarySidebar(type,all,null,null,rel),`</aside>`,
    `<main class="cb-shell-main"><nav class="cb-breadcrumb"><a href="${rel}index.html">CommBank iQ</a><span class="sep">/</span><span class="current">${esc(typeLabel)}</span></nav>`,
    `<h1 class="cb-page-title">${esc(typeLabel)}</h1>`,
    lede ? `<p class="cb-page-lede">${esc(lede)}</p>` : '',
    `<div class="cb-stats-row" style="margin-top:16px;"><span class="cb-tag">${all.length} ${type}</span><span class="cb-tag">${Object.keys(grouped).length} categories</span></div>`,
    sections, `</main></div>`, htmlFoot(rel),
  ].join('\n');
  const out = path.join(SITE, type, 'index.html'); ensure(path.dirname(out));
  fs.writeFileSync(out, html, 'utf8'); console.log(`  ✓  ${type}/index.html`);
}

// ─── Search index ─────────────────────────────────────────────────────────────

function buildSearchIndex(allSolutions, allPrompts, allContext, allWorkflows) {
  const records = [
    ...allSolutions.map(i => ({ id:`solutions/${i.group}/${i.slug}`, type:'solution', title:i.data.title||i.slug, group:i.group, description:i.data.description||'', url:`/solutions/${i.group}/${i.slug}/` })),
    ...allPrompts.map(i => ({ id:`prompts/${i.group}/${i.slug}`, type:'prompt', title:i.data.title||i.slug, group:i.group, description:i.data.description||'', body:(i.data.versions&&i.data.versions[0]&&i.data.versions[0].body)||'', url:`/prompts/${i.group}/${i.slug}/` })),
    ...allContext.map(i => ({ id:`context/${i.group}/${i.slug}`, type:'context', title:i.data.title||i.slug, group:i.group, description:i.data.description||'', url:`/context/${i.group}/${i.slug}/` })),
    ...allWorkflows.map(i => ({ id:`workflows/${i.group}/${i.slug}`, type:'workflow', title:i.data.title||i.slug, group:i.group, description:i.data.description||'', url:`/workflows/${i.group}/${i.slug}/` })),
  ];
  fs.writeFileSync(path.join(SITE,'search-index.json'), JSON.stringify(records, null, 2), 'utf8');
  console.log(`  ✓  search-index.json (${records.length} records)`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('\nCBAiQ Libraries — build\n');

  // Prepare output directory
  ensure(SITE);
  copyDir(ASSETS, path.join(SITE, 'assets'));
  fs.copyFileSync(path.join(ROOT, 'index.html'), path.join(SITE, 'index.html'));
  console.log('  ✓  assets/ copied');
  console.log('  ✓  index.html copied\n');

  const allSolutions = readContent('solutions');
  const allPrompts   = readContent('prompts');
  const allContext   = readContent('context');
  const allWorkflows = readContent('workflows');
  console.log(`Content: ${allSolutions.length} solutions, ${allPrompts.length} prompts, ${allContext.length} context files, ${allWorkflows.length} workflows\n`);

  console.log('Building solution pages…');
  for (const item of allSolutions) buildSolutionPage(item, allSolutions);

  console.log('\nBuilding prompt pages…');
  for (const item of allPrompts) buildPromptPage(item, allPrompts);

  console.log('\nBuilding context pages…');
  for (const item of allContext) buildContextPage(item, allContext);

  console.log('\nBuilding workflow pages…');
  for (const item of allWorkflows) buildWorkflowPage(item, allWorkflows);

  console.log('\nBuilding index pages…');
  buildSolutionsIndex(allSolutions);
  buildLibraryIndex('prompts',   allPrompts);
  buildLibraryIndex('context',   allContext);
  buildLibraryIndex('workflows', allWorkflows);

  console.log('\nBuilding search index…');
  buildSearchIndex(allSolutions, allPrompts, allContext, allWorkflows);

  const total = allSolutions.length + allPrompts.length + allContext.length + allWorkflows.length + 6;
  console.log(`\nDone — ${total} files written to site/\n`);
}

main();
