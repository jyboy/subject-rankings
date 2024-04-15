import { Hono } from 'hono'
import { cors } from 'hono/cors'
import subjects from './routes/subjects'
import universities from './routes/universities'

const app = new Hono()

app.get('/', (c) => c.text('👋 Subject Rankings APIs'))
app.notFound((c) => c.json({ err: 'Not found' }, 404))

app.use(
  '/*',
  cors({
    origin: ['http://127.0.0.1:10086', 'https://subject-rankings.pages.dev'],
    allowMethods: ['GET', 'HEAD'],
    credentials: false,
    maxAge: 432000,
  })
)

app.route('/universities', universities)
app.route('/subjects', subjects)

export default app
