export const presetNames = {
	BAND_OVERVIEW: 'band-overview',
	BAND_DETAIL: 'band-detail',
	HOME_ALL_BANDS: 'home-all-bands',
	HISTORY_FLYER: 'history-flyer',
	INFO_1_OF_4: 'info-1-of-4',
	INFO_2_OF_4: 'info-2-of-4',
	INFO_3_OF_4: 'info-3-of-4',
	INFO_4_OF_4: 'info-4-of-4',
	NEWS_CARD: 'news-card',
	NEWS_DETAIL: 'news-detail',
	SPONSORS_MAIN: 'sponsors-main',
	SPONSORS_MAIN_FOOTER: 'sponsors-main-footer',
	SPONSORS_NORMAL: 'sponsors-normal',
	TICKET: 'ticket'
}

export const presetOptions = {
	BG_POSITION_TOP: 'top center',
	BG_POSITION_CENTER: 'center center'
}

export const aspectRatios = {
	BAND: 1.9048,
	NEWS_CARD: 1.9047619,
	TICKET: 1
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
	[presetNames.HOME_ALL_BANDS]: {
		imageFormat: imageFormats.JPEG,
		lazySrcMultiplier: 52,
		widths: generateWidths([
			248, 268, 288, 303, 310, 327, 360, 388, 427, 490, 527, 630
		]),
		sizes: removeClutter(`
					(max-width: 320px) 248px,
					(max-width: 340px) 268px,
					(max-width: 360px) 288px,
					(max-width: 375px) 303px,
					(max-width: 382px) 310px,
					(max-width: 399px) 327px,
					(max-width: 432px) 360px,
					(max-width: 499px) 427px,
					(max-width: 599px) 527px,
					(max-width: 783px) 490px,
					(max-width: 1139px) 388px,
					630px
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
	[presetNames.INFO_1_OF_4]: {
		bgPosition: presetOptions.BG_POSITION_TOP,
		contain: true,
		imageFormat: imageFormats.JPEG,
		widths: generateWidths([
			288, 308, 328, 343, 350, 367, 400, 467, 530, 567, 702, 944
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
					(max-width: 1139px) 702px,
					944px
					`)
	},
	[presetNames.INFO_2_OF_4]: {
		bgPosition: presetOptions.BG_POSITION_TOP,
		contain: true,
		imageFormat: imageFormats.JPEG,
		widths: generateWidths([
			253, 288, 308, 328, 339, 343, 350, 367, 400, 460, 467, 567
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
					460px
					`)
	},
	[presetNames.INFO_3_OF_4]: {
		bgPosition: presetOptions.BG_POSITION_TOP,
		contain: true,
		imageFormat: imageFormats.JPEG,
		widths: generateWidths([
			161, 218, 288, 299, 308, 328, 343, 350, 367, 400, 467, 567
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
					(max-width: 783px) 161px,
					(max-width: 1139px) 218px,
					299px
					`)
	},
	[presetNames.INFO_4_OF_4]: {
		bgPosition: presetOptions.BG_POSITION_TOP,
		contain: true,
		imageFormat: imageFormats.JPEG,
		widths: generateWidths([
			115, 158, 218, 288, 308, 328, 343, 350, 367, 400, 467, 567
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
					(max-width: 783px) 115px,
					(max-width: 1139px) 158px,
					218px
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
	[presetNames.TICKET]: {
		aspectRatio: aspectRatios.TICKET,
		eager: true,
		imageFormat: imageFormats.PNG,
		rounded: true,
		widths: generateWidths([91, 105, 115, 131]),
		sizes: removeClutter(`
					(max-width: 599px) 115px,
					(max-width: 783px) 105px,
					(max-width: 1139px) 91px,
					131px
					`)
	}
}
