# Robworks Claude Code Plugins

A personal [Claude Code](https://claude.com/product/claude-code) plugin marketplace authored by Ryan Robson and [Robworks Software LLC](https://robworks.info).

**Web catalog:** <https://code.robworks.info/plugins/> — live view of the plugins below, rendered directly from `marketplace.json` at runtime. The catalog page is part of [code.robworks.info](https://code.robworks.info), the portfolio for Ryan Robson and Robworks Software LLC.

A **marketplace** is a catalog of plugins you can install into Claude Code. Adding this marketplace to your Claude Code installation lets you discover, install, update, and remove any of its plugins with a single command.

## Prerequisites

- [Claude Code](https://code.claude.com/docs/en/quickstart) (any recent version — plugin support is GA as of 2025)
- Git access to public GitHub (no token required to install from this public marketplace)

## Add the marketplace

```bash
claude plugin marketplace add robworks-code/robworks-claude-code-plugins
```

This clones the catalog into `~/.claude/plugins/marketplaces/` and registers it under the name `robworks-claude-code-plugins`. Plugins themselves are only downloaded on install.

Inside an interactive Claude Code session, you can use the slash-command equivalent:

```
/plugin marketplace add robworks-code/robworks-claude-code-plugins
```

## Browse and install plugins

```bash
# List what's available in this marketplace
claude plugin list

# Install a specific plugin
claude plugin install <plugin-name>@robworks-claude-code-plugins

# Install at a specific scope (user | project | local)
claude plugin install <plugin-name>@robworks-claude-code-plugins -s user
```

Inside Claude Code:

```
/plugin install <plugin-name>@robworks-claude-code-plugins
```

## Available plugins

<!-- BEGIN:PLUGINS-TABLE -->
| Plugin | Category | Description | License | Pinned | Source |
| --- | --- | --- | --- | --- | --- |
| [`ga-mcp-full`](https://github.com/ringo380/ga-mcp-full) | analytics | GA4 MCP server with full Admin API read/write access — bundled with Claude Code auth helpers and SessionStart bootstrap. | `MIT` | [`v0.5.0`](https://github.com/ringo380/ga-mcp-full/releases/tag/v0.5.0) | [ringo380/ga-mcp-full](https://github.com/ringo380/ga-mcp-full) |
| [`claude-quikgif`](https://github.com/ringo380/claude-quikgif) | productivity | QuikGIF MCP integration for Claude Code — bundled MCP shim, session-start update notices, and lifecycle slash commands (status, install, update, install-mcp). | `MIT` | [`v0.2.0`](https://github.com/ringo380/claude-quikgif/releases/tag/v0.2.0) | [ringo380/claude-quikgif](https://github.com/ringo380/claude-quikgif) |
| [`namecheap-mcp`](https://github.com/ringo380/namecheap-mcp) | infrastructure | Namecheap MCP server — manage domains, DNS, SSL, transfers, and account from Claude Code. Includes a guided /namecheap-mcp:setup command for first-run credentials. | `MIT` | [`v1.5.0`](https://github.com/ringo380/namecheap-mcp/releases/tag/v1.5.0) | [ringo380/namecheap-mcp](https://github.com/ringo380/namecheap-mcp) |
| [`appstore-connect-mcp`](https://github.com/ringo380/appstore-connect-mcp) | developer-tools | App Store Connect MCP server. Query 923 API endpoints and run authenticated calls — apps, reviews, sales reports, TestFlight, beta testers, and more. | `MIT` | [`v2.2.3`](https://github.com/ringo380/appstore-connect-mcp/releases/tag/v2.2.3) | [ringo380/appstore-connect-mcp](https://github.com/ringo380/appstore-connect-mcp) |
| [`xcode-mcp-server`](https://github.com/ringo380/Xcode-mcp-server) | developer-tools | Xcode MCP server — build projects and run tests from Claude Code with structured output, log persistence, and Xcode 15/16+ compatibility. | `MIT` | [`v1.0.0`](https://github.com/ringo380/Xcode-mcp-server/releases/tag/v1.0.0) | [ringo380/Xcode-mcp-server](https://github.com/ringo380/Xcode-mcp-server) |
| [`cpanel-mcp`](https://github.com/ringo380/claude-cpanel-mcp) | infrastructure | cPanel UAPI MCP server - 74 tools for email, DNS, file read and write, MySQL, FTP, SSL, cron, subdomains, addon domains, and backups on shared cPanel hosting. Multi-account profiles with atomic token rotation, dry-run auth_test, cPHulk lockout detection, POST routing that keeps secrets out of the cPanel access log, and a state-machine /cpanel-mcp:setup. | `MIT` | [`v0.4.4`](https://github.com/ringo380/claude-cpanel-mcp/releases/tag/v0.4.4) | [ringo380/claude-cpanel-mcp](https://github.com/ringo380/claude-cpanel-mcp) |
| [`ableton`](https://github.com/ringo380/ableton-mcp-max) | creative | Drive Ableton Live 11 and 12 from Claude Code - tracks, clips, MIDI notes, devices, mixer, automation, arrangement, scenes, transport, and preset generation (Wavetable, Simpler, rack macros & zones, and macro->parameter mappings) over a bundled MCP server. Includes a guided /ableton:setup, a /ableton:analyze best-practice set report, plus workflow commands for building and editing tracks. | `MIT` | [`v0.34.0`](https://github.com/ringo380/ableton-mcp-max/releases/tag/v0.34.0) | [ringo380/ableton-mcp-max](https://github.com/ringo380/ableton-mcp-max) |
| [`notation`](https://github.com/Robworks-Code/notation) | productivity | Capture session learnings into the right Claude Code memory tier instead of dumping them all into CLAUDE.md. /notation:notate reads the session, right-sizes the flow, and presents proposals as a scorecard plus per-tier tables with diffs; /notation:notate-all applies them without the picker; /notation:feedback sends a bug or routing correction to the maintainer. The bundled notation-audit skill keeps the global CLAUDE.md under its size budget, relocating detail into linked topical notes rather than deleting it. Notation is additive: it preserves existing lines and dates new entries rather than overwriting history. | `MIT` | [`v0.9.0`](https://github.com/Robworks-Code/notation/releases/tag/v0.9.0) | [Robworks-Code/notation](https://github.com/Robworks-Code/notation) |
| [`deep-review`](https://github.com/Robworks-Code/deep-review) | developer-tools | Multi-agent pull request review that surfaces every finding instead of hiding low-confidence ones. /deep-review:review scores each issue on confidence and severity, verifies impactful-but-uncertain ones, then presents a two-axis triage in-session and posts to the PR on confirm. /deep-review:auto double-checks then auto-applies a fix for every issue to the working tree, runs the repo's local gate to verify them, and confirms every fix survived the run. Works with or without a PR, tolerates a dirty tree without touching unrelated uncommitted work, and never assumes CI exists. | `MIT` | [`v0.3.1`](https://github.com/Robworks-Code/deep-review/releases/tag/v0.3.1) | [Robworks-Code/deep-review](https://github.com/Robworks-Code/deep-review) |
| [`colab`](https://github.com/robworks-code/colab-mcp-extended) | developer-tools | Drive Google Colab from Claude Code over a bundled MCP server — open Drive notebooks, run code in the kernel, manage multiple sessions, upload/download VM files, mount Drive, read Colab secrets, inspect variables, edit notebook cells, and run fine-tune round-trip + local MLX conversion helpers. Optional headless/Playwright backend. Includes guided /colab:setup and /colab:help commands. | `MIT` | [`v1.3.0`](https://github.com/robworks-code/colab-mcp-extended/releases/tag/v1.3.0) | [robworks-code/colab-mcp-extended](https://github.com/robworks-code/colab-mcp-extended) |
| [`sharding`](https://github.com/robworks-code/sharding) | developer-tools | Develop a product as isolated shards coupled only through a frozen, versioned contract, with drift caught mechanically. A Claude Code plugin plus a deterministic engine: SessionStart/PreToolUse/Stop hooks sandbox each shard to its own slice and a read-only contract, and /shard-* commands diff a shard's surface against the contract and gate phases. | `BUSL-1.1` | [`v0.0.7`](https://github.com/robworks-code/sharding/releases/tag/v0.0.7) | [robworks-code/sharding](https://github.com/robworks-code/sharding) |
| [`audacity`](https://github.com/robworks-code/audacity-mcp-max) | developer-tools | Drive Audacity from Claude Code - 132 tools plus one-call cleanup and mastering pipelines, with guided setup and diagnostics. | `Apache-2.0` | [`v0.3.0`](https://github.com/robworks-code/audacity-mcp-max/releases/tag/v0.3.0) | [robworks-code/audacity-mcp-max](https://github.com/robworks-code/audacity-mcp-max) |
<!-- END:PLUGINS-TABLE -->

*More plugins land here as they're published. The table above is regenerated by `scripts/build-readme.js` — run it after any `.claude-plugin/marketplace.json` change. The web catalog rebuilds itself automatically (it fetches `marketplace.json` from this repo at runtime).*

## Manage installed plugins

```bash
claude plugin list                                            # Show all installed plugins
claude plugin update <plugin>@robworks-claude-code-plugins    # Pull the latest version
claude plugin enable <plugin>@robworks-claude-code-plugins    # Re-enable a disabled plugin
claude plugin disable <plugin>@robworks-claude-code-plugins   # Disable without uninstalling
claude plugin uninstall <plugin>@robworks-claude-code-plugins # Remove the plugin
```

## Refresh the catalog

When new plugins are added or versions change in this marketplace, pull the latest catalog:

```bash
claude plugin marketplace update robworks-claude-code-plugins
```

## Pinning to a release

Each plugin entry in `.claude-plugin/marketplace.json` can pin to a branch, tag, or exact commit:

```jsonc
{
  "name": "ga-mcp-full",
  "source": {
    "source": "github",
    "repo": "ringo380/ga-mcp-full",
    "ref": "v0.3.1"           // tag or branch
    // or "sha": "abc123..."   // 40-char commit SHA for exact pin
  }
}
```

Without a pin, the marketplace tracks the default branch of each plugin repo.

## Require this marketplace for your team

Add to a project's `.claude/settings.json` so teammates are prompted to trust it on first open:

```json
{
  "extraKnownMarketplaces": {
    "robworks-claude-code-plugins": {
      "source": {
        "source": "github",
        "repo": "robworks-code/robworks-claude-code-plugins"
      }
    }
  },
  "enabledPlugins": {
    "ga-mcp-full@robworks-claude-code-plugins": true
  }
}
```

See the [Claude Code plugin settings docs](https://code.claude.com/docs/en/settings#plugin-settings) for all options.

## Repo layout

```
robworks-claude-code-plugins/
├── .claude-plugin/
│   └── marketplace.json   # The catalog — edit to add/update plugins
├── scripts/
│   └── build-readme.js    # Regenerates the table above from marketplace.json
└── README.md              # This file
```

There is no plugin code in this repo — every plugin is hosted in its own external GitHub repo and pulled in via a `github` source reference. That keeps plugin development, versioning, and releases decoupled from the marketplace catalog itself.

The web catalog (formerly served from `docs/` here) lives in [`ringo380/robworks-code`](https://github.com/ringo380/robworks-code) and fetches `marketplace.json` from this repo at runtime — so adding a plugin here updates the live site within ~5 minutes (raw.githubusercontent.com CDN cache) without any deploy step.

## Contributing a plugin

Want me to catalog one of your plugins here? Open an issue or PR:

1. Build your plugin in a public GitHub repo with a valid `.claude-plugin/plugin.json` manifest.
2. PR this repo with a new entry in `plugins[]` of `.claude-plugin/marketplace.json`, then run `node scripts/build-readme.js` to regenerate the table above.
3. I'll review for fit (currently: MCP servers, useful agents/skills, and dev workflow plugins).

Private or internal plugins — roll your own marketplace by forking this repo.

## Troubleshooting

### `claude plugin marketplace add` hangs or times out

Git operations default to a 120s timeout. Bump it for slow networks:

```bash
export CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=300000  # 5 minutes
claude plugin marketplace add robworks-code/robworks-claude-code-plugins
```

### Plugin install fails with authentication errors

For public plugins (everything here), no token is needed. If you still see auth errors:

```bash
gh auth status                 # Are you logged into GitHub at all?
git config --global credential.helper   # Is a credential helper configured?
```

Auto-updates use `GITHUB_TOKEN` / `GH_TOKEN` env vars when set. Only needed for private marketplaces.

### Marketplace shows stale plugins after an update

```bash
claude plugin marketplace update robworks-claude-code-plugins
claude plugin update <plugin>@robworks-claude-code-plugins
```

If an individual plugin reports the same version twice in a row, the plugin author needs to bump its `plugin.json` version — the cache keys on the manifest version.

### I need to restrict which marketplaces are addable in my org

See [`strictKnownMarketplaces`](https://code.claude.com/docs/en/settings#strictknownmarketplaces) in managed settings. Allowlist this repo with:

```json
{
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "robworks-code/robworks-claude-code-plugins" }
  ]
}
```

## Related

- [Claude Code plugin marketplace docs](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code plugin authoring docs](https://code.claude.com/docs/en/plugins)
- [`ringo380/ga-mcp-full`](https://github.com/ringo380/ga-mcp-full) — first plugin in this catalog

## License

MIT — the marketplace catalog itself (this repo: the `marketplace.json` index, the README, and the build script). See [LICENSE](LICENSE).

**Each plugin is licensed by its own repo, and they are not all the same.** The License column in the "Available plugins" table above shows what each one is. Most are MIT. `sharding` is [BUSL-1.1](https://github.com/robworks-code/sharding/blob/main/LICENSE) — source-available, not open source: free for any individual acting on their own initiative, including paid work for an employer or client of any size, with organizational adoption requiring a commercial license. It converts to MIT on 2030-07-19. Installing a plugin from this catalog puts you under that plugin's license, not this one.
