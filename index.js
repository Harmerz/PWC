require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const Initial = require('./models/initial/role.initial.js')

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

var allowedOrigins = ['http://localhost:5000', 'https://pwc-be.vercel.app/']
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

//middleware
app.use(express.json())
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

app.use('/api', user)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
