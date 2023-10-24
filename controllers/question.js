const jwt = require('jsonwebtoken')
const question = require('../models/question')
const User = require('../models/user')

exports.handleQuestion = async (req, res) => {
  const token = req?.headers?.['authorization']?.split(' ')?.[1]
  let data
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    data = decoded
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
  })

  try {
    const user = await User.findOne({
      _id: data.sub,
    })
    const response = await question.findOne({
      user: user.email,
    })
    console.log(response)

    if (!response) {
      const questionData = new question({
        user: user.email,
        questions: [
          {
            number: req.body.number,
            question: req.body.question,
            answer: req.body.answer,
          },
        ],
      })
      await questionData.save()
      res.status(201).send('Success Added First Questions')
    } else {
      await question.updateOne(
        {
          user: user.email,
        },
        {
          $push: {
            questions: {
              number: req.body.number,
              question: req.body.question,
              answer: req.body.answer,
            },
          },
        }
      )
      res.status(200).send('Success')
    }
  } catch (err) {
    console.log(err)
  }
}

exports.getQuestions = async (req, res) => {
  const token = req?.headers?.['authorization']?.split(' ')?.[1]
  let data
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    data = decoded
    if (err) {
      console.log(err)
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
  })

  try {
    const user = await User.findOne({
      _id: data.sub,
    })
    const response = await question.findOne({
      user: user.email,
    })
    if (response) res.status(200).send(response)
    else res.status(404).send('No Data Found')
  } catch (err) {
    console.log(err)
  }
}

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

const upload = multer({ storage: storage })
exports.testUpload = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err)
    } else if (err) {
      console.log(err)
      // An unknown error occurred when uploading.
    }
    // Everything went fine.

    res.sendStatus(200)
  })
}
