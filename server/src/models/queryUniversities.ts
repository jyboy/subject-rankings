import type { University, UniversityRow } from '../types'

export const querySQL =
  'SELECT R.university_code, U.name_zh AS university_name_zh, U.name_en AS university_name_en, U.logo AS university_logo, R.ranking FROM rankings AS R ' +
  'JOIN universities AS U ON U.code = R.university_code ' +
  'WHERE R.subject_code = ? ' +
  'ORDER BY R.ranking, R.university_code'

export const resultsToUniversities = (
  results: UniversityRow[]
): University[] => {
  return results.map((u) => ({
    code: u.university_code,
    name: {
      zh: u.university_name_zh,
      en: u.university_name_en
    },
    logo: u.university_logo,
    ranking: u.ranking
  }))
}

export const queryUniversities = async (
  db: D1Database,
  subject_code: string
): Promise<University[]> => {
  const { results } = await db
    .prepare(querySQL)
    .bind(subject_code)
    .all<UniversityRow>()
  return resultsToUniversities(results)
}
