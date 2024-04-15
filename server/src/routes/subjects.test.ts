import { SELF } from 'cloudflare:test'
import '../../src/'
import type { Subject } from '../types'
import { TEST_URL } from '../utils/constants'

it('should respond with subject list for /subjects with a valid university_code', async () => {
  const response = await SELF.fetch(
    TEST_URL + '/subjects?university_code=10001'
  )
  const { subjects } = (await response.json()) as { subjects: Subject[] }

  expect(response.status).toBe(200)
  expect(subjects).toBeDefined()
  expect(subjects).toHaveLength(49)
  expect(subjects[0]).toStrictEqual({
    code: '0101',
    name: { zh: '哲学', en: 'Philosophy' },
    ranking: 1,
  })
})

it('should respond with error for /subjects without university_code', async () => {
  const response = await SELF.fetch(TEST_URL + '/subjects')

  expect(response.status).toBe(400)
  expect(await response.json()).toEqual({ err: 'Missing university_code' })
})

it('should respond with error for /subjects with an invalid university_code', async () => {
  const response = await SELF.fetch(TEST_URL + '/subjects?university_code=110')

  expect(response.status).toBe(400)
  expect(await response.json()).toEqual({ err: 'Invalid university_code' })
})
