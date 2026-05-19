import { describe, expect, it } from 'vitest';
import { shouldBypassMaintenance, shouldProtectRegistration } from './routeGuards';

describe('platformRuntime route guards', () => {
	it('bypasses maintenance for admin and public marketing routes', () => {
		expect(shouldBypassMaintenance('/admin')).toBe(true);
		expect(shouldBypassMaintenance('/platforms')).toBe(true);
		expect(shouldBypassMaintenance('/services')).toBe(true);
		expect(shouldBypassMaintenance('/dashboard')).toBe(false);
		expect(shouldBypassMaintenance('/apply')).toBe(false);
	});

	it('protects the IAM registration route only', () => {
		expect(shouldProtectRegistration('/register/iam')).toBe(true);
		expect(shouldProtectRegistration('/register/iam/')).toBe(true);
		expect(shouldProtectRegistration('/register/success')).toBe(false);
		expect(shouldProtectRegistration('/dashboard')).toBe(false);
	});
});
