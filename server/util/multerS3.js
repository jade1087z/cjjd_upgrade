const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const config = require("../config/key.js");

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: config.access_key,
        secretAccessKey: config.secret_key,
    },
});

function setUpload(bucket) {
    const upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: bucket,
            metadata: function(req, file, cb) { 
                cb(null, {fieldName: file.fieldname})
            },
            acl: "public-read-write",
            ContentDisposition: 'inline',
            key: function (req, file, cb) {
                let extenstion = path.extname(file.originalname);
                cb(null, Date.now().toString() + extenstion);
            },
            // contentType: multerS3.AUTO_CONTENT_TYPE,
            contentType: (req, file, cb) => {
                cb(null, file.mimetype)
            }
        }),
        limits: {
            fileSize: 10 * 1024 * 1024, // 파일 크기 제한을 10MB로 설정
          },
    }).array("imgFile", 10);
    return upload;
}

module.exports = setUpload;