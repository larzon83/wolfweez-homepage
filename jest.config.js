module.exports = {
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^~/(.*)$': '<rootDir>/$1',
		'^vue$': 'vue/dist/vue.common.js'
	},
	moduleFileExtensions: ['js', 'vue', 'json'],
	testPathIgnorePatterns: ['node_modules', '<rootDir>/cypress/'],
	transform: {
		'^.+\\.js$': 'babel-jest',
		'.*\\.(vue)$': '@vue/vue2-jest'
	},
	collectCoverage: false,
	collectCoverageFrom: [
		'<rootDir>/components/**/*.vue',
		'<rootDir>/pages/**/*.vue'
	],
	testEnvironment: 'jsdom'
}
