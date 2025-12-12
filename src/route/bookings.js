// backend/src/routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/book-seats', bookingsController.bookSeats); // for bus & movie
router.post('/book-slot', bookingsController.bookSlot);   // for doctor
router.get('/:id', bookingsController.getBooking);

module.exports = router;
