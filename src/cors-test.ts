import express from 'express'

const app = express()

// Cors type imported from cors, we can declare module as well.
import cors from './cors'

cors()
cors({})

cors({
  maxAge: 10,
  credentials: true,
  optionSuccessStatus: 200
})

cors({
  methods: 'GET,POST,PUT',
  exposedHeaders: 'Content-Range,X-Content-Range',
  allowedHeaders: 'Content-Type,Authorization'
})

cors({
  methods: ['GET', 'POST', 'DELETE', 'PATCh'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

cors({ origin: true })

cors({ origin: '*' })
cors({ origin: /example\.com$/ })
cors({ origin: [/example\.com$/, 'http://localhost:3000'] })
cors({ origin: [false, 'http://localhost:3000'] })

cors({
  origin: (requestOrigin, cb) => {
    try {
      if (requestOrigin === undefined) {
        throw new Error('No Origin')
      }
      const allow = !requestOrigin || requestOrigin.indexOf('.edu') !== -1
      cb(null, allow)
      cb(null, true)
      cb(null, 'http://localhost:3000')
      cb(null, /example\.com$/)
      cb(null, [/example\.com$/, 'http://localhost:3000'])
    } catch (error) {
      cb(error)
    }
  }
})

app.use(
  cors((req, cb) => {
    if (req.query.trusted) {
      cb(null, { origin: true, credentials: true })
    } else {
      cb(new Error('Not Trusted!'))
    }
  })
)

cors({ preflightContinue: true })
