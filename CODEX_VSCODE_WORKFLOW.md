# Codex VS Code Setup for Bolt.new-Style Workflows

Last reviewed: May 17, 2026

## Summary

To get a bolt.new-like workflow in VS Code with Codex, you need four layers in place:

1. The Codex IDE extension installed and signed in
2. A trusted repository with durable instructions in `AGENTS.md`
3. Codex configuration for shared behavior and MCP access
4. Repo-local skills for repeated jobs such as "build a responsive web app"

GitHub publishing is split across two paths:

- Local Git push from VS Code or the terminal
- Optional Codex cloud and GitHub review features for PR comments, reviews, and follow-up fixes

## What the official Codex docs confirm

- The Codex IDE extension uses the same agent and shared configuration as the Codex CLI.
- `AGENTS.md` loads automatically before work starts, and more specific files closer to the current directory win.
- Skills live in `.agents/skills` inside the repository and can trigger by explicit mention or description match.
- The IDE extension supports `/local`, `/cloud`, `/review`, and `/status`.
- OpenAI docs can be connected through the `openaiDeveloperDocs` MCP server.
- GitHub PR review can be triggered with `@codex review`, and Codex follows repository review guidance from `AGENTS.md`.

## What is now in place in this repo

- `AGENTS.md`
  This gives Codex repo-specific behavior for responsive web app work, validation, and GitHub handoff.
- `.codex/config.toml`
  This adds the OpenAI Docs MCP server at repo scope for Codex clients that load project config.
- `.agents/skills/bolt-responsive-webapp/SKILL.md`
  This gives Codex a reusable bolt.new-style responsive web app workflow.
- `.agents/skills/bolt-responsive-webapp/references/prompt-template.md`
  This gives you a clean prompt structure for repeatable app-building requests.

## Remaining user-level setup

1. Install the Codex extension from the VS Code Marketplace and sign in.
2. Mark this repo as trusted so project `.codex/` config can load.
3. If you want the OpenAI Docs MCP server available globally, add it in your user config too:

   `codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp`

4. Make sure Git is already authenticated to GitHub locally if you want Codex-created changes pushed from this machine.
5. If you want `@codex review`, automatic PR reviews, or cloud follow-up tasks, connect GitHub in Codex web and enable Codex cloud for the repo.

## How to use this setup

- Prompt directly:
  `Use $bolt-responsive-webapp to build a responsive marketing site for a SaaS dashboard.`
- Or use the template in `.agents/skills/bolt-responsive-webapp/references/prompt-template.md`.
- Use `/cloud` for longer-running tasks you want to offload.
- Use `/review` before committing or opening a PR.
- Keep recurring mistakes out of prompts and move them into `AGENTS.md` or the skill.

## Practical limits compared with bolt.new

- Codex in VS Code does not replace your local dev server or preview workflow.
- It does not give you bolt.new's built-in browser runtime, managed database, auth, storage, or hosting layer by default.
- GitHub publishing is not automatic without working Git credentials, and PR review automation requires Codex cloud plus GitHub integration.

## Sources

- Codex IDE extension: https://developers.openai.com/codex/ide
- Codex IDE features: https://developers.openai.com/codex/ide/features
- Codex IDE slash commands: https://developers.openai.com/codex/ide/slash-commands
- AGENTS.md guide: https://developers.openai.com/codex/guides/agents-md
- Skills guide: https://developers.openai.com/codex/skills
- Config basics: https://developers.openai.com/codex/config-basic
- MCP guide: https://developers.openai.com/codex/mcp
- Docs MCP: https://developers.openai.com/learn/docs-mcp
- GitHub integration: https://developers.openai.com/codex/integrations/github
