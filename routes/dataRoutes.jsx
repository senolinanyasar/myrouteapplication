const express = require('express');
const pool = require('../db'); 
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tablo_adi');
    res.json(result.rows); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Veritabanı hatası');
  }
});


module.exports = router;