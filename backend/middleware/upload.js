import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure temporary uploads directory exists
const tempDir = path.join(process.cwd(), 'temp_uploads');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
  }
});

// File filter validation
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype;
  
  if (file.fieldname === 'images') {
    if (fileType.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed for product photos'), false);
    }
  } else if (file.fieldname === 'video') {
    if (fileType.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed for product clip'), false);
    }
  } else {
    cb(new Error('Unexpected field upload'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max file size (useful for videos)
  }
});

// Combine images (up to 5) and video (up to 1) fields
export const productUpload = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'video', maxCount: 1 }
]);
