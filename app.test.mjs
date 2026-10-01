import { describe, it, beforeEach, expect, vi } from 'vitest';
import appModule from './app.js';

const { getPreferredTheme, applyTheme, initializeTheme, attemptLogin, THEME_STORAGE_KEY } = appModule;

function installDom() {
    document.body.innerHTML = `
        <button id="theme-toggle" type="button"></button>
        <div id="login-container"></div>
        <div id="gallery-container" class="hidden"></div>
        <input id="username" />
        <input id="password" />
        <p id="error-msg"></p>
    `;
}

describe('theme helpers', () => {
    beforeEach(() => {
        installDom();
        localStorage.clear();
        vi.restoreAllMocks();
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockReturnValue({ matches: false })
        });
    });

    it('returns the saved theme when localStorage contains a valid value', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        expect(getPreferredTheme()).toBe('dark');
    });

    it('falls back to the system preference when storage is invalid', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
        window.matchMedia = vi.fn().mockReturnValue({ matches: true });
        expect(getPreferredTheme()).toBe('dark');
    });

    it('updates body dataset and toggle accessibility attributes when dark theme is applied', () => {
        applyTheme('dark');
        const toggle = document.getElementById('theme-toggle');

        expect(document.body.dataset.theme).toBe('dark');
        expect(toggle.getAttribute('aria-pressed')).toBe('true');
        expect(toggle.getAttribute('aria-label')).toBe('Activate light mode');
    });

    it('exits cleanly when the toggle is missing', () => {
        document.getElementById('theme-toggle').remove();
        expect(() => initializeTheme()).not.toThrow();
        expect(document.body.dataset.theme).toBe('light');
    });

    it('wires toggle clicks and persists the next theme', () => {
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
        initializeTheme();

        document.getElementById('theme-toggle').click();

        expect(document.body.dataset.theme).toBe('dark');
        expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    });
});

describe('attemptLogin', () => {
    beforeEach(() => {
        installDom();
    });

    it('reveals the gallery for valid admin credentials', () => {
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = '12345';

        attemptLogin();

        expect(document.getElementById('login-container').classList.contains('hidden')).toBe(true);
        expect(document.getElementById('gallery-container').classList.contains('hidden')).toBe(false);
        expect(document.getElementById('error-msg').innerText).toBe('');
    });

    it('shows an error for invalid credentials', () => {
        document.getElementById('username').value = 'guest';
        document.getElementById('password').value = 'wrong';

        attemptLogin();

        expect(document.getElementById('gallery-container').classList.contains('hidden')).toBe(true);
        expect(document.getElementById('error-msg').innerText).toBe('Invalid credentials. (Try username "bypass")');
    });

    it('preserves the documented bypass behavior', () => {
        document.getElementById('username').value = 'bypass';
        document.getElementById('password').value = '';

        attemptLogin();

        expect(document.getElementById('gallery-container').classList.contains('hidden')).toBe(false);
    });
});
