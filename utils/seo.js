import { baseUrl, siteTitle } from './constants'

export const ogImagesDir = 'og-images'

const defaults = {
	image: '/wolfweez-open-air-festival.png',
	imageWidth: '1200',
	imageHeight: '630',
	title: siteTitle.long,
	type: 'website'
}

export const createSEOMeta = data => {
	let metaTitle = defaults.title
	if (data && data.title) {
		metaTitle = data.title + ' - ' + siteTitle.short
	}

	let metaUrl = baseUrl
	if (data && data.url) {
		metaUrl = baseUrl + data.url
	}

	let imageAlt = defaults.title
	if (data && data.imageAlt) {
		imageAlt = data.imageAlt + ' - ' + siteTitle.short
	}

	const metaArray = [
		{
			hid: 'og:type',
			property: 'og:type',
			content: (data && data.type) || defaults.type
		},
		{
			hid: 'og:url',
			property: 'og:url',
			content: metaUrl
		},
		{
			hid: 'og:title',
			property: 'og:title',
			content: metaTitle
		},
		{
			hid: 'og:image',
			property: 'og:image',
			content: (data && data.image) || defaults.image
		},
		{
			hid: 'og:image:alt',
			property: 'og:image:alt',
			content: imageAlt
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
			content: metaUrl
		},
		{
			hid: 'twitter:title',
			name: 'twitter:title',
			content: metaTitle
		},
		{
			hid: 'twitter:image',
			name: 'twitter:image',
			content: (data && data.image) || defaults.image
		}
	]

	// default description is defined in nuxt.config.js
	if (data && data.description) {
		metaArray.push(
			{
				hid: 'description',
				name: 'description',
				content: data.description
			},
			{
				hid: 'og:description',
				name: 'og:description',
				content: data.description
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				content: data.description
			}
		)
	}

	return metaArray
}

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
	const regexSlash = /\//g
	return path.replace(regexSlash, '-')
}

export const createOgImagePath = path => {
	const newPath = removeSlashesFromStartAndEnd(path)
	return `/${ogImagesDir}/${dashifyPath(newPath)}.png`
}
