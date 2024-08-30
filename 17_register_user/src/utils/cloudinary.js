import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudniary configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadOnCloudinary = async (localFileUpload) => {
  try {
    if (!localFileUpload) return null;
    // file uploaded on cloudinary
    const response = await cloudinary.uploader.upload(localFileUpload, {
      resource_type: "auto",
    });

    console.log(`File has been uploaded successfully!! URL: ${response.url}`);
    // file removed in the local directory after uploading
    fs.unlinkSync(localFileUpload);
    return response;
  } catch (error) {
    fs.unlinkSync(localFileUpload);
    console.log(`Error: ${error}`);
    return null;
  }
};
