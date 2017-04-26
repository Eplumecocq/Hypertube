'use strict'

const nodemailer = require('nodemailer')

function sendRecoverMail (receiverMail, newPassword) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hypertube.contact@gmail.com',
      pass: 'Hypertube2017'
    }
  })

  let mailOptions = {
    from: '"Hypertube" <support@hypertube.com>',
    to: `${receiverMail}`,
    subject: 'Recover your password — Hypertube',
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Bungee|Fira+Sans|Oswald" rel="stylesheet"
      </head>
      <body>
        <table align="center" width="100%" bgcolor="#222222" style="color:#fff; font-family: 'Fira Sans'">
        <tr>
          <td style="text-align: center; font-family: 'Bungee'; font-size: 60px; padding-top: 60px; padding-bottom: 60px; color: #f85658">
          HYPERTUBE
          </td>
        </tr>
        <tr>
          <td style="border-top: 1px solid #fff; height: 100px; text-align:center; padding-top: 60px; padding-bottom: 60px">
          <h2 style="font-family: 'Oswald'; letter-spacing: 2px; color: #fff">Your new password just arrived!</h2>
          your new password is: ${newPassword}
          </td>
        </tr>
        <tr>
          <td style="text-align: center; color: #929191">
          HYPERTUBE — 2017
          </td>
        </tr>
        </table>
      </body>
    </html>`
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error)
  })
}

module.exports = {
  sendRecoverMail
}
