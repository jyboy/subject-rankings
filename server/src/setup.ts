/* eslint-disable @typescript-eslint/consistent-type-imports */
import { env } from 'cloudflare:test'
import type {
  University,
  UniversityRow,
  Subject,
  SubjectRow,
  D1Result
} from './types'
import { CF_API_URL } from './utils/constants'

beforeEach(() => {
  vi.mock('./models/queryUniversities.ts', async (importOriginal) => {
    const mod =
      await importOriginal<typeof import('./models/queryUniversities.ts')>()
    return {
      ...mod,
      queryUniversities: vi.fn(
        async (
          _db: D1Database,
          subject_code: string
        ): Promise<University[]> => {
          const response = await fetch(
            `${CF_API_URL}/accounts/${env.CF_ACCOUNT_ID}/d1/database/${env.DB_ID}/query`,
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + env.API_KEY,
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                params: [subject_code],
                sql: mod.querySQL
              })
            }
          )

          if (response.status === 200) {
            const { result, success } =
              (await response.json()) as D1Result<UniversityRow>
            if (success) {
              return mod.resultsToUniversities(result[0].results)
            }
          }
          return []
        }
      )
    }
  })

  vi.mock('./models/querySubjects.ts', async (importOriginal) => {
    const mod =
      await importOriginal<typeof import('./models/querySubjects.ts')>()
    return {
      ...mod,
      querySubjects: vi.fn(
        async (_db: D1Database, subject_code: string): Promise<Subject[]> => {
          const response = await fetch(
            `${CF_API_URL}/accounts/${env.CF_ACCOUNT_ID}/d1/database/${env.DB_ID}/query`,
            {
              method: 'POST',
              headers: {
                Authorization: 'Bearer ' + env.API_KEY,
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                params: [subject_code],
                sql: mod.querySQL
              })
            }
          )

          if (response.status === 200) {
            const { result, success } =
              (await response.json()) as D1Result<SubjectRow>
            if (success) {
              return mod.resultsToSubjects(result[0].results)
            }
          }
          return []
        }
      )
    }
  })
})
