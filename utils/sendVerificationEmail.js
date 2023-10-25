const { createMailTransporter } = require('./createMailTransporter')

const sendVerificationMail = (user) => {
  const transporter = createMailTransporter()

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user.email,
    subject: 'Verify your email.',
    html: `<div style="display: flex;
                justify-content: center;
                flex-direction: column, width: 100%;">
                <h2>Hello ${user.name},</h2>
                <p>Please click on the following link to verify your account.</p>
                    <a href='https://lensights.my.id/verify-email?emailToken=${user.emailToken}'>
                      Verify Email Address
                    </a>
            </div>`,
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
