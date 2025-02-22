// server.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

app.use(cors());
app.use(express.json());

// Root route to handle GET requests
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// POST route for sending emails
app.post('/api/send-email', async (req, res) => {
  const { name, mobile, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anuinvesst@gmail.com', // Replace with your email
      pass: 'Rak1Rac^', // Replace with your app password or email password
    },
  });

  let mailOptions = {
    from: email,
    to: 'anurajhn@gmail.com', // Replace with ABC Consultants' email
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});