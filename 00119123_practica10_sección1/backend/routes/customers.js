import express from 'express';
import { pool } from '../data/connection.js';
const router = express.Router();

// GET /api/customers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo customers' });
  }
});

// GET /api/customers/search?code=XYZ
router.get('/search', async (req, res) => {
  const { code } = req.query;
  try {
    const result = await pool.query('SELECT * FROM customers WHERE code = $1', [code]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error buscando clientes' });
  }
});

export default router;