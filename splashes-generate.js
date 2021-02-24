// https://github.com/onderceylan/pwa-asset-generator

// npx pwa-asset-generator icon-splashscreen.svg ./splashscreens -b '#212121' -i splashes.html
// --single-quotes --splash-only --path-override "/splashscreens" --padding "calc(50vh - 17%) calc(50vw - 30%)"

const { resolve } = require('path')
const fse = require('fs-extra')
const pwaAssetGenerator = require('pwa-asset-generator')

;(async () => {
	const { savedImages } = await pwaAssetGenerator.generateImages(
		'./static/icon-splashscreen.svg',
		'./static/splashscreens',
		{
			background: '#212121',
			padding: 'calc(50vh - 17%) calc(50vw - 30%)',
			pathOverride: '/splashscreens',
			singleQuotes: true,
			splashOnly: true
		}
	)
	const imgs = createNuxtMeta(savedImages)

	const splashesFile = resolve(__dirname, 'splashes.js')
	const exportString = 'export const splashscreens = '
	fse.writeFileSync(splashesFile, exportString + JSON.stringify(imgs), 'UTF-8')
})()

const createNuxtMeta = imgs => {
	return imgs.map(img => {
		const filename = img.path.replace('static', '')
		const width = img.orientation === 'portrait' ? img.width : img.height
		const height = img.orientation === 'portrait' ? img.height : img.width
		return {
			hid: img.name,
			rel: 'apple-touch-startup-image',
			href: filename,
			media: `(device-width: ${
				width / img.scaleFactor
			}px) and (device-height: ${
				height / img.scaleFactor
			}px) and (-webkit-device-pixel-ratio: ${
				img.scaleFactor
			}) and (orientation: ${img.orientation})`
		}
	})
}
