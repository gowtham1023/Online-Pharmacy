const express = require('express');
const router = express.Router();
const { getUserInfo, updateUser } = require('../controllers/userController');

router.post('/info', getUserInfo);
router.put('/update', updateUser);

module.exports = router;
