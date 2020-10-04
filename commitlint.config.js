module.exports = {
	// Defaults of @commitlint/config-conventional
	// https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js
	extends: ['@commitlint/config-conventional'],

	// Possible rules
	// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
	rules: {
		'header-max-length': [0, 'always', 120],
		'type-enum': [
			2,
			'always',
			[
				'build',
				'chore',
				'ci',
				'deps',
				'docs',
				'feat',
				'fix',
				'improvement',
				'perf',
				'refactor',
				'revert',
				'style',
				'test',
				'wip'
			]
		]
	}
}
