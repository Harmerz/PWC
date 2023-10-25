require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const Initial = require('./models/initial/role.initial.js')
const helmet = require('helmet')
const morgan = require('morgan')
const xssClean = require('xss-clean')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')

// Restrict all routes to only 100 requests per IP address every 1o minutes

// Protect against XSS attacks, should come before any routes
mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('DB CONNECTED')
    Initial()
  })
  .catch((err) => {
    console.error('UNABLE to connect to DB:', err)
  })

var allowedOrigins = ['http://localhost:3000', 'https://lensights.my.id']
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  })
)

app.use(express.json())
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 10 minutes
  max: 1000, // 100 requests per IP
})
app.use(limiter)
app.use(hpp())
app.use(helmet())
app.use(morgan('dev'))
app.use(xssClean())
app.get('/ping', (req, res) => {
  return res.status(200).send({
    status: 200,
    condition: 'success',
    message: 'PONG',
  })
})

const auth = require('./routes/auth')

app.use('/auth', auth)

const user = require('./routes/user')
const question = require('./routes/question')
app.use('/api', user)
app.use('/api', question)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
