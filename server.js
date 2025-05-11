import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import net from 'net';
import { createServer } from 'http';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'database.sqlite');

// SQLite veritabanı bağlantısı
let db;
async function openDb() {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  return db;
}

// Veritabanı tablolarını otomatik oluşturma fonksiyonu
const initDatabase = async () => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        company_name TEXT NOT NULL,
        sector TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone_number TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database table "users" created or already exists');

    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        sales INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database table "products" created or already exists');
    
    // Test kullanıcısı olup olmadığını kontrol et
    const userCheck = await db.get(`SELECT * FROM users WHERE email = ?`, ['admin@example.com']);
    
    // Test kullanıcısı yoksa oluştur
    if (!userCheck) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await db.run(`
        INSERT INTO users (full_name, company_name, sector, email, phone_number, password_hash)
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['Admin User', 'Test Company', 'Technology', 'admin@example.com', '5551234567', hashedPassword]);
      console.log('Test user created successfully');
    } else {
      console.log('Test user already exists');
    }

    // Test ürünleri ekle (eğer ürün yoksa)
    const productCount = await db.get(`SELECT COUNT(*) as count FROM products`);
    if (productCount.count === 0) {
      // Demo ürünleri ekle
      const demoProducts = [
        { name: 'Apple', category: 'Fruits', price: 1.99, stock: 123, sales: 200 },
        { name: 'Orange', category: 'Fruits', price: 2.99, stock: 100, sales: 150 },
        { name: 'Banana', category: 'Fruits', price: 0.99, stock: 200, sales: 300 }
      ];
      
      for (const product of demoProducts) {
        await db.run(`
          INSERT INTO products (name, category, price, stock, sales)
          VALUES (?, ?, ?, ?, ?)
        `, [product.name, product.category, product.price, product.stock, product.sales]);
      }
      console.log('Demo products created successfully');
    }
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// CORS ve JSON middleware'leri
app.use(cors({
  origin: "*", // Frontend için bu adres kalabilir
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());



// İletişim formu için endpoint
app.post('/send-contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.GMAIL_USER || 'your-email@example.com',
    subject: `New Message from ${name}`,
    text: message,
  };

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER || 'your-email@example.com',
      pass: process.env.GMAIL_PASS || 'your-password',
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

// Kayıt endpoint'i
app.post('/api/register', async (req, res) => {
  const { fullName, companyName, sector, email, phoneNumber, password } = req.body;

  if (!fullName || !companyName || !sector || !email || !phoneNumber || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    console.log('Received data:', req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);

    await db.run(`
      INSERT INTO users (full_name, company_name, sector, email, phone_number, password_hash)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [fullName, companyName, sector, email, phoneNumber, hashedPassword]);
    
    const userId = await db.get(`SELECT last_insert_rowid() as id`);
    res.status(201).json({ success: true, userId: userId.id });
  } catch (error) {
    console.error('Error during registration:', error); 
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});

// Giriş endpoint'i
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

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

// Ürün API endpoint'leri
// Tüm ürünleri getir
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.all(`SELECT * FROM products ORDER BY id DESC`);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock, sales } = req.body;
  
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }
  
  try {
    await db.run(`
      UPDATE products 
      SET name = ?, category = ?, price = ?, stock = ?, sales = ?
      WHERE id = ?
    `, [name, category, price, stock, sales || 0, id]);
    
    const updatedProduct = await db.get(`SELECT * FROM products WHERE id = ?`, [id]);
    
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
});

// Ürün sil
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.run(`DELETE FROM products WHERE id = ?`, [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
});
// Yeni ürün ekle
app.post('/api/products', async (req, res) => {
  const { name, category, price, stock, sales } = req.body;
  
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }
  
  try {
    const result = await db.run(`
      INSERT INTO products (name, category, price, stock, sales)
      VALUES (?, ?, ?, ?, ?)
    `, [name, category, price, stock, sales || 0]);
    
    const newProduct = await db.get(`SELECT * FROM products WHERE id = ?`, [result.lastID]);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Error adding product' });
  }
});

// Kullanılabilir port bulma fonksiyonu
function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });

    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });
  });
}

// Sunucuyu dinamik bir portla başlat
async function startServer() {
  try {
    // SQLite veritabanını aç
    await openDb();
    // Tabloları oluştur
    await initDatabase();
    
    const availablePort = await findAvailablePort(3000);
    const server = createServer(app);
    
    server.listen(availablePort, () => {
      console.log(`Server is running on http://localhost:${availablePort}`);
      console.log(`Frontend için CORS origin'i güncelleyebilirsiniz: ${availablePort}`);
    });
  } catch (err) {
    console.error('Server başlatılamadı:', err);
  }
}
app.use(express.static(path.join(__dirname, 'dist'))); // dist yerine build dersen klasör adını da öyle yap

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // build yerine dist
});


startServer();