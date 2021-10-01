export default {
	mounted() {
		// this.$storybridge.resolveRelations(
		// 	['timetable_day.timetable_entry.band'],
		// 	data => {
		// 		// data.story.content has now the resolved relations
		// 		// // this.story.content = data.story.content
		// 	}
		// )

		// load the bridge only inside of Storyblok
		if (window.location.search.includes('_storyblok')) {
			this.$storybridge(
				() => {
					const { StoryblokBridge } = window

					// NOTE: handle resolveRelations like this when needed
					// const storyblokInstance = new StoryblokBridge({
					// 	resolveRelations: ['tickets.tickets_list']
					// })

					const storyblokInstance = new StoryblokBridge()

					storyblokInstance.on(
						['input', 'published', 'change'],
						async event => {
							if (event.action === 'input') {
								if (event.story.content.component === 'timetable') {
									const { data: bands } = await this.$storyapi.get(
										'cdn/stories',
										{
											filter_query: {
												component: {
													in: 'band'
												}
											},
											version:
												process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
													? 'draft'
													: 'published'
										}
									)

									event.story.content.entry.forEach((day, _indexDay) => {
										day.entry.forEach((band, _indexBand) => {
											const currentBand =
												this.story.content.entry[_indexDay].entry[_indexBand]
													.band

											// another band was selected in dropdown
											if (band.band.id !== currentBand.id) {
												const newBand = bands.stories.find(
													item => item.uuid === band.band.id
												)
												band.band.story = newBand
											} else {
												band.band = currentBand
											}
										})
									})
								}

								if (event.story.id === this.story?.id) {
									this.story.content = event.story.content
								}
							} else {
								this.$nuxt.$router.go({
									path: this.$nuxt.$router.currentRoute,
									force: true
								})
							}
						}
					)
				},
				error => {
					console.error(error)
				}
			)
		}
	}
}
