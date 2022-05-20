const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');

app.get('/', (req, res) => {
  res.send('/sendemail/: < email direction >')
})

app.get('/sendemail/:email', async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.USER, //  user
            pass: process.env.PASSWORD, //  password
        },
    });
    
    const msg = {
        to: req.params.email, // receiver
        subject: process.env.EMAIL_SUBJECT, // Subject line
        text: process.env.EMAIL_CONTENT // plain text body
    }
    // send mail with defined transport object
    try {
        await transporter.sendMail(msg);
        res.status(200).json({
            message: 'An email has been sent to the mail direction'
        })
    } catch (error) {
        console.log('Error: ', error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})