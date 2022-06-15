const express = require('express');
const router = express.Router();
const recruit = require('./recruit/recruit');
const user = require('./user/user');

// 채용 관련 API
router.get('/recruits', recruit.show);
router.get('/recruits/:id', recruit.detail);
router.post('/register', recruit.register);
router.put('/recruits/:id', recruit.update);
router.delete('/recruits/:id', recruit.destroy);
router.get('/search', recruit.search);

// 채용공고 지원 API
router.post('/apply/:id', user.apply);

module.exports = router;