import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryUploader = async (localFileUpload) => {
  try {
    if (!localFileUpload) return null;
    const response = await cloudinary.uploader.upload(localFileUpload, {
      resource_type: "auto",
    });
    console.log(`File has been uploaded successfully!! URL: ${response.url}`);
  } catch (error) {
    fs.unlinkSync(localFileUpload);
    console.log(error);
    return null;
  }
};
