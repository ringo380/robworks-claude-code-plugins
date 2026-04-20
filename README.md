# Robworks Claude Code Plugins

A personal [Claude Code](https://claude.com/product/claude-code) plugin marketplace curated by [Ryan Robson (`@ringo380`)](https://github.com/ringo380).

A **marketplace** is a catalog of plugins you can install into Claude Code. Adding this marketplace to your Claude Code installation lets you discover, install, update, and remove any of its plugins with a single command.

## Prerequisites

- [Claude Code](https://code.claude.com/docs/en/quickstart) (any recent version — plugin support is GA as of 2025)
- Git access to public GitHub (no token required to install from this public marketplace)

## Add the marketplace

```bash
claude plugin marketplace add ringo380/robworks-claude-code-plugins
```

This clones the catalog into `~/.claude/plugins/marketplaces/` and registers it under the name `robworks-claude-code-plugins`. Plugins themselves are only downloaded on install.

Inside an interactive Claude Code session, you can use the slash-command equivalent:

```
/plugin marketplace add ringo380/robworks-claude-code-plugins
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

| Plugin | Category | Description | Pinned | Source |
| --- | --- | --- | --- | --- |
| [`ga-mcp-full`](https://github.com/ringo380/ga-mcp-full) | analytics | GA4 MCP server with full Admin API read/write access (30+ tools) — bundled with Claude Code slash commands, SessionStart auth hook, and OAuth browser flow. | [`v0.5.0`](https://github.com/ringo380/ga-mcp-full/releases/tag/v0.5.0) | [ringo380/ga-mcp-full](https://github.com/ringo380/ga-mcp-full) |
| [`claude-quikgif`](https://github.com/ringo380/claude-quikgif) | productivity | QuikGIF MCP integration — bundled MCP shim, CLI update notices on session start, lifecycle slash commands (`/claude-quikgif:status`, `install`, `update`, `install-mcp`). macOS-only. | [`v0.1.1`](https://github.com/ringo380/claude-quikgif/releases/tag/v0.1.1) | [ringo380/claude-quikgif](https://github.com/ringo380/claude-quikgif) |
| [`namecheap-mcp`](https://github.com/ringo380/namecheap-mcp) | infrastructure | Namecheap MCP server — manage domains, DNS records, SSL certificates, transfers, and account balance. Bundled `/namecheap-mcp:setup` slash command for guided credential setup. | [`v1.3.2`](https://github.com/ringo380/namecheap-mcp/releases/tag/v1.3.2) | [ringo380/namecheap-mcp](https://github.com/ringo380/namecheap-mcp) |

*More plugins land here as they're published.*

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
        "repo": "ringo380/robworks-claude-code-plugins"
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
└── README.md              # This file
```

There is no plugin code in this repo — every plugin is hosted in its own external GitHub repo and pulled in via a `github` source reference. That keeps plugin development, versioning, and releases decoupled from the marketplace catalog itself.

## Contributing a plugin

Want me to catalog one of your plugins here? Open an issue or PR:

1. Build your plugin in a public GitHub repo with a valid `.claude-plugin/plugin.json` manifest.
2. PR this repo with a new entry in `plugins[]` of `.claude-plugin/marketplace.json` and a row added to the table above.
3. I'll review for fit (currently: MCP servers, useful agents/skills, and dev workflow plugins).

Private or internal plugins — roll your own marketplace by forking this repo.

## Troubleshooting

### `claude plugin marketplace add` hangs or times out

Git operations default to a 120s timeout. Bump it for slow networks:

```bash
export CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS=300000  # 5 minutes
claude plugin marketplace add ringo380/robworks-claude-code-plugins
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
    { "source": "github", "repo": "ringo380/robworks-claude-code-plugins" }
  ]
}
```

## Related

- [Claude Code plugin marketplace docs](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code plugin authoring docs](https://code.claude.com/docs/en/plugins)
- [`ringo380/ga-mcp-full`](https://github.com/ringo380/ga-mcp-full) — first plugin in this catalog

## License

MIT — the marketplace catalog itself. Individual plugins are licensed per their own repos (see the "Available plugins" table).
