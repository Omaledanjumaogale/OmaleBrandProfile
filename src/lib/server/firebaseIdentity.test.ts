import { describe, expect, it } from 'vitest';
import {
	extractFirebaseIdentity,
	isAuthorizedPlatformRole,
	resolvePlatformAccess
} from './firebaseIdentity';

describe('firebaseIdentity', () => {
	it('extracts Firebase identity from a lookup payload', () => {
		const identity = extractFirebaseIdentity({
			users: [
				{
					localId: 'uid_123',
					email: 'admin@example.com',
					emailVerified: true,
					displayName: 'Admin User'
				}
			]
		});

		expect(identity).toEqual({
			uid: 'uid_123',
			email: 'admin@example.com',
			emailVerified: true,
			displayName: 'Admin User'
		});
	});

	it('rejects empty lookup payloads', () => {
		expect(() => extractFirebaseIdentity({ users: [] })).toThrow(/invalid firebase/i);
	});

	it('grants admin surface access only to admin roles with active status', () => {
		expect(
			resolvePlatformAccess({
				role: 'admin',
				subscriptionStatus: 'active',
				isLocked: false
			})
		).toEqual({ allowed: true, reason: 'authorized' });

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
		expect(isAuthorizedPlatformRole('user')).toBe(false);
	});
});
