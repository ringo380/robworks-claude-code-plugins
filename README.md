# Robworks Claude Code Plugins

A personal marketplace of [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) plugins authored by [Ryan Robson (`@ringo380`)](https://github.com/ringo380).

## Install the marketplace

```bash
claude plugin marketplace add ringo380/robworks-claude-code-plugins
```

## Install a plugin

```bash
claude plugin install <plugin-name>@robworks-claude-code-plugins
```

## Available plugins

| Plugin | Description | Repo |
| --- | --- | --- |
| [`ga-mcp-full`](https://github.com/ringo380/ga-mcp-full) | GA4 MCP server with full Admin API read/write access — bundled with Claude Code auth helpers and SessionStart bootstrap. | [ringo380/ga-mcp-full](https://github.com/ringo380/ga-mcp-full) |

## Manage installed plugins

```bash
claude plugin list
claude plugin update <plugin-name>@robworks-claude-code-plugins
claude plugin uninstall <plugin-name>@robworks-claude-code-plugins
```

## Adding a plugin to the catalog

Each plugin lives in its own GitHub repo. To add a new plugin:

1. Ensure the plugin repo has a valid `.claude-plugin/plugin.json` manifest at its root.
2. Add an entry to [`plugins`](./.claude-plugin/marketplace.json) with a `github` source pointing at the repo.
3. Commit and push. Users pick up the new plugin with `claude plugin marketplace update robworks-claude-code-plugins`.

Pin a plugin to a specific release by adding `"ref": "v1.2.3"` (tag or branch) or `"sha": "<40-char-sha>"` to the source object.

## License

MIT — see individual plugin repos for per-plugin licensing.
