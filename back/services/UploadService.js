const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const uploadPath = path.join(__dirname, "../uploads");

const uploadToStorage = async (file) => {
  // Generate a unique filename
  const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
  const filePath = path.join(uploadPath, fileName);
  // Save the file to the local file system
  fs.writeFileSync(filePath, file.buffer);
  // Return the URL (assuming you serve static files from the upload directory)
  const url = `http://localhost:5001/uploads/${fileName}`;
  return url;
};

module.exports = {
  uploadToStorage,
};
