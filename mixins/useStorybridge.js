export default {
	mounted() {
		// this.$storybridge.resolveRelations(
		// 	['timetable_day.timetable_entry.band'],
		// 	data => {
		// 		// data.story.content has now the resolved relations
		// 		// // this.story.content = data.story.content
		// 	}
		// )

		// Use the input event for instant update of content
		this.$storybridge.on('input', async event => {
			if (event.story.content.component === 'timetable') {
				const { data: bands } = await this.$storyapi.get('cdn/stories', {
					filter_query: {
						component: {
							in: 'band'
						}
					},
					version:
						process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
							? 'draft'
							: 'published'
				})

				event.story.content.entry.forEach((day, _indexDay) => {
					day.entry.forEach((band, _indexBand) => {
						const currentBand = this.story.content.entry[_indexDay].entry[
							_indexBand
						].band

						// another band was selected in dropdown
						if (band.band.id !== currentBand.id) {
							const newBand = bands.stories.filter(
								item => item.uuid === band.band.id
							)
							band.band.story = newBand[0]
						} else {
							band.band = currentBand
						}
					})
				})
			}

			if (event.story.id === this.story.id) {
				this.story.content = event.story.content
			}
		})

		// Use the bridge to listen the events
		this.$storybridge.on(['published', 'change'], event => {
			// window.location.reload()
			this.$nuxt.$router.go({
				path: this.$nuxt.$router.currentRoute,
				force: true
			})
		})
	}
}
