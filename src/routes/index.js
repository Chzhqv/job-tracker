const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
router.use('/v1', require('./api'));

module.exports = router;