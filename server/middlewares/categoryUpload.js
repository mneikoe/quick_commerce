import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder for categories if not exists
const categoryUploadPath = "uploads/category";
if (!fs.existsSync(categoryUploadPath)) {
  fs.mkdirSync(categoryUploadPath, { recursive: true });
}

// Configure multer storage for category images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, categoryUploadPath); // Uploads to the category folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter(req, file, cb) {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = allowed.test(file.mimetype);
    if (allowed.test(ext) && mime) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Export middleware to be used in routes
export const uploadCategoryImage = upload.single("image");
