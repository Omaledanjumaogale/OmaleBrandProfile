import { describe, expect, it } from 'vitest';
import { createSignedSessionPayload, verifySignedSessionPayload } from './sessionToken';

describe('sessionToken', () => {
	it('round-trips a signed session payload', async () => {
		const token = await createSignedSessionPayload(
			{
				uid: 'uid_123',
				email: 'admin@example.com',
				role: 'admin'
			},
			'test-secret',
			60_000
		);

		const payload = await verifySignedSessionPayload(token, 'test-secret');
		expect(payload?.uid).toBe('uid_123');
		expect(payload?.email).toBe('admin@example.com');
		expect(payload?.role).toBe('admin');
	});

	it('rejects expired tokens', async () => {
		const token = await createSignedSessionPayload(
			{
				uid: 'uid_123',
				email: 'admin@example.com',
				role: 'admin'
			},
			'test-secret',
			-1
		);

		const payload = await verifySignedSessionPayload(token, 'test-secret');
		expect(payload).toBeNull();
	});
});
