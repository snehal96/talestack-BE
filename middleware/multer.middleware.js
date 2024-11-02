// uploadMiddleware.js
const multer = require('multer')
const path = require('path')

const getFolderName = (url) => {
    if (url.includes('category')) {
        return 'category'
    }
    if (url.includes('tale')) {
        return 'tale'
    }
    if (url.includes('story')) {
        return 'story'
    }
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/${getFolderName(req.originalUrl)}/`); // Save files in an "uploads" folder in the project root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    req.fileUrl = `/uploads/${getFolderName(req.originalUrl)}/${fileName}`
    cb(null, fileName);
  }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Unsupported file type'), false); // Reject file
  }
};

// Initialize upload middleware
let multerMiddleware
try {
    multerMiddleware = multer({ 
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
        },
        fileFilter: fileFilter
    })

module.exports = multerMiddleware;
} catch (e) {
    console.log(e)
}
