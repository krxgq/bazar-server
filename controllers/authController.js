// authController.js
const authModel = require('../models/authModel')
async function loginUser(req, res) {
  const { username, password } = req.body

  const accessToken = await authModel.loginUser(username, password)

  if (accessToken) {
    res
      .status(200)
      .json({ message: 'Login successful', accessToken: accessToken })
  } else {
    res.status(401).json({ message: 'User not found or incorrect password' })
  }
}

// Function to insert a new user
async function insertUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body

  const success = await authModel.insertUser(
    firstName,
    lastName,
    username,
    email,
    password
  )

  if (success) {
    res.status(200).json({ message: 'Account created successfully' })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
async function validateAccessToken(req, res) {
  const { accessToken } = req.body

  const decoded = await authModel.validateAccessToken(accessToken)

  if (decoded) {
    res.status(200).json({ message: 'Access token is valid', decoded: decoded })
  } else {
    res.status(401).json({ message: 'Access token is invalid' })
  }
}
async function changePass(req, res) {
  const { oldPass, newPass, username } = req.body;

  // Check if old password is valid
  const accessToken = await authModel.loginUser(username, oldPass);
  if (!accessToken || accessToken === null) {
    return res.status(401).json({ message: 'Invalid old password' });
  }

  // Change password
  try {
    const success = await authModel.changePass(newPass, username);

    if (success) {
      res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
module.exports = {
  loginUser,
  insertUser,
  validateAccessToken,
  changePass,
}
