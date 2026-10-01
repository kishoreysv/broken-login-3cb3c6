# Broken Auth Gallery

This repository contains a tiny static login-and-gallery demo page enhanced with a light/dark theme toggle.

## Run locally
Open `index.html` in a browser, or serve the folder with any static file server.

## Theme behavior
- Use the **Dark mode** toggle in the page header to switch themes.
- The selected theme is saved in `localStorage` and restored on the next page load.
- If no saved preference exists, the page falls back to the browser's system color-scheme preference.

## Existing workflow
- The login form and hidden gallery behavior remain unchanged.
- The current demo credentials behavior still works, including the existing `bypass` username path.

## Verification
Run the automated unit tests:

```bash
node node_modules/vitest/vitest.mjs run --config vitest.config.mjs
```

Run the browser E2E tests:

```bash
node node_modules/@playwright/test/cli.js test --config playwright.config.js
```
