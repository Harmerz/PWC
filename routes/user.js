const { authJwt } = require('../middlewares')
const controller = require('../controllers/user')
const express = require('express')
const router = express.Router()

router.get('/all', controller.allAccess)
router.get('/user', [authJwt.verifyToken], controller.userBoard)

module.exports = router
