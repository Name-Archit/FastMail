const express = require('express');

const {
  getSummary
} = require('../controllers/aiController');

const router = express.Router();

router.get('/summary', getSummary);

module.exports = router;