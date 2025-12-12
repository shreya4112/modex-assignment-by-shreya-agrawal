// backend/src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const showsRoutes = require('./routes/shows');
const bookingsRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');

const expireBookings = require('./jobs/expireBookings');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/shows', showsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  console.log(`Backend running on ${PORT}`);
  // start background job to expire PENDING bookings older than 2 minutes
  expireBookings();
});
