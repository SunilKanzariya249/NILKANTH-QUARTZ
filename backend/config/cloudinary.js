import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Configure Cloudinary if credentials are provided
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Cloudinary storage initialized successfully.');
} else {
  console.log('Cloudinary credentials missing. Falling back to local storage.');
}

/**
 * Uploads a file to Cloudinary, or falls back to saving it locally if credentials are not set.
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export const uploadToCloudinaryOrLocal = async (file) => {
  if (!file) return null;

  if (isCloudinaryConfigured()) {
    try {
      const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'nilkanth_quartz',
        resource_type: resourceType,
      });
      // Delete temporary local file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error, falling back to local file path:', error);
      // Fallback to local url if Cloudinary upload fails
    }
  }

  // Local storage fallback: move file from temporary folder to permanent uploads folder
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const fileExt = path.extname(file.originalname);
  const newFileName = `${file.fieldname}-${Date.now()}${fileExt}`;
  const targetPath = path.join(uploadsDir, newFileName);

  fs.renameSync(file.path, targetPath);
  
  // Return relative URL that will be served by express.static
  return `/uploads/${newFileName}`;
};

/**
 * Deletes a file from Cloudinary (or local uploads directory if it's stored locally)
 * @param {string} fileUrl - The URL of the file to delete
 */
export const deleteFromCloudinaryOrLocal = async (fileUrl) => {
  if (!fileUrl) return;

  if (fileUrl.startsWith('/uploads/')) {
    // Local deletion
    const localPath = path.join(process.cwd(), 'uploads', path.basename(fileUrl));
    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
        console.log(`Successfully deleted local file: ${localPath}`);
      } catch (err) {
        console.error(`Error deleting local file: ${err.message}`);
      }
    }
  } else if (isCloudinaryConfigured()) {
    // Cloudinary deletion
    try {
      // Extract public_id from URL
      // Example: https://res.cloudinary.com/cloud/image/upload/v1234/folder/id.jpg
      const parts = fileUrl.split('/');
      const fileNameWithExt = parts[parts.length - 1];
      const folderName = parts[parts.length - 2];
      const publicId = `${folderName}/${fileNameWithExt.split('.')[0]}`;
      
      const resourceType = fileUrl.includes('/video/upload/') ? 'video' : 'image';
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      console.log(`Successfully deleted Cloudinary resource: ${publicId}`);
    } catch (error) {
      console.error('Error deleting Cloudinary resource:', error.message);
    }
  }
};
