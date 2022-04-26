const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/thumbnails');
    },
    filename: (req, file, cb) => {
        // Ensures that images will be stored with a unique name and not be overwritten
        const fileName = `avatar-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage

}).single('avatar');

module.exports = { upload };