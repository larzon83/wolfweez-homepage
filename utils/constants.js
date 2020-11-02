export const baseUrl = 'https://ww-test.netlify.app' // FIXME: use env

export const siteTitle = {
	short: 'Wolfweez Openair Festival',
	long: 'Wolfweez Openair Festival 2021 | Irslingen | Festival | Live Musik'
}

// NOTE: same api-call is used inside @/modules/netlifyTomlUpdater
// -> when updating here, update there, too
export const queryHistoryYears = {
	isStartpage: 1,
	sortBy: 'slug:desc',
	startsWith: 'historie/'
}
