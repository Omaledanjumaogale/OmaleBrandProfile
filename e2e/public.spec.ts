import { expect, test } from 'playwright/test';

test('public shell routes render core entry points', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('main')).toBeVisible();

	await page.goto('/platforms');
	await expect(page.getByRole('heading', { name: /one application/i })).toBeVisible();

	await page.goto('/apply');
	await expect(page.getByRole('heading', { name: /i-am network/i })).toBeVisible();
});
