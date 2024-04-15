import { env } from 'cloudflare:test'
import { queryUniversities } from './queryUniversities'

it('should list universities by the same subject', async () => {
  const universities = await queryUniversities(env.DB, '1001')

  expect(universities).toBeDefined()
  expect(universities).toHaveLength(54)
  expect(universities[0]).toStrictEqual({
    code: '10001',
    name: { zh: '北京大学', en: 'Peking University' },
    logo: '52ac2e9a747aec013fcf5190',
    ranking: 1,
  })
})
