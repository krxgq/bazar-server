// itemsRoutes.js

const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

router.post("/api/insertItem", itemsController.insertItem);
router.post("/api/deleteItem", itemsController.deleteItem)
router.get("/api/getAllItems", itemsController.getAllItems);
router.get("/api/getItem", itemsController.getItem);

module.exports = router;
