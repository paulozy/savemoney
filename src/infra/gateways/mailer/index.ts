import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  // host: process.env.MAILER_HOST,
  // port: Number(process.env.MAILER_PORT),
  // secure: false,
  // auth: {
  //   user: process.env.MAILER_USER,
  //   pass: process.env.MAILER_PASSWORD
  // }
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0a1807c43e69b4",
    pass: "f2031fec1aba59"
  }
})

export { transporter }
