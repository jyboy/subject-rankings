declare module 'cloudflare:test' {
  interface ProvidedEnv {
    DB: D1Database
    DB_ID: string
    CF_ACCOUNT_ID: string
    API_KEY: string
  }
}
