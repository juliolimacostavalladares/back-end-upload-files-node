const multerS3 = require('multer-s3'),
      aws = require('aws-sdk'),
      crypto = require('crypto'),
      multer = require('multer')



const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCSSE_KEY,
    region: process.env.AWS_DEFALT_REGION
});


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key:  (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err)
                cb(null,   hash.toString('hex') + '-'+ file.originalname); 
            });
        }
    })
});

module.exports = {
    s3: upload,
}