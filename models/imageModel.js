const path = require("path");
const { Storage } = require("@google-cloud/storage");

// Path to your service account key file
const keyFilePath = path.join(__dirname, "../configs", "google-cloud-key.json");

// Initialize the Google Cloud Storage client
const storage = new Storage({
  keyFilename: keyFilePath,
  projectId: "stone-ward-426108-p2", // Replace with your actual project ID
});

const bucketName = "bazarbazar_pictures"; // Replace with your actual bucket name
const bucket = storage.bucket(bucketName);

exports.listImages = async (folder) => {
  const [files] = await bucket.getFiles({ prefix: `${folder}/` });
  return files.map((file) => file.name);
};

exports.getImageStream = (folder, fileName) => {
  const file = bucket.file(`${folder}/${fileName}`);
  return file.createReadStream();
};

exports.checkFileExists = async (folder, fileName) => {
  const file = bucket.file(`${folder}/${fileName}`);
  const [exists] = await file.exists();
  return exists;
};

exports.insertImage = async (folder, fileName, fileBuffer) => {
  const file = bucket.file(`${folder}/${fileName}`);
  await file.save(fileBuffer);
  return fileName;
};

exports.deleteImage = async (folder, fileName) => {
  const file = bucket.file(`${folder}/${fileName}`);
  await file.delete();
};
