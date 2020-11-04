export default {
	mounted() {
		// Use the input event for instant update of content
		this.$storybridge.on('input', event => {
			// console.log('event.story.content:', event.story)
			// TODO: make api call here with this.$storiapi to get resolved value for changed band
			if (event.story.content.component === 'timetable') {
				event.story.content.entry.forEach((day, _indexDay) => {
					day.entry.forEach((band, _indexBand) => {
						band.band = this.story.content.entry[_indexDay].entry[
							_indexBand
						].band
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
