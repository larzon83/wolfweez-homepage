import fse from 'fs-extra'
const { resolve } = require('path')

export default function () {
	this.nuxt.hook('build:before', async context => {
		const fontDefs = require('../../config/font-sizes')

		let output = ''

		Object.entries(fontDefs).forEach(([key, value]) => {
			output += '$font_' + key + ': ' + value + ';\n'
		})

		const fileName = '_vuetify-additional-vars.scss'
		await fse.outputFile(resolve(__dirname, fileName), output)

		// Copy '_vuetify-additional-vars.scss' to the nuxt build-dir
		this.addTemplate({
			src: resolve(__dirname, fileName),
			fileName
		})

		// New webpack-alias that points to '_vuetify-additional-vars.scss' within the nuxt build-dir
		this.extendBuild((config, ctx) => {
			config.resolve.alias.vuetifyAdditionalVars = resolve(
				this.options.buildDir,
				fileName
			)
		})
	})
}

module.exports.meta = require('./package.json')
