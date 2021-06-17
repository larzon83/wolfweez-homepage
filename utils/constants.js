// env.URL is main url of netlify site
export const baseUrl = process.env.URL || 'http://localhost:3000'

export const siteTitle = {
	short: 'Wolfweez Openair Festival',
	long: 'Wolfweez Openair Festival 2021 | Irslingen | Festival | Live Musik'
}

export const tabTypes = {
	HISTORY: 'history',
	INFOS: 'infos',
	LINEUP: 'lineup'
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

	TICKETS: {
		title: 'Tickets',
		to: '/tickets/'
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
	{ ...routeMeta.INFOS },
	{ ...routeMeta.LINEUP },
	{ ...routeMeta.TICKETS },
	{ ...routeMeta.HISTORIE }
]
