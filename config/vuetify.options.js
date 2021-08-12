import {
	ArrowLeftIcon,
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
		dark: true
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
			arrowLeft: {
				component: ArrowLeftIcon
			},
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
			},
			wolfNoMoon: {
				component: IconWolf,
				props: {
					showMoon: false
				}
			}
		}
	}
}
