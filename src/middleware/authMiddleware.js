const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { User } = require("../db");

const SECRET = 'mysecretkey';

const authenticateUser = async (email, password) => {
    console.log("email",email)
  const user = await User.findOne({ where: { email } });
  console.log("user",user)
  if (!user) {
    throw new Error('Email not registered');
  }

  const isValid = await user.isValidPassword(password);
  if (!isValid) {
    throw new Error('Invalid passwordh');
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
  return { user, token };
};

const authorizeUser = () => expressJwt({ secret: SECRET });

module.exports = {
    authenticateUser,
    authorizeUser
  }