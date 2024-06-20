const express = require("express");
const multer = require("multer");
const router = express.Router();
const imageController = require("../controllers/imageController");

const upload = multer(); // Multer middleware for handling multipart/form-data

router.post(
  "/api/insertImage",
  upload.single("image"),
  imageController.insertImage
);
router.get("/api/getImage", imageController.getImage);
router.get("/api/getListImages", imageController.listImages);
router.post("/api/deleteImage", imageController.deleteImage);

module.exports = router;
