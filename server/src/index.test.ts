import { SELF } from 'cloudflare:test'
import '../src/'
import { TEST_URL } from './utils/constants'

it('should respond with a welcome message for /', async () => {
  const response = await SELF.fetch(TEST_URL + '/')

  expect(response.status).toBe(200)
  expect(await response.text()).toBe('👋 Subject Rankings APIs')
})

it('should respond with 404 for /not-found', async () => {
  const response = await SELF.fetch(TEST_URL + '/not-found')

  expect(response.status).toBe(404)
  expect(await response.json()).toEqual({ err: 'Not found' })
})
