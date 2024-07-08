import express from 'express'
import nodemailer from 'nodemailer'
import payload from 'payload'

require('dotenv').config()

const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    email: {
      fromAddress: process.env.RESEND_FROM_EMAIL,
      fromName: process.env.RESEND_FROM_NAME,
      transport: transporter,
    },
  })

  // Add your own express routes here

  app.listen(3000)
}

start()
