const nodemailer = require('nodemailer')

const createMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'lensights.ai@gmail.com',
      pass: 'Tetigraph123',
    },
  })
  return transporter
}

module.exports = { createMailTransporter }
