const multer = require('multer');
const fs = require('fs');
const path = require('path');
   
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads/'; 
    // Check if the upload directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => { 
    cb(null, `${Date.now()}-${file.originalname.trim()}`);
  }
}); 
  
// Create the multer instance for multiple file uploads
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit per file  
  }
}); 
// }).array('file', 5); // 'file' is the field name in the form, 5 is the maximum number of files allowed
 
module.exports = upload;

  