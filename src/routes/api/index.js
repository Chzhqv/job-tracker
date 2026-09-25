const express = require('express');
const router = express.Router();

router.get('/applications', require('./get'));
router.post('/applications', require('./post'));
router.get('/applications/:id', require('./getById'));
router.delete('/applications/:id', require('./del'));
router.patch('/applications/:id', require('./patch'));

module.exports = router;