# Changelog

## Added
- Added an in-page light/dark theme toggle to the existing gallery login experience.
- Added browser preference persistence so the selected theme is restored on reload.
- Added automated Vitest unit tests for theme and login behavior.
- Added Playwright E2E coverage plus a lightweight static server for browser-based verification.

## Changed
- Updated `index.html` to include a page header, descriptive copy, accessible form labels, and the theme toggle control.
- Reworked `style.css` to use maintainable light/dark theme tokens and consistent panel, input, button, and gallery styling.
- Expanded `app.js` to initialize theme state, apply the selected theme, store the preference, and export testable functions without changing the browser behavior.
- Added project documentation in `README.md` and updated verification details in `test_report.yaml`.

## Breaking Changes
- None.

## Migration Notes
- No migration steps are required. The page remains a static HTML/CSS/JavaScript application.
