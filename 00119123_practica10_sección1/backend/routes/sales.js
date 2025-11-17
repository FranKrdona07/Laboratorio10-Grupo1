import express from 'express';
import { pool } from '../data/connection.js';
const router = express.Router();

// GET /api/sales -
router.get('/', async (req, res) => {
  try {
    const q = `
      SELECT s.id, s.amount, s.created_at, c.name AS customer
      FROM sales s
      JOIN customers c ON c.id = s.id_customer
      ORDER BY s.id DESC
    `;
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error obteniendo ventas' });
  }
});

// POST /api/sales 
router.post('/', async (req, res) => {
  const { amount, id_customer } = req.body;
  if (!amount || !id_customer) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const exists = await pool.query('SELECT * FROM customers WHERE id = $1', [id_customer]);
    if (exists.rows.length === 0) return res.status(400).json({ error: 'Cliente no existe' });
    await pool.query('INSERT INTO sales(amount, created_at, id_customer) VALUES($1, NOW(), $2)', [amount, id_customer]);
    res.json({ message: 'Venta guardada exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear venta' });
  }
});

// GET /api/sales/report 
router.get('/report', async (req, res) => {
  try {
    const q = `
      SELECT c.name AS customer, COALESCE(SUM(s.amount),0) AS total_sales
      FROM customers c
      LEFT JOIN sales s ON s.id_customer = c.id
      GROUP BY c.id, c.name
      ORDER BY total_sales DESC
    `;
    const result = await pool.query(q);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generando reporte' });
  }
});

export default router;