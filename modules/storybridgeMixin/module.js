const { resolve, join } = require('path')

export default function () {
	this.nuxt.hook('build:before', context => {
		const namespace = 'storybridgeMixin'
		let mixinPath = 'mixin_dummy'

		if (
			process.env.NODE_ENV === 'development' ||
			process.env.NUXT_ENV_IS_SPA === 'true'
		) {
			mixinPath = 'mixin'
		}

		const fileName = 'useStorybridge.js'
		this.addTemplate({
			src: resolve(__dirname, `${mixinPath}/${fileName}`),
			fileName: join(namespace, fileName)
		})

		this.extendBuild((config, ctx) => {
			config.resolve.alias[`${namespace}`] = resolve(
				this.options.buildDir,
				'./' + namespace
			)
		})
	})
}

module.exports.meta = require('./package.json')
