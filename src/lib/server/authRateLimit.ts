export function buildAdminLoginRateLimitKey(ipAddress: string, userAgent: string | null | undefined) {
	const normalizedAgent = (userAgent ?? 'unknown')
		.toLowerCase()
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, 120);

	return `${ipAddress}::${normalizedAgent}`;
}

