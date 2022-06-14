const express = require('express');
const router = express.Router();
const recruit = require('./recruit/recruit');

router.get('/recruits', recruit.show);
router.get('/recruits/:id', recruit.detail);
router.post('/register', recruit.register);
router.put('/recruits/:id', recruit.update);
router.delete('/recruits/:id', recruit.destroy);

module.exports = router;