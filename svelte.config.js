import adapter from '@sveltejs/adapter-node';
import preprocess from "svelte-preprocess";
import dotenv from 'dotenv';
dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $routes: 'src/routes',
      $style: 'src/style',
      $utils: 'src/utils'
    },
    vite: {
      envPrefix: 'ENV_',
      
    }
	},
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ]
};

export default config;
