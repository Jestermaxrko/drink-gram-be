const { body, validationResult } = require('express-validator/check');

const User = require('../models/user');
const { hashData } = require('../services/utils');

const userController = {};

userController.isUserExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).json({ message: 'User is already exists' });
    return next();
  } catch (err) { return next(err) }
}

userController.validate = () => (
  [
    body('firstname', 'Firstnme doesnt exists').exists()
      .isLength({ min: 2 }).withMessage('Firstname must be at least 2 character long')
      .isAlpha().withMessage('Firstname must containt only letters'),
    body('lastname', 'Lastname doesnt exists').exists()
      .isAlpha().withMessage('Lastname must containt only letters'),
    body('email', 'Email is invalid').isEmail(),
    body('password', 'Password is required').exists()
      .isLength({ min: 6 }).withMessage('Password must be at least 6 character long'),
    body('passwordConf').custom((value, { req }) => {
      if (value === req.body.password) return true;
      throw new Error('Password confirmation does not match password');
    })
  ]
)

userController.handleValidate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorsArr = errors.array().map(({ param, msg }) => ({ [`${param}`]: msg }));
    const serializedErrors = errorsArr.reduce((acc, item) => ({ ...acc, ...item }), {});
    return res.status(422).json({ errors: serializedErrors });
  }
  return next();
}

userController.create = async (req, res, next) => {
  try {
    const password = await hashData(req.body.password);
    const user = await User.create({ ...req.body, password });
    return res.status(200).json({ user });
  } catch (err) { return next(err) }
}

userController.getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) { return next(err) }

}

module.exports = userController;
