/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'inter-tight': ['Inter Tight Variable', 'sans-serif'],
				'Poppins': ['Poppins', 'sans-serif'],
			  },
			  colors:{
				'primary': '#62B752',
				'secondary': '#fff',
				'tertiary': '#1c73b7' 
			  }
		},
		fontFamily:{
			'intern': ['Inter Tight Variable','sans-serif'],
			'oswald': ['Oswald Variable','sans-serif'],
		}
	},
	plugins: [
		animations
	],
}
