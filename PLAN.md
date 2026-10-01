# Plan: Dark mode enhancement for the existing gallery login page

## What I am building
I am enhancing the existing static login-and-gallery web page with a coherent dark mode that users can toggle without losing the current login workflow or gallery behavior. The change stays within the existing repository, preserves the simple product structure, and adds maintainable theme tokens and preference persistence so the page can render consistently in both light and dark presentation modes.

## Upstream read
- `/discovery/PRD - Dark Mode Theme Enhancement.md`
- `.engine/external_source.json`
- Existing workspace application files: `index.html`, `style.css`, `app.js`

## Implementation notes
- **Inferred architecture:** The PRD suggests a supported fullstack stack, but the actual repository is a tiny static HTML/CSS/JavaScript application. This implementation follows the repository that actually exists and applies the dark-mode enhancement in place.
- **Pre-existing repository issues:**
  - There is no test runner or automated test suite in the repository.
  - Baseline inspection used `node --check app.js`, which passed for JavaScript syntax only.
  - `glob("**/*test*")` returned no test files, so automated baseline tests are absent.

## UI design decision
- **Mode:** preserve
- **Product shape:** focused workflow
- **Inherited system:** a simple centered login card and hidden gallery reveal flow
- **House style:** design-minimalist
- **Why:** The existing UI is a very small utility-style experience. A restrained minimalist dark theme preserves the current layout and interaction model while improving readability and theme consistency.

## Files

### Slice: dark-mode-toggle
- `index.html` — add a visible theme toggle control and semantic structure to support theme state.
- `style.css` — replace hardcoded colors with maintainable light/dark theme tokens and style the toggle, page chrome, states, and gallery consistently.
- `app.js` — add theme initialization, toggle handling, local preference persistence, and keep login behavior intact.
- `README.md` — document how to run the static app and how the theme toggle behaves.
- `test_report.yaml` — record baseline inspection and feature verification results.
- `CHANGELOG.md` — summarize the dark mode enhancement and changed files.

## Risk
- `index.html` — existing page structure will change slightly to accommodate the toggle; low blast radius in a single-page app.
- `style.css` — central styling file; changes affect all visible states, so token mistakes could impact readability.
- `app.js` — existing login logic must remain unchanged while theme logic is introduced alongside it.

## Verification
- Baseline syntax check: `node --check app.js` → exits 0.
- Slice verification: `node --check app.js` → exits 0 after theme logic changes.
- Manual browser verification (documented in report): load page, toggle theme, refresh, confirm preference persists, and confirm login/gallery workflow still works.
- Static asset check: browser can open `index.html` directly with linked CSS/JS intact.

## Ordered work
1. Add theme toggle markup and accessible labels to the existing page shell.
2. Introduce light/dark theme tokens and consistent card/control styling while preserving the current layout.
3. Add JavaScript to initialize the theme, persist preference in `localStorage`, and update toggle state without altering login behavior.
4. Re-run syntax verification and document the results in README, test report, and changelog.
