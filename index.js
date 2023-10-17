require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000


//middleware
app.use(express.json())
app.get('/ping', (req, res) => {
  return res.status(200).send({
    status: 200,
    condition: 'success',
    message: 'PONG',
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
