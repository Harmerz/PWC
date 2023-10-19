const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')
require('dotenv').config()

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

const authJwt = {
  verifyToken,
}
module.exports = authJwt
