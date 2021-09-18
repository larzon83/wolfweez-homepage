export const presetNames = {
	BAND_OVERVIEW: 'band-overview',
	BAND_DETAIL: 'band-detail',
	HISTORY_FLYER: 'history-flyer',
	INFO: 'info',
	NEWS_CARD: 'news-card',
	NEWS_DETAIL: 'news-detail',
	SPONSORS_MAIN: 'sponsors-main',
	SPONSORS_MAIN_FOOTER: 'sponsors-main-footer',
	SPONSORS_NORMAL: 'sponsors-normal'
}

export const presetOptions = {
	BG_POSITION_TOP: 'top center',
	BG_POSITION_CENTER: 'center center'
}

export const aspectRatios = {
	BAND: 1.9048,
	NEWS_CARD: 1.9047619
}

export const imageFormats = {
	JPEG: 'jpeg',
	PNG: 'png',
	WEBP: 'webp'
}

const generateWidths = rawWidths => {
	const retinaWidths = []
	for (const w of rawWidths) {
		const doubledWidth = w * 2
		if (!rawWidths.includes(doubledWidth)) {
			retinaWidths.push(doubledWidth)
		}
	}
	return {
		srcset: [...rawWidths, ...retinaWidths].sort((a, b) => a - b),
		defaultSrc: rawWidths[rawWidths.length - 1]
	}
}

const removeClutter = text => {
	return text.replace(/\s+/g, ' ').trim() // remove whitespaces and line-breaks
}

export const presets = {
	/*
	 Mandatory keys:
	 - widths: Array of Numbers
	 - sizes: String

	 Optional keys:
	 - aspectRatio: Number || String
	 - bgPosition: String
	 - contain: Boolean
	 - disableLazySrc: Boolean
	 - eager: Boolean
	 - imageFormat: <enum>imageFormats
	 - lazySrcMultiplier: Number
	 - maxWidth: Number
	 - rounded: Boolean
	 */

	[presetNames.BAND_OVERVIEW]: {
		aspectRatio: aspectRatios.BAND,
		eager: true,
		imageFormat: imageFormats.JPEG,
		lazySrcMultiplier: 52,
		widths: generateWidths([
			253, 288, 300, 308, 328, 339, 343, 350, 367, 400, 467, 567
		]),
		sizes: removeClutter(`
					(max-width: 320px) 288px,
					(max-width: 340px) 308px,
					(max-width: 360px) 328px,
					(max-width: 375px) 343px,
					(max-width: 382px) 350px,
					(max-width: 399px) 367px,
					(max-width: 432px) 400px,
					(max-width: 499px) 467px,
					(max-width: 599px) 567px,
					(max-width: 783px) 253px,
					(max-width: 1139px) 339px,
					300px
					`)
	},
	[presetNames.BAND_DETAIL]: {
		aspectRatio: aspectRatios.BAND,
		eager: true,
		imageFormat: imageFormats.JPEG,
		lazySrcMultiplier: 52,
		rounded: true,
		widths: generateWidths([
			288, 308, 328, 343, 350, 367, 400, 467, 530, 567, 622
		]),
		sizes: removeClutter(`
					(max-width: 320px) 288px,
					(max-width: 340px) 308px,
					(max-width: 360px) 328px,
					(max-width: 375px) 343px,
					(max-width: 382px) 350px,
					(max-width: 399px) 367px,
					(max-width: 432px) 400px,
					(max-width: 499px) 467px,
					(max-width: 599px) 567px,
					(max-width: 783px) 530px,
					(max-width: 1139px) 400px,
					622px
					`)
	},
	[presetNames.HISTORY_FLYER]: {
		eager: true,
		imageFormat: imageFormats.JPEG,
		lazySrcMultiplier: 14,
		rounded: true,
		widths: generateWidths([157, 206, 210, 228, 252, 280, 283]),
		sizes: removeClutter(`
					(max-width: 320px) 210px,
					(max-width: 344px) 228px,
					(max-width: 376px) 252px,
					(max-width: 599px) 280px,
					(max-width: 783px) 157px,
					(max-width: 1139px) 206px,
					283px
					`)
	},
	[presetNames.NEWS_CARD]: {
		aspectRatio: aspectRatios.NEWS_CARD,
		eager: true,
		imageFormat: imageFormats.JPEG,
		lazySrcMultiplier: 10,
		widths: generateWidths([
			288, 300, 308, 328, 339, 343, 350, 367, 400, 467, 530, 567
		]),
		sizes: removeClutter(`
					(max-width: 320px) 288px,
					(max-width: 340px) 308px,
					(max-width: 360px) 328px,
					(max-width: 375px) 343px,
					(max-width: 382px) 350px,
					(max-width: 399px) 367px,
					(max-width: 432px) 400px,
					(max-width: 499px) 467px,
					(max-width: 599px) 567px,
					(max-width: 783px) 530px,
					(max-width: 1139px) 339px,
					300px
					`)
	},
	[presetNames.NEWS_DETAIL]: {
		eager: true,
		imageFormat: imageFormats.JPEG,
		lazySrcMultiplier: 10,
		rounded: true,
		widths: generateWidths([
			288, 308, 328, 343, 350, 367, 400, 467, 567, 490, 662, 904
		]),
		sizes: removeClutter(`
					(max-width: 320px) 288px,
					(max-width: 340px) 308px,
					(max-width: 360px) 328px,
					(max-width: 375px) 343px,
					(max-width: 382px) 350px,
					(max-width: 399px) 367px,
					(max-width: 432px) 400px,
					(max-width: 499px) 467px,
					(max-width: 599px) 567px,
					(max-width: 783px) 490px,
					(max-width: 1139px) 662px,
					904px
					`)
	},
	[presetNames.SPONSORS_MAIN]: {
		contain: true,
		disableLazySrc: true,
		maxWidth: 300,
		widths: generateWidths([123, 166, 226, 250, 300]),
		sizes: removeClutter(`
					(max-width: 322px) 250px,
					(max-width: 599px) 300px,
					(max-width: 783px) 123px,
					(max-width: 1139px) 166px,
					226px
					`)
	},
	[presetNames.SPONSORS_MAIN_FOOTER]: {
		contain: true,
		disableLazySrc: true
		// eager: true // FIXME: re-enable after dropping v-img
	},
	[presetNames.SPONSORS_NORMAL]: {
		aspectRatio: 1,
		contain: true,
		disableLazySrc: true,
		widths: generateWidths([123, 166, 226, 250, 300]),
		sizes: removeClutter(`
					(max-width: 322px) 250px,
					(max-width: 599px) 300px,
					(max-width: 783px) 123px,
					(max-width: 1139px) 166px,
					226px
					`)
	},
	[presetNames.INFO]: {
		bgPosition: presetOptions.BG_POSITION_TOP,
		contain: true,
		widths: generateWidths([123, 166, 226, 250, 300]),
		sizes: removeClutter(`
					(max-width: 322px) 250px,
					(max-width: 599px) 300px,
					(max-width: 783px) 123px,
					(max-width: 1139px) 166px,
					226px
					`)
	}
}
