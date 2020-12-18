import { BarChart2Icon, XIcon } from 'vue-feather-icons'

export default {
	theme: {
		options: {
			customProperties: true,
			variations: false
		},
		dark: true,
		themes: {
			dark: {
				anchor: '#e05e5e',
				primary: '#e05e5e'
			}
		}
	},

	breakpoint: {
		thresholds: {
			xs: 340,
			sm: 540,
			md: 800,
			lg: 1280
		}
	},

	icons: {
		values: {
			menu: {
				component: BarChart2Icon
			},
			close: {
				component: XIcon
			}
		}
	}
}
