const AWS = require('aws-sdk')
const fs = require('fs');
const Bucket = 'node-demo-project';
// const dirPath = path.join(__dirname, '../public/images/');

// Enter copied or downloaded access ID and secret key here
const ID = process.env.ID;
const SECRET = process.env.SECRET;
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

export function upload(image) {
    let imgName = image.originalname.split('.').slice(0, -1).join('.');
    let newName =  imgName + '_' + Date.now() + '.' + image.originalname.split('.').pop();
    const params = {
        Bucket: Bucket,
        Key: newName, // File name you want to save as in S3
        Body: Buffer.from(image.buffer, 'base64'),
        ContentType:image.mimetype,
        ACL: 'public-read',
    };
    s3.putObject(params, function(err, data) {
        if (err) {
            throw err;
        }
    });
    return newName;
}

export function deleteImage(image) {
    s3.deleteObject({
        Bucket: Bucket,
        Key: image
      },function (err,data){})
}