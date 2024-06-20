const imageModel = require("../models/imageModel");

exports.listImages = async (req, res) => {
  const { folder } = req.query;
  try {
    const fileNames = await imageModel.listImages(folder);
    res.status(200).json(fileNames);
  } catch (err) {
    console.error("Error listing images:", err);
    res.status(500).json({ error: "Failed to list images" });
  }
};

exports.getImage = async (req, res) => {
  const { folder, fileName } = req.query;
  try {
    const exists = await imageModel.checkFileExists(folder, fileName);
    if (!exists) {
      return res.status(404).json({ error: "File not found" });
    }
    const readStream = imageModel.getImageStream(folder, fileName);
    res.setHeader("Content-Type", "image/jpeg"); // Adjust the content type as necessary
    readStream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: "Failed to get image" });
  }
};

exports.insertImage = async (req, res) => {
  const { folder, fileName } = req.body;
  const fileBuffer = req.file.buffer;
  try {
    await imageModel.insertImage(folder, fileName, fileBuffer);
    res.status(201).json({ message: "Image uploaded successfully", fileName });
  } catch (err) {
    console.error("Error inserting image:", err);
    res.status(500).json({ error: "Failed to insert image" });
  }
};

exports.deleteImage = async (req, res) => {
  const { folder, fileName } = req.body;
  try {
    await imageModel.deleteImage(folder, fileName);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
};
