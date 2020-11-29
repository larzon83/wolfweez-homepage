<script>
import Iconify from '@iconify/iconify'

export default {
	props: {
		icon: {
			type: String,
			required: true
		}
	},

	mounted() {
		console.log('icon 2:', Iconify.getIcon('mdi-light:home'))

		Iconify.loadIcons([this.icon], () => {
			console.log('Loaded icon!')
		})

		if (Iconify.iconExists('mdi-light:home')) {
			// node.appendChild(Iconify.renderSVG('mdi:home'))
			console.log('yyyyyyy')
		} else {
			console.log('noooo')
		}
	},

	render(createElement) {
		const icon = Iconify.renderIcon(this.icon, {})
		console.log(this.icon, icon)
		if (!icon) return createElement('span', this.icon)
		console.log(this.icon, icon)
		return createElement('svg', {
			attrs: icon.attributes,
			domProps: {
				innerHTML: icon.body
			}
		})
	}
}
</script>
