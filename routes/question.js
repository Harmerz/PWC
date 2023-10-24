const { authJwt } = require('../middlewares')
const controller = require('../controllers/question')
const express = require('express')
const router = express.Router()

// const upload = multer({ dest: 'uploads/' })
router.post('/question', [authJwt.verifyToken], controller.handleQuestion)
router.get('/question', [authJwt.verifyToken], controller.getQuestions)
router.post('/uploads', controller.testUpload)
module.exports = router
