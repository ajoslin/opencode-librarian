# opencode-librarian

OpenCode plugin that adds a Librarian subagent for remote code research. It is designed for deep source investigation across repositories, with long-form answers that cite evidence and point to permalinks when code details matter.

## Inspiration
- Heavily inspired by the Librarian agent in [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode).
- Aligned with the Librarian concept described by Ampcode.

## Install

Add the plugin to `~/.config/opencode/opencode.json`:

```json
{
  "plugin": [
    "opencode-librarian"
  ]
}


Example prompts:
- "librarian: to look up how React's useEffect cleanup is implemented."
- "Ask the Librarian to explain why this Zod validation error occurs and show the logic causing it."
- "Use the Librarian to trace how our docs get deployed across the docs and infra repos."
```

## Usage
- Install and build the plugin, then enable it in your OpenCode config.
- Ask explicitly for the Librarian when you need remote code research or upstream library internals. This plugin only registers the agent; it does not add auto-routing or keyword triggers, so OpenCode will not invoke it unless you select it or ask for it explicitly.

Default model configuration:
- This plugin ships with a default model defined in `src/constants.ts` of `glm-4.7-free` from Zen.
- If you want the fastest and smartest version that still costs pennies, I recommend Gemini 3 Flash.
- To override it, set the agent model in your OpenCode config, for example:

```json
{
  "agent": {
    "librarian": {
      "model": "opencode/gemini-flash"
    }
  }
}
```

## Development
```bash
bun install
bun run build
```
