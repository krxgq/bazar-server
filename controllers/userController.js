const userModel = require("../models/userModel");
const authModel = require("../models/authModel");
const path = require("path");

const getCurrentUser = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const decodedToken = await authModel.validateAccessToken(accessToken);

    const username = decodedToken.username;
    const userData = await userModel.findByUsername(username);
    if (!userData) {
      throw new Error("User not found");
    }
    res.json(userData);
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    res.status(500).json({ error: "Failed to fetch current user data" });
  }
};

const getProfilePicture = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "../../profile-img", imageName);
    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error sending image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFav = async (req, res) => {
  try {
    const { userID, productID } = req.body;

    if (userID === null || productID === null) {
      throw new Error("Null value in userID or productID");
    }

    const result = await userModel.addFav(userID, productID);
    if (!result) {
      throw new Error("Failed to add favorite");
    }

    res.json({ message: "Favorite added successfully" });
  } catch (error) {
    console.error("Error adding favorite:", error.message);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};
const removeFav = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const result = await userModel.removeFav(userID, productID);
    if (!result) {
      throw new Error("Failed to remove favorite");
    }

    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error.message);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};
const getAllFavorites = async (req, res) => {
  try {
    const { id } = req.body;
    const [result] = await userModel.getAllFavorites(id);
    if (!result) {
      throw new Error("Failed to get favorites");
    }
    res.json(result);
  } catch (error) {
    console.error("Error getting favorites:", error.message);
    res.status(500).json({ error: "Failed to get favorites" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { id, ...profileData } = req.body;
    console.log("Profile Data:", profileData);
    // Assuming you're using a function to update the user data in your database
    await userModel.updateUser(id, profileData);
    
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
};

module.exports = {
  getCurrentUser,
  getProfilePicture,
  addFav,
  removeFav,
  getAllFavorites,
  updateProfile,
};
