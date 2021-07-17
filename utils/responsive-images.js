export const presetNames = {
	SPONSORS_MAIN: 'sponsors-main',
	SPONSORS_MAIN_FOOTER: 'sponsors-main-footer',
	SPONSORS_NORMAL: 'sponsors-normal',
	INFO: 'info'
}

export const presetOptions = {
	BG_POSITION_TOP: 'top center',
	BG_POSITION_CENTER: 'center center'
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
	return text.replace(/\s+/g, '') // remove whitespaces and line-breaks
}

export const presets = {
	/*
	 Mandatory keys:
	 - widths: Array of Numbers
	 - sizes: String

	 Optional keys:
	 - aspectRatio
	 - bgPosition: String
	 - contain: Boolean
	 - disableLazySrc: Boolean
	 - maxWidth: Number
	 */

	[presetNames.SPONSORS_MAIN]: {
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
		disableLazySrc: true
	},
	[presetNames.SPONSORS_NORMAL]: {
		aspectRatio: 1,
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
