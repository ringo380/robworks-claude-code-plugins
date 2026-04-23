#!/usr/bin/env node
/**
 * Regenerates sentinel-bounded regions from .claude-plugin/marketplace.json:
 *   - docs/index.html  <!-- BEGIN:PLUGIN-CARDS --> / <!-- END:PLUGIN-CARDS -->
 *   - docs/index.html  <!-- BEGIN:JSONLD --> / <!-- END:JSONLD -->
 *   - docs/sitemap.xml <lastmod> field
 *   - README.md        <!-- BEGIN:PLUGINS-TABLE --> / <!-- END:PLUGINS-TABLE -->
 *
 * Idempotent: a second run produces zero diff. Run manually before committing
 * any change to marketplace.json.
 *
 *   node scripts/build-site.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MARKETPLACE_PATH = path.join(ROOT, ".claude-plugin", "marketplace.json");
const INDEX_PATH = path.join(ROOT, "docs", "index.html");
const SITEMAP_PATH = path.join(ROOT, "docs", "sitemap.xml");
const README_PATH = path.join(ROOT, "README.md");

const MARKETPLACE_NAME = "robworks-claude-code-plugins";
const SITE_URL = "https://code.robworks.info";

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

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

function operatingSystemFor(plugin) {
  const tags = Array.isArray(plugin.tags) ? plugin.tags.map((t) => t.toLowerCase()) : [];
  if (tags.includes("macos") && !tags.includes("linux") && !tags.includes("windows")) return "macOS";
  return "macOS, Linux, Windows";
}

function renderCard(plugin) {
  const installCmd = `claude plugin install ${plugin.name}@${MARKETPLACE_NAME}`;
  const tags = Array.isArray(plugin.tags) ? plugin.tags : [];
  const rl = refLabel(plugin);
  const ru = refUrl(plugin);
  const rp = repoUrl(plugin);

  const lines = [];
  lines.push(`          <article class="card" id="plugin-${escapeHtml(plugin.name)}">`);
  lines.push(`            <div class="card-header">`);
  lines.push(`              <h3>${escapeHtml(plugin.name)}</h3>`);
  if (plugin.category) {
    lines.push(`              <span class="badge">${escapeHtml(plugin.category)}</span>`);
  }
  lines.push(`            </div>`);
  if (plugin.description) {
    lines.push(`            <p class="description">${escapeHtml(plugin.description)}</p>`);
  }
  if (tags.length) {
    lines.push(`            <div class="tags">`);
    for (const t of tags) {
      lines.push(`              <span class="tag">${escapeHtml(t)}</span>`);
    }
    lines.push(`            </div>`);
  }
  lines.push(`            <div class="install">`);
  lines.push(`              <code>${escapeHtml(installCmd)}</code>`);
  lines.push(`              <button class="copy-btn" data-copy="${escapeHtml(installCmd)}">Copy</button>`);
  lines.push(`            </div>`);
  lines.push(`            <div class="card-footer">`);
  if (rl) {
    const verInner = ru
      ? `<a href="${escapeHtml(ru)}">${escapeHtml(rl)}</a>`
      : escapeHtml(rl);
    lines.push(`              <span class="pinned">Pinned: ${verInner}</span>`);
  } else {
    lines.push(`              <span class="pinned">tracks default branch</span>`);
  }
  if (rp) {
    lines.push(`              <a class="repo-link" href="${escapeHtml(rp)}">Source →</a>`);
  }
  lines.push(`            </div>`);
  lines.push(`          </article>`);
  return lines.join("\n");
}

function renderJsonLd(plugins) {
  const softwareNodes = plugins.map((p) => {
    const tags = Array.isArray(p.tags) ? p.tags.slice() : [];
    const keywords = Array.from(new Set([...tags, "claude-code", "plugin"])).join(", ");
    return {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#sw-${p.name}`,
      "name": p.name,
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "Claude Code plugin",
      "operatingSystem": operatingSystemFor(p),
      "description": p.description || "",
      "softwareVersion": (p.source?.ref || "").replace(/^v/, "") || undefined,
      "license": "https://opensource.org/licenses/MIT",
      "url": repoUrl(p),
      "codeRepository": repoUrl(p),
      "downloadUrl": refUrl(p) || undefined,
      "keywords": keywords,
      "author": { "@id": "https://robworks.info/#org" },
      "publisher": { "@id": "https://robworks.info/#org" },
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    };
  });

  const graph = [
    {
      "@type": "Organization",
      "@id": "https://robworks.info/#org",
      "name": "Robworks Software LLC",
      "url": "https://robworks.info",
      "founder": { "@type": "Person", "name": "Ryan Robson" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": `${SITE_URL}/`,
      "name": "Robworks Claude Code Plugins",
      "publisher": { "@id": "https://robworks.info/#org" },
      "inLanguage": "en-US",
    },
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/#page`,
      "url": `${SITE_URL}/`,
      "name": "Robworks Claude Code Plugins",
      "description":
        "A personal Claude Code plugin marketplace — MCP servers and developer-workflow plugins by Ryan Robson and Robworks Software LLC.",
      "inLanguage": "en-US",
      "isPartOf": { "@id": `${SITE_URL}/#website` },
      "publisher": { "@id": "https://robworks.info/#org" },
      "mainEntity": { "@id": `${SITE_URL}/#plugins` },
      "primaryImageOfPage": `${SITE_URL}/og-image.png`,
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#plugins`,
      "name": "Claude Code plugins by Robworks Software LLC",
      "numberOfItems": plugins.length,
      "itemListElement": plugins.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${SITE_URL}/#plugin-${p.name}`,
        "item": { "@id": `${SITE_URL}/#sw-${p.name}` },
      })),
    },
    ...softwareNodes,
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Claude Code plugin marketplace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A catalog of plugins — MCP servers, slash commands, agents, skills, and hooks — you can add to Claude Code in one command. Once added, you can discover and install any plugin from your terminal, and stay in sync with the latest pinned releases.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I install a plugin from this marketplace?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Run claude plugin marketplace add ringo380/robworks-claude-code-plugins once, then claude plugin install <name>@robworks-claude-code-plugins for any plugin listed on this page.",
          },
        },
        {
          "@type": "Question",
          "name": "What is an MCP server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "An MCP (Model Context Protocol) server exposes tools and resources to an LLM client like Claude Code. Every plugin on this page bundles an MCP server — invoke its tools from plain-language prompts in Claude Code, no custom client code required.",
          },
        },
        {
          "@type": "Question",
          "name": "Are these plugins free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Every plugin is MIT-licensed and free to install and use. Some need third-party credentials (a Namecheap API key, a Google Analytics property, a QuikGIF license) that you configure separately — the plugin never charges you.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I contribute a plugin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes — open an issue or PR at the source repository (github.com/ringo380/robworks-claude-code-plugins). See the Contributing a plugin section in the README for the criteria.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I pin a plugin to a specific version?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Each plugin entry in marketplace.json carries a ref (branch or tag) or sha (exact commit). Every plugin on this page is already pinned to a tagged release; see the Pinned link on each card for the exact version.",
          },
        },
      ],
    },
  ];

  const payload = { "@context": "https://schema.org", "@graph": graph };
  return JSON.stringify(payload, null, 2);
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

function today() {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const marketplace = JSON.parse(fs.readFileSync(MARKETPLACE_PATH, "utf8"));
  const plugins = Array.isArray(marketplace.plugins) ? marketplace.plugins : [];

  // --- docs/index.html: plugin cards + JSON-LD ---
  let html = fs.readFileSync(INDEX_PATH, "utf8");
  const cardsBlock = plugins.map(renderCard).join("\n\n");
  html = replaceBetween(html, "<!-- BEGIN:PLUGIN-CARDS -->", "<!-- END:PLUGIN-CARDS -->", cardsBlock);

  const jsonLd = renderJsonLd(plugins);
  const jsonLdBlock = `  <script type="application/ld+json">\n${jsonLd}\n  </script>`;
  html = replaceBetween(html, "<!-- BEGIN:JSONLD -->", "<!-- END:JSONLD -->", jsonLdBlock);

  fs.writeFileSync(INDEX_PATH, html);
  console.log(`✓ docs/index.html — rewrote ${plugins.length} plugin cards + JSON-LD`);

  // --- docs/sitemap.xml: lastmod only ---
  const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
  const updatedSitemap = sitemap.replace(
    /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/,
    `<lastmod>${today()}</lastmod>`
  );
  if (updatedSitemap !== sitemap) {
    fs.writeFileSync(SITEMAP_PATH, updatedSitemap);
    console.log(`✓ docs/sitemap.xml — lastmod → ${today()}`);
  } else {
    console.log(`· docs/sitemap.xml — lastmod already ${today()}`);
  }

  // --- README.md: plugin table ---
  let readme = fs.readFileSync(README_PATH, "utf8");
  const table = renderMarkdownTable(plugins);
  readme = replaceBetween(readme, "<!-- BEGIN:PLUGINS-TABLE -->", "<!-- END:PLUGINS-TABLE -->", table);
  fs.writeFileSync(README_PATH, readme);
  console.log(`✓ README.md — rewrote plugin table (${plugins.length} rows)`);

  console.log("Done. Commit the changes.");
}

main();
