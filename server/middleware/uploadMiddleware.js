let multer = require('multer');
const uploadCheck = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    diskStorage: {
        destination: function (req, file, cb) {
            cb(null, '../public/images')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }
});
console.log(uploadCheck.storage);

module.exports = uploadCheck;