import { SELF } from 'cloudflare:test'
import '../../src/'
import type { University } from '../types'
import { TEST_URL } from '../utils/constants'

it('should respond with university list for /universities with a valid subject_code', async () => {
  const response = await SELF.fetch(
    TEST_URL + '/universities?subject_code=1001'
  )
  const { universities } = (await response.json()) as {
    universities: University[]
  }

  expect(response.status).toBe(200)
  expect(universities).toBeDefined()
  expect(universities).toHaveLength(54)
  expect(universities[0]).toStrictEqual({
    code: '10001',
    name: { zh: '北京大学', en: 'Peking University' },
    logo: '52ac2e9a747aec013fcf5190',
    ranking: 1
  })
})

it('should respond with error for /universities without subject_code', async () => {
  const response = await SELF.fetch(TEST_URL + '/universities')

  expect(response.status).toBe(400)
  expect(await response.json()).toEqual({ err: 'Missing subject_code' })
})

it('should respond with error for /universities with an invalid subject_code', async () => {
  const response = await SELF.fetch(TEST_URL + '/universities?subject_code=110')

  expect(response.status).toBe(400)
  expect(await response.json()).toEqual({ err: 'Invalid subject_code' })
})
