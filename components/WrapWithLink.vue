<script>
export default {
	name: 'WrapWithLink',
	functional: true,
	props: {
		href: {
			type: String,
			default: ''
		},
		cssClass: {
			type: String,
			default: ''
		}
	},

	// https://vuejs.org/v2/guide/render-function.html#Functional-Components
	// https://jsfiddle.net/en1zdj5k/

	render(h, { props, children, slots }) {
		return props.href
			? h(
					'a',
					{
						attrs: {
							href: props.href,
							rel: 'noreferrer',
							target: '_blank',
							class: props.cssClass
						}
					},
					children
			  )
			: slots().default[0]
	}
}
</script>
