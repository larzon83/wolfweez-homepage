CountDown.vue
<template>
	<div class="countdown-wrapper">
		<client-only>
			<div class="countdown-inner">
				<flip-countdown
					deadline="2022-07-01 20:00:00"
					:labels="timerLabels"
					class="px-2"
				></flip-countdown>
			</div>
		</client-only>
	</div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown'

export default {
	name: 'CountDown',
	components: {
		FlipCountdown
	},

	data() {
		return {
			timerLabels: {
				days: 'Tage',
				hours: 'Stunden',
				minutes: 'Min.',
				seconds: 'Sek.'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.countdown-wrapper {
	min-height: 103px;

	// prevent flickering of icons in buttons down the page
	.countdown-inner {
		overflow: hidden;
		transform-style: preserve-3d;
	}

	@media (min-width: 360px) {
		min-height: 110px;
	}
	@media (min-width: 460px) {
		min-height: 117px;
	}
	@media (min-width: 1000px) {
		min-height: 140px;
	}
}

.flip-clock ::v-deep {
	.flip-card {
		@media (max-width: 459px) {
			font-size: 1.9rem !important;
		}
		@media (max-width: 359px) {
			font-size: 1.6rem !important;
		}
	}

	.flip-card__top,
	.flip-card__bottom,
	.flip-card__back-bottom,
	.flip-card__back::before,
	.flip-card__back::after {
		border-radius: 3px;
		width: 2.45em;
	}
	.flip-card__top {
		background: getcolor('prime');
		color: getcolor('bright');
	}
	.flip-card__bottom,
	.flip-card__back-bottom {
		background: getcolor('prime');
		color: getcolor('bright');
		border-top-color: rgba(0, 0, 0, 0.15);
	}
	.flip-card__back::before,
	.flip-card__back::after {
		background: #cc5555;
		color: #d1d1d4;
	}
}
</style>
