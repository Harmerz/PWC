const User = require('../models/user')
const Role = require('../models/role')
require('dotenv').config()
const { uuid } = require('uuidv4')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    const roles = await Role.findOne({ name: 'user' })
    console.log(roles)
    user.roles = [roles._id]

    await user.save()
    // Send success response
    res.status(201).json({
      message: 'User created successfully',
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
    return
  }
}

exports.signin = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    const Finder = req?.body?.username
      ? {
          username: req.body.username,
        }
      : {
          email: req.body.email,
        }
    const user = await User.findOne(Finder)
    console.log(Finder)
    console.log(user)

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
    console.log(uuid())
    const accessToken = jwt.sign(
      {
        type: 'access',
        jti: uuid(),
        sub: user.email,
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
        type: 'access',
        jti: uuid(),
        sub: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1800,
      }
    )

    var authorities = []

    for (let i = 0; i < user.roles.length; i++) {
      let role = await Role.findById(user.roles[i])
      authorities.push('ROLE_' + role.name.toUpperCase())
    }
    res.status(200).send({
      accessToken: accessToken,
      refreshToken: refreshToken,
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
