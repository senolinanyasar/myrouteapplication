require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer'); 

const app = express();
const PORT = 5000;


app.use(cors({
  origin: "http://127.0.0.1:3000", 
  methods: ["GET", "POST"], 
  allowedHeaders: ["Content-Type"], 
}));

app.use(express.json()); 
app.options("*", cors()); 


app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;


  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields (name, email, message) are required.',
    });
  }

  
  const mailOptions = {
    from: `"${name}" <${email}>`, 
    to: process.env.GMAIL_USER,   
    subject: `New Message from ${name}`,
    text: message,
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
      return res.status(500).json({
        success: false,
        message: 'Error sending email. Please try again later.',
        error: error.message, 
      });
    }
    console.log('Email sent successfully:', info.response);
    res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
