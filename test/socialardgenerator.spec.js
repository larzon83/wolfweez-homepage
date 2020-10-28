import { isTest } from '~/modules/socialCardGenerator/module'

describe('socialCardGenerator', () => {
	describe('isTest', () => {
		it('must be set to false', () => {
			expect(isTest).toBe(false)
		})
	})
})
