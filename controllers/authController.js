// authController.js
const authModel = require("../models/authModel");

// Function to handle user login
async function loginUser(req, res) {
  const { username, password } = req.body;

  const accessToken = await authModel.loginUser(username, password);

  if (accessToken) {
    res
      .status(200)
      .json({ message: "Login successful", accessToken: accessToken });
  } else {
    res.status(401).json({ message: "User not found or incorrect password" });
  }
}

// Function to insert a new user
async function insertUser(req, res) {
  const { firstName, lastName, username, email, password } = req.body;

  const success = await authModel.insertUser(
    firstName,
    lastName,
    username,
    email,
    password
  );

  if (success) {
    res.status(200).json({ message: "Account created successfully" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
async function validateAccessToken(req, res) {
  const { accessToken } = req.body;

  const decoded = await authModel.validateAccessToken(accessToken);

  if (decoded) {
    res
      .status(200)
      .json({ message: "Access token is valid", decoded: decoded });
  } else {
    res.status(401).json({ message: "Access token is invalid" });
  }
}

module.exports = {
  loginUser,
  insertUser,
  validateAccessToken,
};
