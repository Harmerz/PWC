const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'user',
  },
  questions: [
    {
      number: { type: Number },
      question: { type: String },
      answer: { type: String },
    },
  ],
})

module.exports = mongoose.model('question', questionSchema)
