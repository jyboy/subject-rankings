import { env } from 'cloudflare:test'
import { querySubjects } from './querySubjects'

it('should list subjects of the same university', async () => {
  const subjects = await querySubjects(env.DB, '10001')

  expect(subjects).toBeDefined()
  expect(subjects).toHaveLength(49)
  expect(subjects[0]).toStrictEqual({
    code: '0101',
    name: { zh: '哲学', en: 'Philosophy' },
    ranking: 1
  })
})
