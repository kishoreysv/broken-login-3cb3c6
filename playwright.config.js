const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '.',
    testMatch: ['e2e.spec.js'],
    timeout: 30000,
    workers: 1,
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:4173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure'
    },
    webServer: {
        command: 'node server.js',
        url: 'http://127.0.0.1:4173',
        reuseExistingServer: true,
        timeout: 30000
    }
});
