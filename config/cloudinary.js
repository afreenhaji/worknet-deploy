import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary Config - move this to a central config file if possible
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error("No file path provided for upload");
        }

        const uploadResult = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);  // Remove local file after upload
        return uploadResult.secure_url;

    } catch (error) {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Ensure cleanup even if error occurs
        }
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
};

export default uploadOnCloudinary;
