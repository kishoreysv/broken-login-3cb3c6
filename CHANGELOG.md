# Changelog

## Added
- Added an in-page light/dark theme toggle to the existing gallery login experience.
- Added browser preference persistence so the selected theme is restored on reload.

## Changed
- Updated `index.html` to include a page header, descriptive copy, accessible form labels, and the theme toggle control.
- Reworked `style.css` to use maintainable light/dark theme tokens and consistent panel, input, button, and gallery styling.
- Expanded `app.js` to initialize theme state, apply the selected theme, and store the preference without changing the existing login flow.
- Added project documentation in `README.md` and verification details in `test_report.yaml`.

## Breaking Changes
- None.

## Migration Notes
- No migration steps are required. The page remains a static HTML/CSS/JavaScript application.
