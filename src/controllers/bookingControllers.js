// backend/src/controllers/bookingsController.js
const bookingService = require('../services/bookingService');

exports.bookSeats = async (req, res) => {
  // body: { showId, seats: ["A1","A2"], userName }
  try {
    const result = await bookingService.bookSeats(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.bookSlot = async (req, res) => {
  // body: { showId, slotId, userName }
  try {
    const result = await bookingService.bookSlot(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const { rows } = await require('../db').query('SELECT * FROM bookings WHERE id=$1', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Booking not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
