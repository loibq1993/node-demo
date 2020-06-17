let multer = require('multer');
const uploadCheck = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

module.exports = uploadCheck;