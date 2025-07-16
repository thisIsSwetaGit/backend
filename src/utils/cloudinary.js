import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


// Debug: Check if environment variables are loaded
console.log("Environment variables check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "MISSING",
  api_key: process.env.CLOUDINARY_API_KEY || "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "EXISTS" : "MISSING"
});

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        
        // Check if file exists before attempting upload
        if (!fs.existsSync(localFilePath)) {
            console.log("File does not exist:", localFilePath);
            return null;
        }
        
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        
        // File has been uploaded successfully
        console.log("File uploaded successfully to cloudinary:", response.url);
        
        // Remove the local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
        
        return response;

    } catch (error) {
        console.error("Error uploading to cloudinary:", error);
        
        // Remove the locally saved temporary file only if it exists
        // as the upload operation failed
        if (fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath)
            } catch (unlinkError) {
                console.error("Error deleting local file:", unlinkError);
            }
        }
        
        return null;
    }
}

export {uploadOnCloudinary}