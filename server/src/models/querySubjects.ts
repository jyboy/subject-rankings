import type { Subject, SubjectRow } from '../types'

export const querySQL =
  'SELECT R.subject_code, S.name_zh AS subject_name_zh, S.name_en AS subject_name_en, R.ranking FROM rankings AS R ' +
  'JOIN subjects AS S ON S.code = R.subject_code ' +
  'WHERE R.university_code = ? ' +
  'ORDER BY R.ranking, R.subject_code'

export const resultsToSubjects = (results: SubjectRow[]): Subject[] => {
  return results.map((s) => ({
    code: s.subject_code,
    name: {
      zh: s.subject_name_zh,
      en: s.subject_name_en
    },
    ranking: s.ranking
  }))
}

export const querySubjects = async (
  db: D1Database,
  university_code: string
): Promise<Subject[]> => {
  const { results } = await db
    .prepare(querySQL)
    .bind(university_code)
    .all<SubjectRow>()
  return resultsToSubjects(results)
}
