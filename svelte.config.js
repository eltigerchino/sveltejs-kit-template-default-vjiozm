import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import 'dotenv/config';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({
		// Because of https://github.com/sveltejs/vite-plugin-svelte/issues/961
		script: true
	}),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		csp: get_csp()
	}
};

function get_csp() {
	if (dev) return;

	let directives = {
		'default-src': [`https://*.website.com`],
		'style-src': [`https://*.website.com`, 'unsafe-inline']
	};

	return { directives };
}

export default config;
