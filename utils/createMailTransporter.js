const nodemailer = require('nodemailer')

const createMailTransporter = () => {
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.PASS_USER,
    },
    secureConnection: 'false',
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
  })
  return transporter
}

module.exports = { createMailTransporter }
