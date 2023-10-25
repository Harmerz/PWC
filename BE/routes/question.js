const { authJwt } = require('../middlewares')
const controller = require('../controllers/question')
const express = require('express')
const router = express.Router()

const util = require('util'),
  multer = require('multer')

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    const email = req.body.email
    const id = req.body.questionId
    //How could I get the new_file_name property sent from client here?
    cb(null, email + '_' + id + '_' + file.originalname)
  },
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: 'uploads/' })
router.post('/question-new', [authJwt.verifyToken], controller.newQuestion)
router.post('/question', [authJwt.verifyToken], controller.enterQuestion)

router.get('/question', [authJwt.verifyToken], controller.getQuestions)
router.post('/uploads', [authJwt.verifyToken, upload.single('file')], controller.testUpload)
module.exports = router
