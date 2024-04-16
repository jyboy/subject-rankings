export type UniversityRow = {
  university_code: string
  university_name_zh: string
  university_name_en: string
  university_logo: string
  ranking: number
}

export type SubjectRow = {
  subject_code: string
  subject_name_zh: string
  subject_name_en: string
  ranking: number
}

type Row = UniversityRow | SubjectRow

export interface D1Result<T extends Row> {
  success: boolean
  result: [
    {
      results: T[]
    }
  ]
  errors: []
  messages: []
}
