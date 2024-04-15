import { Hono } from 'hono'
import { querySubjects } from '../models/querySubjects'
import type { Bindings, Subject } from '../types'

const route = new Hono<{ Bindings: Bindings }>()

route.get('/', async (c) => {
  const code = c.req.query('university_code')
  if (!code) {
    return c.json({ err: 'Missing university_code' }, 400)
  }
  if (!/^\d{5}$/.test(code)) {
    return c.json({ err: 'Invalid university_code' }, 400)
  }

  try {
    const subjects: Subject[] = await querySubjects(c.env.DB, code)
    return c.json({ subjects })
  } catch (e) {
    return c.json({ err: e }, 500)
  }
})

export default route
