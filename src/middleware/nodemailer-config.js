const nodemailer = require('nodemailer');

async function mailPayment(recipient,name,resetUrl) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_MAIL_APP,
      pass: process.env.GOOGLE_MAIL_APP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: "Litiwo prueba.c.code@gmail.com",
    to: recipient, // list of receivers
    subject: `Bienvenid@ a Litiwo`, // Subject line
    text: "hola", // plain text body
    html: `<center>
    <p>Hola ${name},</p><p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><a href="${resetUrl}">Restablecer contraseña</a>
          </center>`
  });

}

module.exports = {
  
  mailPayment

}

