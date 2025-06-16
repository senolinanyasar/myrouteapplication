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

    // Customers tablosu oluşturma
    await db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        total_orders INTEGER DEFAULT 0,
        total_spent REAL DEFAULT 0.0,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database table "customers" created or already exists');

    // Sales tablosu oluşturma
    await db.exec(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        total_price REAL NOT NULL,
        discount REAL DEFAULT 0.0,
        final_price REAL NOT NULL,
        sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'completed',
        notes TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
      );
    `);
    console.log('Database table "sales" created or already exists');
    
    // Locations tablosu oluşturma
    await db.exec(`
      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        type TEXT DEFAULT 'stop',
        description TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database table "locations" created or already exists');
    
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

    // Daha fazla demo kullanıcı ekle
    const userCount = await db.get(`SELECT COUNT(*) as count FROM users`);
    if (userCount.count < 3) {
      const demoUsers = [
        {
          full_name: 'John Doe',
          company_name: 'ABC Corp',
          sector: 'Finance',
          email: 'john.doe@example.com',
          phone_number: '5559876543',
          password: 'password123'
        },
        {
          full_name: 'Jane Smith',
          company_name: 'XYZ Ltd',
          sector: 'Marketing',
          email: 'jane.smith@example.com',
          phone_number: '5556547890',
          password: 'password123'
        },
        {
          full_name: 'Mike Johnson',
          company_name: 'Tech Solutions',
          sector: 'IT',
          email: 'mike.johnson@example.com',
          phone_number: '5554321098',
          password: 'password123'
        }
      ];

      for (const user of demoUsers) {
        const existingUser = await db.get(`SELECT * FROM users WHERE email = ?`, [user.email]);
        if (!existingUser) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          await db.run(`
            INSERT INTO users (full_name, company_name, sector, email, phone_number, password_hash)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [user.full_name, user.company_name, user.sector, user.email, user.phone_number, hashedPassword]);
        }
      }
      console.log('Demo users created successfully');
    }

    // Test ürünleri ekle (eğer ürün yoksa)
    const productCount = await db.get(`SELECT COUNT(*) as count FROM products`);
    if (productCount.count === 0) {
      // Demo ürünleri ekle
      const demoProducts = [
        { name: 'Apple', category: 'Fruits', price: 1.99, stock: 123, sales: 200 },
        { name: 'Orange', category: 'Fruits', price: 2.99, stock: 100, sales: 150 },
        { name: 'Banana', category: 'Fruits', price: 0.99, stock: 200, sales: 300 },
        { name: 'Mango', category: 'Fruits', price: 3.99, stock: 80, sales: 120 },
        { name: 'Grapes', category: 'Fruits', price: 4.99, stock: 60, sales: 90 },
        { name: 'Strawberry', category: 'Fruits', price: 5.99, stock: 40, sales: 70 }
      ];
      
      for (const product of demoProducts) {
        await db.run(`
          INSERT INTO products (name, category, price, stock, sales)
          VALUES (?, ?, ?, ?, ?)
        `, [product.name, product.category, product.price, product.stock, product.sales]);
      }
      console.log('Demo products created successfully');
    }

    // Test müşterileri ekle (eğer müşteri yoksa)
    const customerCount = await db.get(`SELECT COUNT(*) as count FROM customers`);
    if (customerCount.count === 0) {
      const demoCustomers = [
        {
          name: 'Ahmet Yılmaz',
          email: 'ahmet.yilmaz@email.com',
          phone: '+90 532 123 4567',
          address: 'Kızılay Mahallesi No:123',
          city: 'Ankara',
          country: 'Turkey',
          total_orders: 15,
          total_spent: 1250.75,
          status: 'active'
        },
        {
          name: 'Fatma Demir',
          email: 'fatma.demir@email.com',
          phone: '+90 535 987 6543',
          address: 'Beşiktaş Caddesi No:45',
          city: 'Istanbul',
          country: 'Turkey',
          total_orders: 8,
          total_spent: 567.30,
          status: 'active'
        },
        {
          name: 'Mehmet Kaya',
          email: 'mehmet.kaya@email.com',
          phone: '+90 542 456 7890',
          address: 'Konak Mahallesi No:67',
          city: 'Izmir',
          country: 'Turkey',
          total_orders: 22,
          total_spent: 2100.45,
          status: 'active'
        },
        {
          name: 'Ayşe Özkan',
          email: 'ayse.ozkan@email.com',
          phone: '+90 533 321 6547',
          address: 'Merkez Mahallesi No:89',
          city: 'Bursa',
          country: 'Turkey',
          total_orders: 5,
          total_spent: 299.99,
          status: 'inactive'
        },
        {
          name: 'Can Arslan',
          email: 'can.arslan@email.com',
          phone: '+90 544 789 1234',
          address: 'Güzelyalı Bulvarı No:156',
          city: 'Antalya',
          country: 'Turkey',
          total_orders: 12,
          total_spent: 890.25,
          status: 'active'
        }
      ];
      
      for (const customer of demoCustomers) {
        await db.run(`
          INSERT INTO customers (name, email, phone, address, city, country, total_orders, total_spent, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [customer.name, customer.email, customer.phone, customer.address, customer.city, customer.country, customer.total_orders, customer.total_spent, customer.status]);
      }
      console.log('Demo customers created successfully');
    }

    // Test satış verileri ekle (eğer satış yoksa)
    const salesCount = await db.get(`SELECT COUNT(*) as count FROM sales`);
    if (salesCount.count === 0) {
      const demoSales = [
        {
          customer_id: 1,
          product_id: 1,
          quantity: 10,
          unit_price: 1.99,
          total_price: 19.90,
          discount: 0.0,
          final_price: 19.90,
          status: 'completed',
          notes: 'İlk test satışı'
        },
        {
          customer_id: 2,
          product_id: 2,
          quantity: 5,
          unit_price: 2.99,
          total_price: 14.95,
          discount: 2.0,
          final_price: 12.95,
          status: 'completed',
          notes: 'Orange satışı - indirimli'
        },
        {
          customer_id: 3,
          product_id: 3,
          quantity: 8,
          unit_price: 0.99,
          total_price: 7.92,
          discount: 0.0,
          final_price: 7.92,
          status: 'completed',
          notes: 'Banana toplu satış'
        },
        {
          customer_id: 1,
          product_id: 4,
          quantity: 3,
          unit_price: 3.99,
          total_price: 11.97,
          discount: 1.0,
          final_price: 10.97,
          status: 'completed',
          notes: 'Mango satışı'
        },
        {
          customer_id: 4,
          product_id: 1,
          quantity: 15,
          unit_price: 1.99,
          total_price: 29.85,
          discount: 3.0,
          final_price: 26.85,
          status: 'completed',
          notes: 'Toplu apple satışı'
        }
      ];
      
      for (const sale of demoSales) {
        await db.run(`
          INSERT INTO sales (customer_id, product_id, quantity, unit_price, total_price, discount, final_price, status, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [sale.customer_id, sale.product_id, sale.quantity, sale.unit_price, sale.total_price, sale.discount, sale.final_price, sale.status, sale.notes]);
      }
      console.log('Demo sales created successfully');
    }

    // Test lokasyon verileri ekle (eğer lokasyon yoksa)
    const locationCount = await db.get(`SELECT COUNT(*) as count FROM locations`);
    if (locationCount.count === 0) {
      const demoLocations = [
        {
          name: 'Central Station',
          address: '123 Main Street, City Center',
          latitude: 41.0082,
          longitude: 28.9784,
          type: 'station',
          description: 'Main transportation hub',
          status: 'active'
        },
        {
          name: 'Shopping Mall Stop',
          address: '456 Mall Avenue, Shopping District',
          latitude: 41.0122,
          longitude: 28.9750,
          type: 'stop',
          description: 'Stop near shopping center',
          status: 'active'
        },
        {
          name: 'University Campus',
          address: '789 Education Blvd, University Area',
          latitude: 41.0050,
          longitude: 28.9820,
          type: 'stop',
          description: 'University campus stop',
          status: 'active'
        },
        {
          name: 'Airport Terminal',
          address: 'Airport Road, Terminal 1',
          latitude: 40.9769,
          longitude: 29.0161,
          type: 'terminal',
          description: 'Airport transportation terminal',
          status: 'active'
        }
      ];
      
      for (const location of demoLocations) {
        await db.run(`
          INSERT INTO locations (name, address, latitude, longitude, type, description, status)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [location.name, location.address, location.latitude, location.longitude, location.type, location.description, location.status]);
      }
      console.log('Demo locations created successfully');
    }
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// CORS ve JSON middleware'leri
app.use(cors({
  origin: "*",
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

  const transporter = nodemailer.createTransporter({
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

// LOCATION API ENDPOINTS
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await db.all(`SELECT * FROM locations ORDER BY created_at DESC`);
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ success: false, message: 'Error fetching locations' });
  }
});

app.post('/api/locations', async (req, res) => {
  const { name, address, latitude, longitude, type, description } = req.body;
  
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ success: false, message: 'Name, address, latitude and longitude are required' });
  }
  
  try {
    const result = await db.run(`
      INSERT INTO locations (name, address, latitude, longitude, type, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [name, address, latitude, longitude, type || 'stop', description || '', 'active']);
    
    const newLocation = await db.get(`SELECT * FROM locations WHERE id = ?`, [result.lastID]);
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error adding location:', error);
    res.status(500).json({ success: false, message: 'Error adding location' });
  }
});

app.delete('/api/locations/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.run(`DELETE FROM locations WHERE id = ?`, [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    
    res.status(200).json({ success: true, message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ success: false, message: 'Error deleting location' });
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

// Kullanıcı profil bilgilerini getirme endpoint'i
app.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await db.get(`
      SELECT id, full_name, company_name, sector, email, phone_number, created_at 
      FROM users WHERE id = ?
    `, [id]);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
});

// Tüm kullanıcıları getirme endpoint'i
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.all(`
      SELECT id, full_name, company_name, sector, email, phone_number, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

// Şifre değiştirme endpoint'i
app.put('/api/user/:id/password', async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'Current password and new password are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long' });
  }

  try {
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    await db.run(`
      UPDATE users 
      SET password_hash = ?
      WHERE id = ?
    `, [hashedNewPassword, id]);

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ success: false, message: 'Error updating password' });
  }
});

// DASHBOARD İSTATİSTİKLERİ ENDPOINT'İ
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // Bugünkü satışları hesapla
    const today = new Date().toISOString().split('T')[0];
    const todaySales = await db.get(`
      SELECT 
        COUNT(*) as count,
        SUM(final_price) as revenue,
        SUM(quantity) as items_sold
      FROM sales 
      WHERE date(sale_date) = date('now')
    `);

    // Toplam müşteri sayısı
    const totalCustomers = await db.get(`SELECT COUNT(*) as count FROM customers WHERE status = 'active'`);

    // Toplam stok değeri (bugünkü giderler olarak)
    const totalStockValue = await db.get(`
      SELECT SUM(price * stock) as value 
      FROM products
    `);

    // Son 7 günün satış verilerini al
    const salesData = await db.all(`
      SELECT 
        date(sale_date) as date,
        SUM(final_price) as revenue,
        SUM(quantity) as items_sold,
        COUNT(*) as sales_count
      FROM sales 
      WHERE sale_date >= date('now', '-7 days')
      GROUP BY date(sale_date)
      ORDER BY date(sale_date)
    `);

    // Ürün kategorilerine göre satış dağılımı
    const categoryDistribution = await db.all(`
      SELECT 
        p.category,
        SUM(s.quantity) as total_sold,
        SUM(s.final_price) as total_revenue
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY p.category
    `);

    // En çok satan ürünler
    const topProducts = await db.all(`
      SELECT 
        p.name,
        p.category,
        SUM(s.quantity) as total_sold,
        SUM(s.final_price) as total_revenue
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY s.product_id, p.name, p.category
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    // Şehir bazlı müşteri dağılımı
    const cityDistribution = await db.all(`
      SELECT 
        city,
        COUNT(*) as customer_count,
        SUM(total_spent) as total_revenue
      FROM customers
      GROUP BY city
    `);

    res.status(200).json({
      today_stats: {
        sales: todaySales.revenue || 0,
        collection: todaySales.revenue || 0, // Aynı değer olarak kabul ediyoruz
        expenses: totalStockValue.value || 0,
        customers: totalCustomers.count || 0
      },
      sales_overview: salesData,
      category_distribution: categoryDistribution,
      top_products: topProducts,
      city_distribution: cityDistribution
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching dashboard statistics' });
  }
});

// PRODUCT API ENDPOINTS
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

// CUSTOMER API ENDPOINTS
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await db.all(`SELECT * FROM customers ORDER BY id DESC`);
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, message: 'Error fetching customers' });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, city, country, total_orders, total_spent, status } = req.body;
  
  if (!name || !email || !phone || !address || !city || !country) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }
  
  try {
    await db.run(`
      UPDATE customers 
      SET name = ?, email = ?, phone = ?, address = ?, city = ?, country = ?, total_orders = ?, total_spent = ?, status = ?
      WHERE id = ?
    `, [name, email, phone, address, city, country, total_orders || 0, total_spent || 0.0, status || 'active', id]);
    
    const updatedCustomer = await db.get(`SELECT * FROM customers WHERE id = ?`, [id]);
    
    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ success: false, message: 'Error updating customer' });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.run(`DELETE FROM customers WHERE id = ?`, [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ success: false, message: 'Error deleting customer' });
  }
});

app.post('/api/customers', async (req, res) => {
  const { name, email, phone, address, city, country, total_orders, total_spent, status } = req.body;
  
  if (!name || !email || !phone || !address || !city || !country) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }
  
  try {
    const result = await db.run(`
      INSERT INTO customers (name, email, phone, address, city, country, total_orders, total_spent, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, email, phone, address, city, country, total_orders || 0, total_spent || 0.0, status || 'active']);
    
    const newCustomer = await db.get(`SELECT * FROM customers WHERE id = ?`, [result.lastID]);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ success: false, message: 'Error adding customer' });
  }
});

// SALES API ENDPOINTS
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await db.all(`
      SELECT 
        s.*,
        c.name as customer_name,
        c.email as customer_email,
        p.name as product_name,
        p.category as product_category
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.id
      LEFT JOIN products p ON s.product_id = p.id
      ORDER BY s.sale_date DESC
    `);
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ success: false, message: 'Error fetching sales' });
  }
});

app.post('/api/sales', async (req, res) => {
  const { customer_id, product_id, quantity, discount, notes } = req.body;
  
  if (!customer_id || !product_id || !quantity) {
    return res.status(400).json({ success: false, message: 'Customer, product and quantity are required' });
  }
  
  try {
    const product = await db.get(`SELECT * FROM products WHERE id = ?`, [product_id]);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }
    
    const customer = await db.get(`SELECT * FROM customers WHERE id = ?`, [customer_id]);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    
    const unit_price = product.price;
    const total_price = unit_price * quantity;
    const discount_amount = discount || 0;
    const final_price = total_price - discount_amount;
    
    const result = await db.run(`
      INSERT INTO sales (customer_id, product_id, quantity, unit_price, total_price, discount, final_price, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [customer_id, product_id, quantity, unit_price, total_price, discount_amount, final_price, notes || '']);
    
    await db.run(`
      UPDATE products 
      SET stock = stock - ?, sales = sales + ?
      WHERE id = ?
    `, [quantity, quantity, product_id]);
    
    await db.run(`
      UPDATE customers 
      SET total_orders = total_orders + 1, total_spent = total_spent + ?
      WHERE id = ?
    `, [final_price, customer_id]);
    
    const newSale = await db.get(`
      SELECT 
        s.*,
        c.name as customer_name,
        c.email as customer_email,
        p.name as product_name,
        p.category as product_category
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.id
      LEFT JOIN products p ON s.product_id = p.id
      WHERE s.id = ?
    `, [result.lastID]);
    
    res.status(201).json(newSale);
  } catch (error) {
    console.error('Error adding sale:', error);
    res.status(500).json({ success: false, message: 'Error adding sale' });
  }
});

app.delete('/api/sales/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const sale = await db.get(`SELECT * FROM sales WHERE id = ?`, [id]);
    if (!sale) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }
    
    await db.run(`
      UPDATE products 
      SET stock = stock + ?, sales = sales - ?
      WHERE id = ?
    `, [sale.quantity, sale.quantity, sale.product_id]);
    
    await db.run(`
      UPDATE customers 
      SET total_orders = total_orders - 1, total_spent = total_spent - ?
      WHERE id = ?
    `, [sale.final_price, sale.customer_id]);
    
    const result = await db.run(`DELETE FROM sales WHERE id = ?`, [id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Sale not found' });
    }
    
    res.status(200).json({ success: true, message: 'Sale deleted successfully' });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ success: false, message: 'Error deleting sale' });
  }
});

app.get('/api/sales/stats', async (req, res) => {
  try {
    const stats = await db.get(`
      SELECT 
        COUNT(*) as total_sales,
        SUM(final_price) as total_revenue,
        AVG(final_price) as avg_sale_amount,
        SUM(quantity) as total_items_sold
      FROM sales
      WHERE status = 'completed'
    `);
    
    const topProducts = await db.all(`
      SELECT 
        p.name,
        SUM(s.quantity) as total_sold,
        SUM(s.final_price) as total_revenue
      FROM sales s
      LEFT JOIN products p ON s.product_id = p.id
      WHERE s.status = 'completed'
      GROUP BY s.product_id, p.name
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    
    const topCustomers = await db.all(`
      SELECT 
        c.name,
        COUNT(s.id) as total_orders,
        SUM(s.final_price) as total_spent
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.id
      WHERE s.status = 'completed'
      GROUP BY s.customer_id, c.name
      ORDER BY total_spent DESC
      LIMIT 5
    `);
    
    res.status(200).json({
      general_stats: stats,
      top_products: topProducts,
      top_customers: topCustomers
    });
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching sales statistics' });
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
    await openDb();
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

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

startServer();