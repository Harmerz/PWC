const jwt = require('jsonwebtoken')
const question = require('../models/question')

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
    const response = await question.findOne({
      user: data.sub,
    })
    console.log(response)

    if (!response) {
      const questionData = new question({
        user: data.sub,
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
          user: data.sub,
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
    const response = await question.findOne({
      user: data.sub,
    })
    if (response) res.status(200).send(response)
    else res.status(404).send('No Data Found')
  } catch (err) {
    console.log(err)
  }
}
