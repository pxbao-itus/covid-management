const multer = require('multer');

const storage = multer.memoryStorage();

// file validation
const fileFilter = (req, file, cb) => {
    cb(null, true);
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
})


module.exports = upload;