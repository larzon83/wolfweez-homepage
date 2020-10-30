import { baseUrl, siteTitle } from './constants'

const defaults = {
	description: 'bla bla bla', // TODO:
	mainImage: '/a-lovely-image.jpg', // TODO:
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
		content: (data && data.mainImage) || defaults.mainImage
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
		content: (data && data.mainImage) || defaults.mainImage
	}
]
