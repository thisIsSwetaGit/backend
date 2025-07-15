import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { log } from 'console';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilePath) => {
    try {
        if (!localfilePath)
            return null;
        //Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localfilePath, { resource_type: 'auto' })
        //file has been uploaded successfully
        // console.log("File uploaded successfully to Cloudinary", response.url);
        fs.unlinkSync(localfilePath)
        return response;
    }
    catch (error) {
        fs.unlinkSync(localfilePath); // Delete the local file if upload fails
        return null;
    }
}
export { uploadOnCloudinary }; 