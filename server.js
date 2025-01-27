import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg'; 

const { Pool } = pkg; 
import bcrypt from 'bcrypt'; // require yerine import kullanımı

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'my_application_db',
  password: process.env.DB_PASSWORD || '123515',
  port: process.env.DB_PORT || 5432,
});

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post('/send-contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.GMAIL_USER,
    subject: `New Message from ${name}`,
    text: message,
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ success: false, message: 'Error sending email. Please try again later.' });
  }
});

app.post('/api/register', async (req, res) => {
  const { fullName, companyName, sector, email, phoneNumber, password } = req.body;

  if (!fullName || !companyName || !sector || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    console.log('Received data:', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    const query = `
      INSERT INTO users (full_name, company_name, sector, email, phone_number, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `;
    const values = [fullName, companyName, sector, email, phoneNumber, hashedPassword];

    const result = await pool.query(query, values);
    res.status(201).json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    console.error('Error during registration:', error); 
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    res.status(200).json({ success: true, message: "Login successful", user: { id: user.id, fullName: user.full_name, email: user.email } });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred during login." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
