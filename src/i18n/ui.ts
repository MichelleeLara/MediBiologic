// import SpainFlag from '../components/flags/Spain.astro';
// import AndorraFlag from '../components/flags/Andorra.astro';
import UnitedStatesFlag from '@/components/icons/EUA_flag.astro';
import MexicoFlag from '@/components/icons/Mexico_flag.astro';

// Add missing imports
export const LANGUAGES: Record<
	string,
	{ code: string; name: string; flag: typeof UnitedStatesFlag }
> = {
	en: {
		code: 'en',
		name: 'English',
		flag: UnitedStatesFlag,
	},
	es: {
		code: 'es',
		name: 'Español',
		flag: MexicoFlag,
	},
};

export const defaultLang = 'es';
export const showDefaultLang = false;

export const ui = {
	es: {
		'nav.inicio': 'Inicio',
		'nav.vota': 'Vota',
		'nav.info': 'Información',
		'nav.archivo': 'Archivo',
		// 'nav.doctor': 'doctor dueñas',
		'nav.privacidad': 'Privacidad',
		// 'nav.cookies': 'Cookies',
	},
	en: {
		'nav.inicio': 'Home',
		'nav.vota': 'Vote',
		'nav.info': 'Information',
		'nav.archivo': 'Archive',
		// 'nav.doctor': 'doctor dueñas',
		'nav.privacidad': 'Privacy',
		// 'nav.cookies': 'Cookies',
	},
} as const;

export const routes = {
	es: {
		vota: 'vota',
		info: 'info',
		archivo: 'archivo',
		doctorRicardo: 'doctorRicardo',
		'doctor-dueñas': 'doctor-dueñas',
		privacidad: 'privacidad',
		// cookies: 'cookies',
	},
	en: {
		vota: 'vote',
		info: 'information',
		doctorRicardo: 'doctorRicardo',
		archivo: 'archive',
		'doctor-dueñas': 'doctor-dueñas',
		privacidad: 'privacy',
		// cookies: 'cookies',
	},
};
