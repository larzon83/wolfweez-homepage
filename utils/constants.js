// env.URL is main url of netlify site
export const baseUrl = process.env.URL || 'http://localhost:3000'

export const siteTitle = {
	short: 'Wolfweez Openair Festival',
	long: 'Wolfweez Openair Festival | Irslingen | Festival | Live Musik'
}

export const siteDescription =
	'Das Wolfweez Openair Festival in Irslingen bei Rottweil – alle Infos zum Festival, Line-up, Tickets, Fotos & News. 3 Tage Rock, Metal & Blasmusik vom Feinsten!'

export const tabTypes = {
	HISTORY: 'history',
	INFOS: 'infos',
	LINEUP: 'lineup'
}

export const sbHomeBloks = {
	GALLERIES: 'HomepageGalerie',
	NEWS: 'HomepageNews',
	VIDEO: 'HomepageVideo'
}

export const lightgalleryOptions = {
	download: true,
	dynamic: true,
	fullScreen: true,
	hideBarsDelay: 3000,
	hideControlOnEnd: true,
	loop: false,
	mode: 'lg-slide',
	speed: 120,
	supportLegacyBrowser: false,
	thumbnail: true
}

export const countryNames = {
	DE: 'Deutschland',
	CH: 'Schweiz',
	AT: 'Österreich'
}

export const routeMeta = {
	HOME: {
		title: 'Home',
		to: '/'
	},

	NEWS: {
		title: 'News',
		to: '/news/'
	},

	INFOS: {
		title: 'Infos',
		to: '/infos/'
	},

	LINEUP: {
		title: 'Line-up',
		to: '/line-up/'
	},
	LINEUP__BANDS: {
		title: 'Bands',
		to: '/line-up/bands/'
	},
	LINEUP__TIMETABLE: {
		title: 'Timetable',
		to: '/line-up/timetable/'
	},

	HISTORIE: {
		title: 'Historie',
		to: '/historie/'
	},

	RECHTLICHES: {
		title: 'Rechtliches',
		to: '/rechtliches/'
	},
	RECHTLICHES__KONTAKT: {
		title: 'Kontakt',
		to: '/kontakt/'
	},
	RECHTLICHES__AGB: {
		title: 'AGB',
		to: '/rechtliches/agb/'
	},
	RECHTLICHES__DATENSCHUTZ: {
		title: 'Datenschutz',
		to: '/rechtliches/datenschutz/'
	},
	RECHTLICHES__IMPRESSUM: {
		title: 'Impressum',
		to: '/rechtliches/impressum/'
	},

	SPONSOREN: {
		title: 'Sponsoren',
		to: '/sponsoren/'
	},

	TICKETS: {
		title: 'Tickets',
		to: '/tickets/'
	},

	TICKETS__STATUS: {
		title: 'Bestellstatus',
		to: '/tickets/status/'
	},

	MEDIEN__FOTOGALERIE: {
		title: 'Fotogalerie',
		to: '/fotogalerie/'
	},

	NEWSLETTER: {
		title: 'Newsletter',
		to: '/newsletter/'
	}
}

export const mainNavItems = [
	{ ...routeMeta.HOME },
	{ ...routeMeta.NEWS },
	{ ...routeMeta.INFOS, tabType: tabTypes.INFOS },
	{ ...routeMeta.LINEUP, tabType: tabTypes.LINEUP },
	{ ...routeMeta.TICKETS },
	{ ...routeMeta.HISTORIE, tabType: tabTypes.HISTORY }
]
