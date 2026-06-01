import { expect, test } from 'playwright/test';

test('protected admin routes redirect unauthenticated users', async ({ page }) => {
	await page.goto('/admin', { waitUntil: 'domcontentloaded' });
	await expect(page).toHaveURL(/\/admin\/login$/);

	await page.goto('/admin/settings', { waitUntil: 'domcontentloaded' });
	await expect(page).toHaveURL(/\/admin\/login$/);
});

test('admin login session endpoint rejects invalid payloads', async ({ request }) => {
	const response = await request.post('/admin/login/session', {
		data: {},
	});

	expect(response.status()).toBe(400);
	const payload = await response.json();
	expect(payload.error).toMatch(/missing firebase id token/i);
});
