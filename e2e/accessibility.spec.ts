import { expect, test } from 'playwright/test';

for (const route of ['/', '/platforms', '/admin/login']) {
	test(`accessibility smoke checks pass on ${route}`, async ({ page }) => {
		await page.goto(route, { waitUntil: 'domcontentloaded' });

		await expect(page.locator('#main-content')).toBeVisible();
		await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

		const focusableCount = await page.locator('a, button, input, textarea, select').count();
		expect(focusableCount).toBeGreaterThan(0);

		const unlabeledInputs = await page.locator('input:not([type="hidden"])').evaluateAll((nodes) =>
			nodes.filter((node) => {
				const input = node as HTMLInputElement;
				const aria = input.getAttribute('aria-label');
				const id = input.id;
				const hasLabel = id ? document.querySelector(`label[for="${id}"]`) : null;
				return !aria && !hasLabel;
			}).length
		);

		expect(unlabeledInputs).toBe(0);

		const missingAltImages = await page.locator('img').evaluateAll((nodes) =>
			nodes.filter((node) => !(node as HTMLImageElement).hasAttribute('alt')).length
		);

		expect(missingAltImages).toBe(0);
	});
}
