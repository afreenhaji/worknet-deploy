import multer from "multer";
const upload = multer({ dest: "uploads/" }); // Temporary folder just for uploading before sending to Cloudinary.
export default upload;
