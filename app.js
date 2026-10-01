const THEME_STORAGE_KEY = 'preferred-theme';

function getPreferredTheme() {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    const resolvedTheme = theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = resolvedTheme;

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const darkModeActive = resolvedTheme === 'dark';
        themeToggle.setAttribute('aria-pressed', String(darkModeActive));
        themeToggle.setAttribute('aria-label', darkModeActive ? 'Activate light mode' : 'Activate dark mode');
    }
}

function initializeTheme() {
    applyTheme(getPreferredTheme());

    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    });
}

function attemptLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Flaw 1: Hardcoded credentials in client-side code
    // Flaw 2: Logic error allowing bypass without a password
    // Flaw 3: Even if this was secure, the DOM already contains the images
    if ((user === 'admin' && pass === '12345') || user === 'bypass') {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('gallery-container').classList.remove('hidden');
        errorMsg.innerText = '';
    } else {
        errorMsg.innerText = 'Invalid credentials. (Try username "bypass")';
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
}

if (typeof module !== 'undefined') {
    module.exports = {
        THEME_STORAGE_KEY,
        getPreferredTheme,
        applyTheme,
        initializeTheme,
        attemptLogin
    };
}
