import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
  console.log('logging')
  req.myData = 'my hello'
  next()
}

router.get('/me', (req, res) => {
  res.send({ me: 'Puru' })
})

//cats
const routes = [
  'get /cat',
  'get /cat/:id',
  'post /cat',
  'put /cat/:id',
  'delete /cat/:id'
]

router
  .route('/cat')
  .get()
  .post()

router
  .route('/cat/:id')
  .get()
  .put()
  .delete()

app.use('/api', router)

app.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.get('/data', log, (req, res) => {
  console.log(req.body)
  res.send({ message: req.myData })
})

app.post('/data', [log, log, log], (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on post 3000.')
  })
}
