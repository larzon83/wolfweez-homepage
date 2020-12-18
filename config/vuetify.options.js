import IconAirplay from '@/components/IconAirplay'

import IconifyIcon2 from '@/components/IconifyIcon2'
// import IconifyIcon3 from '@/components/IconifyIcon3'
// import homeIconData from '@iconify-icons/mdi-light/home'
import homeIconData from '@iconify/icons-mdi-light/home'
import iconAperture from '@iconify/icons-bx/bx-aperture'
import iconMenu from '@iconify/icons-bx/bx-menu-alt-right'

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
		component: IconifyIcon2,
		iconfont: 'mdi-light',
		values: {
			home: {
				component: IconifyIcon2,
				props: {
					// icon: 'mdi-light:home'
					icon: homeIconData
				}
			},
			aperture: {
				component: IconifyIcon2,
				props: {
					icon: iconAperture
				}
			},
			menu: {
				component: IconifyIcon2,
				props: {
					icon: iconMenu
				}
			},
			airplay: {
				component: IconAirplay
			}
		}
	}
}
