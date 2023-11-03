import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

router.post('/', async (req, res) => {
    const { email, message } = req.body;
    const password = "Wvu#YVZ5YKZPMd";
    // Create a Nodemailer transporter
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '0verdrivesoen341@gmail.com', // Replace with your email
        pass: "Wvu#YVZ5YKZPMd", // Use a secure method to handle the password, like environment variables
      },
    });
  
    // Define email details
    const mailDetails = {
      from: '0verdrivesoen341@gmail.com', // Replace with your email
      to: email, // The recipient's email
      subject: 'Visit Requested',
      text: message,
    };
  
    // Send the email
    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log('Error Occurs:', err);
        res.status(500).json({ message: 'Email could not be sent' });
      } else {
        console.log('Email sent successfully');
        res.json({ message: 'Email sent successfully' });
      }
    });
  });

export default router;
