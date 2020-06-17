const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, '../public/images/');

export function upload(image) {
    let imgName = image.originalname.split('.').slice(0, -1).join('.');
    let newName =  imgName + '_' + Date.now() + '.' + image.originalname.split('.').pop();
    fs.writeFile(dirPath + newName, image.buffer, function(err){
        if (err) throw err;
    })
    return newName;
}

export function deleteImage(image) {
    let imagePath = dirPath + image
    if (fs.existsSync(imagePath)) return fs.unlinkSync(imagePath)
}