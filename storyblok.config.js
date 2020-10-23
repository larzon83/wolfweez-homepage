// docs: https://github.com/maoberlehner/storyblok-migrate
// tutorial: https://www.storyblok.com/tp/content-and-component-migrations-with-storyblok-migrate
module.exports = {
	backupDirectory: 'storyblok/backup',
	componentDirectory: 'storyblok',
	dryRun: process.argv.includes('--dry-run'),
	oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
	spaceId: process.env.STORYBLOK_SPACE_ID
}
