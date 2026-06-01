import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		include: ['src/**/*.test.ts'],
		alias: {
			'$env/dynamic/private': resolve(__dirname, './src/lib/server/envMock.ts'),
			'$env/dynamic/public': resolve(__dirname, './src/lib/server/envMock.ts'),
			'$lib': resolve(__dirname, './src/lib'),
			'$convex': resolve(__dirname, './convex')
		}
	}
});
