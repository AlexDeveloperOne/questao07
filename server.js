const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as time');

    res.json({
      //message: 'API com PostgreSQL funcionando!',
      //message: 'ALTERACAO DEPOIS DO BUILD PROD!',
      message: 'ALTERACAO TESTE PROD!',
      //message: 'API DEV com hot reload funcionando!',
      dbTime: result.rows[0].time,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', port: PORT });
});

app.get('/version', (req, res) => {
  res.json({ version: '1.0.1' });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});