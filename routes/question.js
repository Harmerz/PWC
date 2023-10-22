const { authJwt } = require('../middlewares')
const controller = require('../controllers/question')
const express = require('express')
const router = express.Router()

router.post('/question', [authJwt.verifyToken], controller.handleQuestion)
router.get('/question', [authJwt.verifyToken], controller.getQuestions)

module.exports = router
