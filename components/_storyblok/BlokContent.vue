<template>
	<div v-editable="content">
		<!-- <div class="pb-6">
			<h1>{{ content.headline }}</h1>
		</div> -->

		<div
			v-for="(blok, index) in computedBlocks"
			:key="`blok-content-${blok._uid}`"
			:class="[index === 0 && blok.headline_inset ? 'mt-n3' : 'mt-0']"
		>
			<h2 v-if="blok.headline && !blok.headline_inset">{{ blok.headline }}</h2>
			<v-row
				justify="center"
				:class="blok.containerFlexDirection"
				class="flex-column-reverse my-0"
			>
				<v-col
					v-if="blok.hasPics"
					cols="12"
					:md="blok.containerImgCols"
					class="pt-0 pt-md-3"
				>
					<v-row justify="start" :class="blok.picsFlexDirection" class="my-0">
						<v-col
							v-for="pic in blok.pics"
							:key="`blok-pic-${pic.id}`"
							cols="12"
							:md="blok.picsColsMd"
							:class="{
								'pb-0': blok.pics_arrangement === 'top',
								'pt-0': blok.pics_arrangement === 'bottom'
							}"
						>
							<SbImage :pic="pic" :preset="presetInfo" />
						</v-col>
					</v-row>
				</v-col>
				<v-col
					v-if="blok.text"
					cols="12"
					:md="blok.containerTextCols"
					:class="[
						blok.pics_arrangement === 'bottom' ? 'pb-0' : 'pb-0 pb-md-3'
					]"
				>
					<h2 v-if="blok.headline && blok.headline_inset" class="pb-3">
						{{ blok.headline }}
					</h2>
					<rich-text-renderer :document="blok.text" />
				</v-col>
			</v-row>
		</div>
	</div>
</template>

<script>
import { presetNames } from '~/utils/responsive-images'

export default {
	name: 'BlokContent',
	props: {
		content: {
			type: Object,
			required: true
		}
	},

	computed: {
		computedBlocks() {
			return this.content.bloks.map(blok => {
				const countPics = blok.pics?.length
				const layout = this.getLayout(countPics, blok.pics_arrangement)
				blok.containerFlexDirection = layout.containerFlexDirection
				blok.containerImgCols = layout.containerImgCols
				blok.containerTextCols = layout.containerTextCols
				blok.picsFlexDirection = layout.picsFlexDirection
				blok.picsColsMd = layout.picsColsMd
				blok.hasPics = !!countPics
				return blok
			})
		}
	},

	created() {
		this.presetInfo = presetNames.INFO
	},

	methods: {
		getLayout(countPics, picsArrangement = '') {
			let containerFlexDirection = 'flex-md-row'
			let containerImgCols = '4'
			let containerTextCols = '8'
			let picsFlexDirection = 'flex-md-row'
			let picsColsMd = '12'

			if (!countPics) {
				containerTextCols = '12'
			} else {
				if (picsArrangement === 'left') {
					picsFlexDirection = 'flex-md-column'
					picsColsMd = '12'
				}

				if (picsArrangement === 'right') {
					containerFlexDirection = 'flex-md-row-reverse'
					picsFlexDirection = 'flex-md-column'
					picsColsMd = '12'
				}

				if (picsArrangement === 'top') {
					containerFlexDirection = 'flex-md-column'
					containerImgCols = '12'
					containerTextCols = '12'
					picsColsMd = (12 / countPics).toString()
				}

				if (picsArrangement === 'bottom') {
					containerFlexDirection = 'flex-md-column-reverse'
					containerImgCols = '12'
					containerTextCols = '12'
					picsColsMd = (12 / countPics).toString()
				}
			}

			return {
				containerFlexDirection,
				containerImgCols,
				containerTextCols,
				picsFlexDirection,
				picsColsMd
			}
		}
	}
}
</script>
