import {
	AlertOctagonIcon,
	ArrowLeftIcon,
	ArrowRightIcon,
	BarChart2Icon,
	CheckCircleIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	CompassIcon,
	ExternalLinkIcon,
	FacebookIcon,
	InfoIcon,
	InstagramIcon,
	MinusIcon,
	PlusIcon,
	RefreshCwIcon,
	SendIcon,
	ShoppingCartIcon,
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
			alertOctagon: {
				component: AlertOctagonIcon
			},
			arrowLeft: {
				component: ArrowLeftIcon
			},
			arrowRight: {
				component: ArrowRightIcon
			},
			checkCircle: {
				component: CheckCircleIcon
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
			externalLink: {
				component: ExternalLinkIcon
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
			minus: {
				component: MinusIcon
			},
			plus: {
				component: PlusIcon
			},
			refresh: {
				component: RefreshCwIcon
			},
			send: {
				component: SendIcon
			},
			shoppingCart: {
				component: ShoppingCartIcon
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
