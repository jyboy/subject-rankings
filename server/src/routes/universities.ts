import { Hono } from 'hono'
import { queryUniversities } from '../models/queryUniversities'
import type { Bindings, University } from '../types'

const route = new Hono<{ Bindings: Bindings }>()

route.get('/', async (c) => {
  const code = c.req.query('subject_code')
  if (!code) {
    return c.json({ err: 'Missing subject_code' }, 400)
  }
  if (!/^\d{4}$/.test(code)) {
    return c.json({ err: 'Invalid subject_code' }, 400)
  }

  try {
    const universities: University[] = await queryUniversities(c.env.DB, code)
    return c.json({ universities })
  } catch (e) {
    return c.json({ err: e }, 500)
  }
})

export default route
