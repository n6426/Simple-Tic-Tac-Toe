# Responsive Web App Prompt Template

Use this structure when asking Codex to build a bolt.new-style app in VS Code.

## Template

Build a responsive `[app type]` for `[target user]`.

Goal:
`[What the product should do]`

Core flows:
- `[Flow 1]`
- `[Flow 2]`
- `[Flow 3]`

Visual direction:
- `[Brand or mood]`
- `[Layout or component cues]`
- `[Any references to existing docs or files]`

Technical requirements:
- `[Framework or stack]`
- `[Routing, forms, state, API, auth, storage, or deployment needs]`
- `[Accessibility or performance requirements]`

Constraints:
- `[Files to modify or avoid]`
- `[Do not add dependencies unless necessary]`
- `[Keep secrets server-side]`

Done when:
- `[Expected user-visible outcome]`
- `[Checks that should pass]`
- `[Any GitHub or PR output expected]`

## Example

Use `$bolt-responsive-webapp` to build a responsive landing page for a small SaaS product.

Goal:
Create a homepage that explains the product, captures email leads, and looks strong on mobile and desktop.

Core flows:
- Hero section with clear CTA
- Feature overview
- Pricing section
- Contact or signup form

Visual direction:
- Clean editorial layout
- Strong typography
- Use the structure in `BOLT_NEW_REFERENCE.md` as process guidance, not copy

Technical requirements:
- Keep it static and easy to host
- Use reusable sections and sensible CSS variables
- Preserve accessibility basics

Constraints:
- Keep changes scoped to the frontend
- Do not add a backend unless required

Done when:
- Layout works at phone, tablet, and desktop widths
- Relevant checks pass
- Provide a concise GitHub-ready summary
