import { BarChart2Icon, ChevronRightIcon, XIcon } from 'vue-feather-icons'

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
				primary: '#e05e5e',
				bright: '#ebebee',
				dark: '#212121'
			}
		}
	},

	breakpoint: {
		thresholds: {
			xs: 340,
			sm: 600,
			md: 800,
			lg: 1156
		}
	},

	icons: {
		values: {
			menu: {
				component: BarChart2Icon
			},
			chevronRight: {
				component: ChevronRightIcon
			},
			close: {
				component: XIcon
			}
		}
	}
}
