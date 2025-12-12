// backend/src/routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Create show (admin)
router.post('/create-show', async (req, res) => {
  try {
    const { title, type, start_time, total_seats, seats, slots } = req.body;
    // Insert show
    const result = await db.query(
      `INSERT INTO shows (title, type, start_time, total_seats) VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, type, start_time, total_seats || 0]
    );
    const show = result.rows[0];
    // add seats or slots if provided
    if ((type === 'BUS' || type === 'MOVIE') && seats && seats.length) {
      const promises = seats.map(s => db.query(`INSERT INTO seats (show_id, seat_label) VALUES ($1,$2)`, [show.id, s]));
      await Promise.all(promises);
    }
    if (type === 'DOCTOR' && slots && slots.length) {
      const promises = slots.map(s => db.query(`INSERT INTO slots (show_id, slot_time) VALUES ($1,$2)`, [show.id, s]));
      await Promise.all(promises);
    }
    res.json({ success:true, show });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/all-shows', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM shows ORDER BY start_time ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
