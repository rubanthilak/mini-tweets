/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
		extend: {
			colors: {
				primary: {
					100: 'var(--color-primary-100)',
					200: 'var(--color-primary-200)',
					300: 'var(--color-primary-300)',
					400: 'var(--color-primary-400)',
					500: 'var(--color-primary-500)',
					600: 'var(--color-primary-600)',
					700: 'var(--color-primary-700)',
					800: 'var(--color-primary-800)',
					900: 'var(--color-primary-900)'
				},
				secondary: {
					DEFAULT: 'var(--color-secondary)',
					hover: 'var(--color-secondary-hover)'
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					hover: 'var(--color-accent-hover)',
					disabled: 'var(--color-accent-disabled)'
				},
				error: 'var(--color-error)',
				success: 'var(--color-success)',
				warning: 'var(--color-warning)'
			}
		}
	},
  plugins: [],
}
