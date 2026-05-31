import { expect, test } from 'playwright/test';

for (const route of ['/', '/platforms', '/admin/login']) {
	test(`accessibility smoke checks pass on ${route}`, async ({ page }) => {
		await page.goto(route);

		await expect(page.locator('main')).toBeVisible();
		await expect(page.locator('h1')).toHaveCount(1);

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
