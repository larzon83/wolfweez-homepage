import StoryblokClient from 'storyblok-js-client'
import { getSubNavRedirect, slashify } from './../../utils/index'
import { routeMeta } from './../../utils/constants'

export default function () {
	this.nuxt.hook('generate:before', async context => {
		const securityHeaders = [
			// default headers copied from "@aceforth/nuxt-netlify" module
			'Referrer-Policy: origin',
			'X-Content-Type-Options: nosniff',
			'X-XSS-Protection: 1; mode=block'
		]

		if (process.env.NUXT_ENV_IS_SPA === 'true') {
			securityHeaders.push(
				'X-Frame-Options: ALLOW-FROM https://app.storyblok.com/',
				'Content-Security-Policy: frame-ancestors https://app.storyblok.com'
			)
		} else {
			securityHeaders.push('X-Frame-Options: DENY')
		}

		const netlifyRedirects = [
			{
				from: '/api/*',
				to: '/.netlify/functions/:splat',
				status: 200,
				force: true
			},

			// old site
			// NOTE: the following paths also exist in the new site and are therefor not set here:
			// - "/line-up"
			// - "/sponsoren"

			// TODO: enable redirect again once the bandcontest is over
			// {
			// 	from: '/bandcontest',
			// 	to: '/',
			// 	force: true
			// },
			// TODO: enable redirect again once the shirts is over
			// {
			// 	from: '/shirts',
			// 	to: '/',
			// 	force: true
			// },
			// TODO: enable redirect again once the winterspecial 2023 is over
			// {
			// 	from: '/winterspecial',
			// 	to: '/',
			// 	force: true
			// },
			{
				from: '/bands',
				to: routeMeta.LINEUP__BANDS.to,
				force: true
			},
			{
				from: '/timetable',
				to: routeMeta.LINEUP__TIMETABLE.to,
				force: true
			},
			{
				from: '/agbs',
				to: routeMeta.RECHTLICHES__AGB.to,
				force: true
			},
			{
				from: '/gallerie',
				to: routeMeta.MEDIEN__FOTOGALERIE.to,
				force: true
			},
			{
				from: '/info',
				to: routeMeta.INFOS.to,
				force: true
			},
			{
				from: '/uebers-festival',
				to: `${routeMeta.INFOS.to}allgemein/`,
				force: true
			},
			{
				from: '/anfahrt',
				to: `${routeMeta.INFOS.to}anreise/`,
				force: true
			},
			{
				from: '/faq',
				to: `${routeMeta.INFOS.to}faq/`,
				force: true
			}
		]

		if (process.env.NUXT_ENV_IS_SPA === 'true') {
			netlifyRedirects.push({
				from: '/*',
				to: '/index.html',
				status: 200
			})
		}

		if (process.env.NUXT_ENV_IS_SPA !== 'true') {
			const client = new StoryblokClient({
				accessToken: process.env.STORYBLOK_TOKEN
			})

			const version =
				process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
					? 'draft'
					: 'published'

			// --------------------------------------------------------------

			// known, up-front redirects
			netlifyRedirects.push(
				{
					from: routeMeta.LINEUP.to,
					to: routeMeta.LINEUP__BANDS.to,
					force: true
				},
				{
					from: routeMeta.RECHTLICHES.to,
					to: routeMeta.RECHTLICHES__AGB.to,
					force: true
				}
			)

			// --------------------------------------------------------------

			// history redirect
			const { data: historicFestivals } = await client.get('cdn/stories', {
				filter_query: {
					component: {
						in: 'config'
					}
				},
				is_startpage: 1,
				sort_by: 'slug:desc',
				version
			})

			netlifyRedirects.push(getSubNavRedirect(historicFestivals.stories))

			// --------------------------------------------------------------

			// info redirect
			const { data: infoPages } = await client.get('cdn/stories', {
				starts_with: 'infos/',
				is_startpage: 0,
				version
			})

			netlifyRedirects.push(getSubNavRedirect(infoPages.stories))

			// --------------------------------------------------------------

			// get all bands, even the ones in "historie" folder
			const { data: allBands } = await client.get('cdn/stories', {
				filter_query: {
					component: {
						in: 'band'
					}
				},
				version
			})

			// get bands of current festival
			const { data: activeBands } = await client.get('cdn/stories', {
				starts_with: 'line-up/bands/',
				is_startpage: 0,
				version
			})

			// find out, which bands are in "historie" folder and need a redirect
			// "old" bands -> all available bands MINUS current active bands
			const oldBands = allBands.stories.filter(band => {
				const active = activeBands.stories.find(item => item.uuid === band.uuid)
				return !active
			})

			const oldBandsWithoutDuplicates = []
			oldBands.forEach(ob => {
				if (!oldBandsWithoutDuplicates.find(item => item.slug === ob.slug)) {
					oldBandsWithoutDuplicates.push(ob)
				}
			})

			// redirects for "old" bands
			const bandsRedirects = oldBandsWithoutDuplicates.map(item => {
				const from = `${routeMeta.LINEUP__BANDS.to}${item.slug}`
				const to = item.full_slug.substr(0, 14) // eg "historie/2019/bands/slayer" -> "historie/2019/"
				return {
					from: slashify(from),
					to: slashify(to),
					force: true
				}
			})

			if (bandsRedirects.length) {
				netlifyRedirects.push(...bandsRedirects)
			}
		}

		this.requireModule([
			'@aceforth/nuxt-netlify',
			{
				mergeSecurityHeaders: false, // to be able to override X-Frame-Options
				redirects: netlifyRedirects,
				headers: {
					'/*': securityHeaders
				}
			}
		])
	})
}
