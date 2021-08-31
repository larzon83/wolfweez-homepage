import {
	ArrowLeftIcon,
	BarChart2Icon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CompassIcon,
	FacebookIcon,
	InfoIcon,
	InstagramIcon,
	RefreshCwIcon,
	TwitterIcon,
	XIcon,
	YoutubeIcon
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
			chevronLeft: {
				component: ChevronLeftIcon
			},
			chevronRight: {
				component: ChevronRightIcon
			},
			compass: {
				component: CompassIcon
			},
			close: {
				component: XIcon
			},
			facebook: {
				component: FacebookIcon
			},
			info: {
				component: InfoIcon
			},
			instagram: {
				component: InstagramIcon
			},
			menu: {
				component: BarChart2Icon
			},
			refresh: {
				component: RefreshCwIcon
			},
			wolf: {
				component: IconWolf
			},
			wolfNoMoon: {
				component: IconWolf,
				props: {
					showMoon: false
				}
			},
			twitter: {
				component: TwitterIcon
			},
			youtube: {
				component: YoutubeIcon
			}
		}
	}
}
