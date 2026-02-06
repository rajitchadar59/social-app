const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const path = require('path');
// Force load .env from the root server folder
require('dotenv').config({ path: path.join(__dirname, '../../.env') }); 

// Debugging: Terminal mein check karo ye kya print kar raha hai
console.log("Cloudinary Name Loading Check:", process.env.CLOUDINARY_CLOUD_NAME);

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error("❌ ERROR: Cloudinary Config not found in process.env!");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    // Agar buffer khali hai toh turant reject karo
    if (!buffer) return reject("No buffer provided");

    let stream = cloudinary.uploader.upload_stream(
      { folder: "taskplanet_feed" },
      (error, result) => { 
        if (result) resolve(result); 
        else {
          console.error("Cloudinary Upload Error Details:", error);
          reject(error); 
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { uploadToCloudinary };