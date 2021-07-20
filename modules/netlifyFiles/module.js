import StoryblokClient from 'storyblok-js-client'
import { getInfoRedirect } from './../../utils/index'
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
				'X-Frame-Options: ALLOW-FROM https://app.storyblok.com/'
			)
			securityHeaders.push(
				'Content-Security-Policy: frame-ancestors https://app.storyblok.com'
			)
		} else {
			securityHeaders.push('X-Frame-Options: DENY')
		}

		const netlifyRedirects = [
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

			// get main festival-config -> extract main meta-description
			// const { data: config } = await client.get('cdn/stories/config', {
			// 	version
			// })
			// metaDescription: config.story.content.description_meta || siteTitle.long

			// --------------------------------------------------------------

			// get all history years -> most recend one will be used in netlify redirects
			const { data: historyYears } = await client.get('cdn/stories', {
				starts_with: 'historie/',
				is_startpage: 1,
				sort_by: 'slug:desc',
				version
			})

			const historyRedirect = {
				from: routeMeta.HISTORIE.to,
				to: `${routeMeta.HISTORIE.to}${historyYears.stories[0].slug}/`,
				force: true
			}

			netlifyRedirects.push(historyRedirect)

			// --------------------------------------------------------------

			// get all info-pages
			const { data: infoPages } = await client.get('cdn/stories', {
				starts_with: 'infos/',
				is_startpage: 0,
				version
			})

			netlifyRedirects.push(getInfoRedirect(infoPages.stories))

			// --------------------------------------------------------------

			// get all bands, even the ones in historie folders
			const { data: allBands } = await client.get('cdn/stories', {
				filter_query: {
					component: {
						in: 'band'
					}
				},
				version
			})

			// get bands of the current festival
			const { data: activeBands } = await client.get('cdn/stories', {
				starts_with: 'line-up/bands/',
				is_startpage: 0,
				version
			})

			// find out, which bands are in historie folder and need a redirect
			// -> all available bands - current active bands = 'old' bands
			const filteredBandsRedirects = allBands.stories.filter(band => {
				const active = activeBands.stories.filter(
					item => item.uuid === band.uuid
				)
				return !active.length
			})

			// create redirects of 'old' bands for netlify redirects
			const bandsRedirects = filteredBandsRedirects.map(item => {
				const to = item.full_slug.substr(0, 14) // -> eg "/historie/2019/"
				return {
					from: `${routeMeta.LINEUP__BANDS.to}${item.slug}`,
					to: `/${to}`,
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
