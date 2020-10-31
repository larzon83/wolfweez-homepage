import { baseUrl, siteTitle } from './constants'

export const ogImagesDir = 'og-images'

const defaults = {
	description: 'bla bla bla', // TODO:
	image: '/wolfweez-open-air-festival.png',
	imageAlt: siteTitle.short,
	imageWidth: '1200',
	imageHeight: '630',
	title: siteTitle.long,
	type: 'website',
	url: baseUrl
}

export const createSEOMeta = data => [
	{
		hid: 'description',
		name: 'description',
		content: (data && data.description) || defaults.description
	},
	{
		hid: 'og:type',
		property: 'og:type',
		content: (data && data.type) || defaults.type
	},
	{
		hid: 'og:url',
		property: 'og:url',
		content: (data && baseUrl + data.url) || defaults.url
	},
	{
		hid: 'og:title',
		property: 'og:title',
		content: (data && data.title + ' - ' + siteTitle.short) || defaults.title
	},
	{
		hid: 'og:description',
		property: 'og:description',
		content: (data && data.description) || defaults.description
	},
	{
		hid: 'og:image',
		property: 'og:image',
		content: (data && data.image) || defaults.image
	},
	{
		hid: 'og:image:alt',
		property: 'og:image:alt',
		content:
			(data && data.imageAlt + ' - ' + siteTitle.short) || defaults.imageAlt
	},
	{
		hid: 'og:image:width',
		property: 'og:image:width',
		content: (data && data.imageWidth) || defaults.imageWidth
	},
	{
		hid: 'og:image:height',
		property: 'og:image:height',
		content: (data && data.imageHeight) || defaults.imageHeight
	},
	{
		hid: 'twitter:url',
		name: 'twitter:url',
		content: (data && baseUrl + data.url) || defaults.url
	},
	{
		hid: 'twitter:title',
		name: 'twitter:title',
		content: (data && data.title + ' - ' + siteTitle.short) || defaults.title
	},
	{
		hid: 'twitter:description',
		name: 'twitter:description',
		content: (data && data.description) || defaults.description
	},
	{
		hid: 'twitter:image',
		name: 'twitter:image',
		content: (data && data.image) || defaults.image
	}
]

export const removeSlashesFromStartAndEnd = routeRaw => {
	let route = routeRaw
	if (route.substr(0, 1) === '/') {
		route = route.substr(1)
	}

	if (route.substr(-1) === '/') {
		route = route.substr(0, route.length - 1)
	}
	return route
}

export const dashifyPath = path => {
	return removeSlashesFromStartAndEnd(path).replace('/', '-')
}

export const createOgImagePath = path => {
	return `/${ogImagesDir}/${dashifyPath(path)}.png`
}
