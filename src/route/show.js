// backend/src/routes/shows.js
const express = require('express');
const router = express.Router();
const showsController = require('../controllers/showsController');

router.get('/', showsController.listShows);
router.get('/:id', showsController.getShow);

module.exports = router;
