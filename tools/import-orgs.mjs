// Pulls every student organization from TechConnect (Texas Tech's Engage site)
// and writes orgs-data.js for the website.
//
// Run on your own computer (Node 18 or newer):
//   node tools/import-orgs.mjs
//
// Options (environment variables):
//   NO_DETAIL=1   skip the per-org detail request (faster, fewer social links)
//   ENGAGE_BASE   override the site address (used for testing)
import { writeFile } from "node:fs/promises";

const BASE = process.env.ENGAGE_BASE || "https://ttu.campuslabs.com";
const OUT = new URL("../orgs-data.js", import.meta.url);
const PAGE = 100;
const WITH_DETAIL = !process.env.NO_DETAIL;
const CONCURRENCY = 4;

async function getJSON(url, tries = 3) {
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      if (i === tries) throw new Error(url + " failed: " + e.message);
      await new Promise(r => setTimeout(r, 400 * i));
    }
  }
}

function plain(html) {
  return String(html || "")
    .replace(/<\s*br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
}

const SOCIAL = [
  ["instagram", /instagram\.com/i], ["x", /(^|\.)(x|twitter)\.com/i], ["facebook", /facebook\.com|fb\.com/i],
  ["tiktok", /tiktok\.com/i], ["youtube", /youtube\.com|youtu\.be/i], ["linkedin", /linkedin\.com/i],
  ["linktree", /linktr\.ee|linktree/i], ["discord", /discord\.(gg|com)/i], ["groupme", /groupme\.com/i]
];
function classify(url, out) {
  let host;
  try { host = new URL(url).hostname; } catch { return; }
  if (/campuslabs\.com$/i.test(host)) return;
  for (const [k, re] of SOCIAL) if (re.test(host)) { out.social[k] = out.social[k] || url; return; }
  out.website = out.website || url;
}
function collectUrls(value, out, depth = 0) {
  if (depth > 4 || value == null) return;
  if (typeof value === "string") {
    const found = value.match(/https?:\/\/[^\s"'<>)]+/g);
    if (found) found.forEach(u => classify(u.replace(/[.,;]+$/, ""), out));
  } else if (Array.isArray(value)) value.forEach(v => collectUrls(v, out, depth + 1));
  else if (typeof value === "object") Object.values(value).forEach(v => collectUrls(v, out, depth + 1));
}

function pick(text, re, max = 2) {
  const sentences = text.replace(/\n/g, " ").split(/(?<=[.!?])\s+/);
  const hits = sentences.filter(s => re.test(s)).slice(0, max).map(s => s.trim().slice(0, 240));
  return hits.length ? hits.join(" ") : null;
}
const RE_DUES = /\b(dues|membership fee|semester fee|annual fee|fees?)\b|\$\s?\d/i;
const RE_JOIN = /\b(to join|how to join|apply|application|interview|audition|try-?outs?|gpa|open to (all|any|everyone)|all majors|all students|anyone can|no experience|membership)\b/i;
const RE_OPP = /\b(opportunit|scholarship|network|intern|volunteer|competit|conference|travel|leadership|service|mentor|workshop|speaker|career|tournament|trip)\w*/i;

function normalize(item, detail) {
  const d = detail || {};
  const key = item.WebsiteKey || d.WebsiteKey || "";
  const descText = plain(d.Description || item.Description);
  const summary = plain(item.Summary || d.Summary) || descText.slice(0, 220);
  const links = { social: {}, website: null };
  collectUrls(d, links);
  collectUrls(item.Description, links);
  return {
    name: item.Name || d.Name,
    key,
    categories: item.CategoryNames || d.CategoryNames || [],
    summary: summary.slice(0, 320),
    about: descText.slice(0, 900),
    join: pick(descText, RE_JOIN),
    dues: pick(descText, RE_DUES, 1),
    opportunities: pick(descText, RE_OPP, 2),
    url: key ? `${BASE}/engage/organization/${key}` : null,
    website: links.website,
    social: links.social,
    email: d.Email || (d.ContactInfo && d.ContactInfo.Email) || null
  };
}

async function main() {
  const items = [];
  for (let skip = 0; ; skip += PAGE) {
    const q = `${BASE}/engage/api/discovery/search/organizations?orderBy%5B0%5D=UpperName%20asc&top=${PAGE}&skip=${skip}&query=&filter=`;
    const data = await getJSON(q);
    const batch = data.value || [];
    items.push(...batch);
    process.stdout.write(`\rListed ${items.length}${data["@odata.count"] ? " of " + data["@odata.count"] : ""}   `);
    if (batch.length < PAGE) break;
  }
  console.log();
  if (!items.length) throw new Error("No organizations returned. The API may have changed.");

  const orgs = new Array(items.length);
  let next = 0, done = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      let detail = null;
      if (WITH_DETAIL && items[i].WebsiteKey) {
        try { detail = await getJSON(`${BASE}/engage/api/discovery/organization/bykey/${encodeURIComponent(items[i].WebsiteKey)}`, 2); }
        catch { /* keep list data only */ }
      }
      orgs[i] = normalize(items[i], detail);
      process.stdout.write(`\rDetails ${++done}/${items.length}   `);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log();

  const body = `// Generated by tools/import-orgs.mjs on ${new Date().toISOString()}\nwindow.ORGS_UPDATED=${JSON.stringify(new Date().toISOString().slice(0, 10))};\nwindow.ORGS=${JSON.stringify(orgs.filter(o => o && o.name))};\n`;
  await writeFile(OUT, body);
  console.log(`Wrote ${orgs.length} organizations to orgs-data.js`);
}
main().catch(e => { console.error("\n" + e.message); process.exit(1); });
