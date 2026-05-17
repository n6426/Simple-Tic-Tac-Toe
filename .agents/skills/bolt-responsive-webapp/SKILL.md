---
name: bolt-responsive-webapp
description: Build, refine, or scaffold a responsive web application in VS Code using a bolt.new-like workflow. Use when turning a product prompt into mobile-first UI changes, reusable components, responsive styling decisions, validation steps, and GitHub-ready output. Do not use for backend-only, infrastructure-only, or non-web tasks.
---

# Bolt Responsive Webapp

1. Translate the request into a compact build brief before editing:
   - target user
   - app goal
   - core pages or flows
   - visual direction
   - technical constraints
   - definition of done
2. If requirements are fuzzy, state the working assumptions and keep the first iteration narrow.
3. Build in small increments. Prefer file-aware edits over broad rewrites.
4. Apply these frontend standards:
   - mobile-first layout decisions
   - reusable sections and components instead of page-local duplication
   - CSS variables or tokens when styling changes are substantial
   - responsive behavior checked for small, medium, and desktop widths
   - semantic HTML and accessible controls, forms, and navigation
5. When using inspiration from bolt.new-style prompts:
   - preserve product intent, not literal copy
   - translate visual direction into concrete layout and component decisions
   - keep secrets, payments, privileged APIs, and webhook logic off the client unless the repository already has a safe server boundary
6. Before finishing:
   - run the most relevant local checks available
   - note remaining manual responsive checks or browser risks
   - provide a GitHub-ready summary of what changed

If you need a starting prompt structure, read `references/prompt-template.md`.
