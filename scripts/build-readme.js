#!/usr/bin/env node
/**
 * Regenerates the "Available plugins" table in README.md from
 * .claude-plugin/marketplace.json. Idempotent.
 *
 *   node scripts/build-readme.js
 *
 * The web catalog at https://code.robworks.info/plugins/ is built and
 * served from a separate repo (ringo380/robworks-code) that fetches
 * marketplace.json from this repo at runtime — no cross-repo build
 * needed when this catalog changes.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MARKETPLACE_PATH = path.join(ROOT, ".claude-plugin", "marketplace.json");
const README_PATH = path.join(ROOT, "README.md");

function escapeMdPipe(s) {
  return String(s ?? "").replace(/\|/g, "\\|");
}

function refUrl(plugin) {
  const repo = plugin.source?.repo;
  if (!repo) return null;
  if (plugin.source?.sha) return `https://github.com/${repo}/commit/${plugin.source.sha}`;
  if (plugin.source?.ref) return `https://github.com/${repo}/releases/tag/${plugin.source.ref}`;
  return null;
}

function refLabel(plugin) {
  if (plugin.source?.ref) return plugin.source.ref;
  if (plugin.source?.sha) return plugin.source.sha.slice(0, 7);
  return null;
}

function repoUrl(plugin) {
  return plugin.source?.repo ? `https://github.com/${plugin.source.repo}` : plugin.repository || "";
}

function renderMarkdownTable(plugins) {
  const lines = [];
  lines.push("| Plugin | Category | Description | Pinned | Source |");
  lines.push("| --- | --- | --- | --- | --- |");
  for (const p of plugins) {
    const name = `[\`${p.name}\`](${repoUrl(p)})`;
    const cat = p.category || "";
    const desc = escapeMdPipe(p.description || "");
    const rl = refLabel(p);
    const ru = refUrl(p);
    const pin = rl ? (ru ? `[\`${rl}\`](${ru})` : `\`${rl}\``) : "_default branch_";
    const repoShort = p.source?.repo ? `[${p.source.repo}](${repoUrl(p)})` : "";
    lines.push(`| ${name} | ${cat} | ${desc} | ${pin} | ${repoShort} |`);
  }
  return lines.join("\n");
}

function replaceBetween(content, beginMarker, endMarker, replacement) {
  const begin = content.indexOf(beginMarker);
  const end = content.indexOf(endMarker);
  if (begin === -1 || end === -1 || end < begin) {
    throw new Error(`Sentinels not found: ${beginMarker} / ${endMarker}`);
  }
  const before = content.slice(0, begin + beginMarker.length);
  const after = content.slice(end);
  return `${before}\n${replacement}\n${after}`;
}

function main() {
  const marketplace = JSON.parse(fs.readFileSync(MARKETPLACE_PATH, "utf8"));
  const plugins = Array.isArray(marketplace.plugins) ? marketplace.plugins : [];
  let readme = fs.readFileSync(README_PATH, "utf8");
  const table = renderMarkdownTable(plugins);
  readme = replaceBetween(readme, "<!-- BEGIN:PLUGINS-TABLE -->", "<!-- END:PLUGINS-TABLE -->", table);
  fs.writeFileSync(README_PATH, readme);
  console.log(`✓ README.md — rewrote plugin table (${plugins.length} rows)`);
}

main();
