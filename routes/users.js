const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { isUserExists, validate, handleValidate, create, getAll } = require('../controllers/user-controller');


router.post('/', isUserExists, validate(), handleValidate, create);

router.get('/', getAll);

module.exports = router;
