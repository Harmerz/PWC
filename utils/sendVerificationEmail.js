const { createMailTransporter } = require('./createMailTransporter')

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter()

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'haikal6255hilmi@gmail.com',
    subject: 'Verify your email.',
    text: 'Halo',
  }
  console.log(user)
  transporter.sendMail(mailOptions, (error, info) => {
    console
    if (error) {
      console.log(error)
    } else {
      console.log('Verification email sent')
    }
  })
}

module.exports = { sendVerificationMail }
