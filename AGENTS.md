# AGENTS.md

## Repository purpose

Use this repository as a Codex workspace for building responsive web applications in VS Code with a bolt.new-like workflow, then preparing the result for GitHub.

## Working style

- Start each substantial task by extracting the app goal, target user, core flows, visual direction, technical constraints, and definition of done.
- For multi-step or ambiguous work, make a short plan before editing.
- Prefer scoped edits over broad rewrites. Reuse existing structure and patterns when they are good enough.
- Keep the project runnable after each meaningful change.

## Frontend standards

- Build mobile-first and verify layouts for narrow, medium, and wide screens.
- Prefer reusable components and CSS variables or tokens when styling work is substantial.
- Keep layouts intentional and avoid placeholder-grade UI.
- Preserve accessibility basics: semantic HTML, labels, keyboard access, focus states, contrast, and alt text where relevant.
- Keep secrets and privileged logic out of client code.

## Validation

- Before finishing, run the most relevant available build, lint, test, or type-check commands.
- If no verification commands exist, state that explicitly and provide manual verification notes.
- Call out responsive edge cases, missing assets, or deployment blockers.

## GitHub handoff

- Keep changes commit-ready and summarize them in a PR-friendly way.
- When asked to publish, prefer normal branch, commit, and PR workflows over destructive git operations.

## External context

- For OpenAI, Codex, or API questions, use the OpenAI developer documentation MCP server when available.
- Put recurring repo-specific workflows in `.agents/skills/`.
