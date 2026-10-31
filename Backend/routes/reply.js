const express = require('express');

const {
  getReplyTemplate
} = require('../controllers/replyController');

const router = express.Router();

router.post(
  '/template',
  getReplyTemplate
);

module.exports = router;