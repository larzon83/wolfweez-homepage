// env.URL is main url of netlify site
// TODO: remove this replace -> https-bug fixed, see: https://github.com/netlify/build/issues/3771
let netlifyUrl = process.env.URL
if (netlifyUrl) {
	netlifyUrl = netlifyUrl.replace('http://', 'https://')
}
export const baseUrl = netlifyUrl || 'http://localhost:3000'

export const siteTitle = {
	short: 'Wolfweez Openair Festival',
	long: 'Wolfweez Openair Festival | Irslingen | Festival | Live Musik'
}

export const siteDescription =
	'Das Wolfweez Openair Festival in Irslingen bei Rottweil – alle Infos zum Festival, Line-up, Tickets, Fotos & News. 2 Tage Rock, Metal & Blasmusik vom Feinsten!'

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
	backdropDuration: 200,
	download: true,
	dynamic: true,
	fullScreen: true,
	hideBarsDelay: 3000,
	hideControlOnEnd: true,
	licenseKey: '1234-0000-000-0000', // TODO:
	loop: false,
	supportLegacyBrowser: false,
	swipeThreshold: 170,
	mobileSettings: {
		allowMediaOverlap: true,
		controls: false,
		download: true,
		fullScreen: true,
		showCloseIcon: true,
		toggleThumb: true
	}
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
	},

	BANDCONTEST: {
		title: 'Bandcontest',
		to: '/bandcontest/'
	},

	WINTERSPECIAL: {
		title: 'Winterspecial',
		to: '/winterspecial/'
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
