import {
	BarChart2Icon,
	ChevronRightIcon,
	FacebookIcon,
	InstagramIcon,
	XIcon
} from 'vue-feather-icons'
import IconWolf from '@/components/IconWolf'

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
				dark: '#212121',
				darkish: '#2a2c2d'
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
			chevronRight: {
				component: ChevronRightIcon
			},
			close: {
				component: XIcon
			},
			facebook: {
				component: FacebookIcon
			},
			instagram: {
				component: InstagramIcon
			},
			menu: {
				component: BarChart2Icon
			},
			wolf: {
				component: IconWolf
			}
		}
	}
}
