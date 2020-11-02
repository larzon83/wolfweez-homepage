// env.URL is main url of netlify site
export const baseUrl = process.env.URL || 'http://localhost:3000'

export const siteTitle = {
	short: 'Wolfweez Openair Festival',
	long: 'Wolfweez Openair Festival 2021 | Irslingen | Festival | Live Musik'
}

// NOTE: same api-call is used inside @/modules/netlifyFilesGenerator
// -> when updating here, update there, too
export const queryHistoryYears = {
	isStartpage: 1,
	sortBy: 'slug:desc',
	startsWith: 'historie/'
}
