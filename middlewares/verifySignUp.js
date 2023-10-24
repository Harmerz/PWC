const ROLES = ['user', 'admin', 'moderator']
const User = require('../models/user')

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Email
    const userByEmail = await User.findOne({
      email: req.body.email,
    })

    if (userByEmail) {
      res.status(400).send({ message: 'Failed! Email is already in use!' })
      return
    }

    next()
  } catch (err) {
    res.status(500).send({ message: err })
  }
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles)) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles} does not exist!`,
        })
        return
      }
    }
  }

  next()
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
}

module.exports = verifySignUp
