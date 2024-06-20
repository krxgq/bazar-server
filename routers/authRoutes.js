// authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/api/login", authController.loginUser);
router.post("/api/insertUser", authController.insertUser);
router.post("/api/validateAccessToken", authController.validateAccessToken);

module.exports = router;
