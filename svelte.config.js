import adapter from '@sveltejs/adapter-node';
import preprocess from "svelte-preprocess";
import { config } from 'dotenv';

//Loads .env file contents into process.env.
config();

/** @type {import('@sveltejs/kit').Config} */
export default {
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
      server : {
        port : 6900
      }
    }
	},
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ]
};
