const announceModel = require("../models/itemsModel");
const authModel = require("../models/authModel");

async function getAllItems(req, res) {
  try {
    const items = await announceModel.getAllItems();

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    const formattedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      img: item.img,
    }));

    res.status(200).json(formattedItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function insertItem(req, res) {
  const { title, price, description, userId, location, category, img } =
    req.body;
  try {
    const success = await announceModel.insertItem(
      title,
      price,
      description,
      userId,
      location,
      category,
      img
    );
    if (success) {
      res.status(200).json({ message: "Item inserted successfully" });
    } else {
      res.status(500).json({ message: "Failed to insert item" });
    }
  } catch (error) {
    console.error("Error inserting item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getItem(req, res) {
  const { id } = req.query;
  const item = await announceModel.getItem(id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
}
async function deleteItem(req, res) {
  const { id, jwt } = req.body;
  const checkUser = await authModel.validateAccessToken(jwt);
  if (!checkUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const success = await announceModel.deleteItem(id);
  if (success) {
    res.status(200).json({ message: "Item deleted successfully" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
}
module.exports = {
  getAllItems,
  insertItem,
  getItem,
  deleteItem,
};
