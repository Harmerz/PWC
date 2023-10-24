const User = require('../models/user')
const Role = require('../models/role')
const { sendVerificationMail } = require('../utils/sendVerificationEmail')

require('dotenv').config()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const crypto = require('crypto')

exports.signup = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    const date = new Date()
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 8),
      emailToken: crypto.randomBytes(64).toString('hex'),
      sendVerify: date,
    })
    const roles = await Role.findOne({ name: 'user' })
    console.log(roles)
    user.roles = [roles._id]
    await user.save()
    // Send success response
    sendVerificationMail(user)

    res.status(201).json({
      message: 'User created successfully',
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
    return
  }
}

exports.verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken
    if (!emailToken) return res.status(404).json('Email Token not Found')
    const user = await User.findOne({ emailToken })
    if (user) {
      user.emailToken = null
      user.isVerified = true

      await user.save()

      res.status(200).send('Email Verify Success')
    } else {
      res.status(404).send('Email Verification Not Found')
    }
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

let refreshTokens = []

exports.signin = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    const Finder = {
      email: req.body.email,
    }
    const user = await User.findOne(Finder)

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }
    const accessToken = jwt.sign(
      {
        type: 'access',
        sub: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1800,
      }
    )

    const refreshToken = jwt.sign(
      {
        type: 'refresh',
        sub: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 60 * 60 * 24 * 30,
      }
    )
    refreshTokens.push(refreshToken)
    var authorities = []

    for (let i = 0; i < user.roles.length; i++) {
      let role = await Role.findById(user.roles[i])
      authorities.push('ROLE_' + role.name.toUpperCase())
    }
    res.status(200).send({
      accessToken: accessToken,
      refreshToken: refreshToken,
      isVerified: user?.isVerified,
      // id: user?._id ?? '',
      // name: user?.name ?? '',
      // username: user?.username ?? '',
      // email: user?.email ?? '',
      // roles: authorities,
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
    return
  }
}

exports.refreshAccessToken = (req, res) => {
  const token = req?.headers?.['authorization']?.split(' ')?.[1]
  if (!refreshTokens.includes(token)) return res.sendStatus(403)
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }

    const accessToken = jwt.sign(
      {
        type: 'access',
        sub: decoded.sub,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1800,
      }
    )

    res.json({ accessToken: accessToken })
  })
}

exports.logout = (req, res) => {
  const refresh = req?.headers?.['authorization']?.split(' ')?.[1]
  refreshTokens = refreshTokens.filter((token) => token !== refresh)
  res.sendStatus(204)
}
