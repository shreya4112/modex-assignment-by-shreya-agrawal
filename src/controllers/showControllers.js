// backend/src/controllers/showsController.js
const db = require('../db');

exports.listShows = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM shows ORDER BY start_time ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShow = async (req, res) => {
  try {
    const id = req.params.id;
    const showRes = await db.query('SELECT * FROM shows WHERE id=$1', [id]);
    if (!showRes.rows.length) return res.status(404).json({ error: 'Show not found' });
    const show = showRes.rows[0];
    if (show.type === 'DOCTOR') {
      const slots = (await db.query('SELECT * FROM slots WHERE show_id=$1 ORDER BY slot_time', [id])).rows;
      res.json({ show, slots });
    } else {
      const seats = (await db.query('SELECT * FROM seats WHERE show_id=$1 ORDER BY seat_label', [id])).rows;
      res.json({ show, seats });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
