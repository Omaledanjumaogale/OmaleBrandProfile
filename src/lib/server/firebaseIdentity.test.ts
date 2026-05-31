import { describe, expect, it } from 'vitest';
import { isAuthorizedPlatformRole, resolvePlatformAccess } from './firebaseIdentity';

describe('firebaseIdentity', () => {
	it('grants admin surface access to admin, auditor, and superadmin roles with active status', () => {
		expect(
			resolvePlatformAccess({
				role: 'admin',
				subscriptionStatus: 'active',
				isLocked: false
			})
		).toEqual({ allowed: true, reason: 'authorized' });

		expect(
			resolvePlatformAccess({
				role: 'auditor',
				subscriptionStatus: 'active',
				isLocked: false
			})
		).toEqual({ allowed: true, reason: 'authorized' });

		expect(
			resolvePlatformAccess({
				role: 'superadmin',
				subscriptionStatus: 'active',
				isLocked: false
			})
		).toEqual({ allowed: true, reason: 'authorized' });
	});

	it('rejects basic users and inactive accounts', () => {
		expect(
			resolvePlatformAccess({
				role: 'user',
				subscriptionStatus: 'active',
				isLocked: false
			})
		).toEqual({ allowed: false, reason: 'insufficient_role' });

		expect(
			resolvePlatformAccess({
				role: 'admin',
				subscriptionStatus: 'inactive',
				isLocked: false
			})
		).toEqual({ allowed: false, reason: 'inactive_subscription' });
	});

	it('recognizes authorized platform roles', () => {
		expect(isAuthorizedPlatformRole('admin')).toBe(true);
		expect(isAuthorizedPlatformRole('auditor')).toBe(true);
		expect(isAuthorizedPlatformRole('superadmin')).toBe(true);
		expect(isAuthorizedPlatformRole('user')).toBe(false);
	});
});
