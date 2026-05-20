import { describe, expect, it } from 'vitest';
import { buildAdminLoginRateLimitKey } from './authRateLimit';

describe('authRateLimit', () => {
	it('builds a stable key from IP and user agent', () => {
		expect(buildAdminLoginRateLimitKey('127.0.0.1', 'Mozilla/5.0 Test Agent')).toBe(
			'127.0.0.1::mozilla/5.0 test agent'
		);
	});

	it('handles missing user agents safely', () => {
		expect(buildAdminLoginRateLimitKey('127.0.0.1', null)).toBe('127.0.0.1::unknown');
	});
});

