const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello from drink100gram' });
});

module.exports = router;
