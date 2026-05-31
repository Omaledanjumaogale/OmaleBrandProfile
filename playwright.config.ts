import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
	testDir: './e2e',
	timeout: 30_000,
	expect: {
		timeout: 10_000,
	},
	use: {
		baseURL: 'http://127.0.0.1:4175',
		trace: 'retain-on-failure',
	},
	webServer: {
		command: 'pnpm dev --host 127.0.0.1 --port 4175',
		port: 4175,
		reuseExistingServer: true,
		timeout: 180_000,
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
