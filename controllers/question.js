const jwt = require('jsonwebtoken')
const question = require('../models/question')
const User = require('../models/user')
const { default: axios } = require('axios')

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

exports.testUpload = async (req, res) => {
  const file = req.file

  console.log(__dirname + file.filename)
  const ocr = await axios.post('localhost:8000', {
    mode: 'pytesseract',
    img_url: __dirname + file.filename,
  })

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

    await question.updateOne(
      {
        user: user.email,
        _id: file?.filename?.split('_')[1],
      },
      {
        $push: {
          questions: {
            number: 4,
            question: 'Do you have any Income Statement or any Financial Report? Upload it!',
            answer: ocr?.data?.image_string,
          },
        },
      }
    )
    res.status(200).send(file?.originalname)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
