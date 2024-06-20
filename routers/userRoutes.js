const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/api/getCurrentUser", userController.getCurrentUser);
router.get("/api/getPfp/:imageName", userController.getProfilePicture);
router.post("/api/addFav", userController.addFav);
router.post("/api/removeFav", userController.removeFav);
router.post("/api/getAllFavorites", userController.getAllFavorites);

module.exports = router;
