const AWS = require("aws-sdk");

const awsAccountConfig = require("../config/fileupload.config.json");

exports.fileUploadMiddleware = (req, res, next) => {
  if (req.body.files || req.body.file) {
    var credentials = new AWS.SharedIniFileCredentials()
    AWS.config.credentials = credentials
    const s3 = new AWS.S3();

    let files = req.body.files
    if (req.body.file) {
      files = [req.body.file]
    }

    const fileUrl = []
    var result = new Promise((resolve, reject) => {
      files.forEach((file, index) => {
        const fileContent = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), "base64");
        const fileName = `${
          req.body.type
        }_${Date.now()}`;

        // Setting up S3 upload parameters
        const params = {
          Bucket: awsAccountConfig.bucketName,
          Key: fileName,
          Body: fileContent,
        };
        const url = `${awsAccountConfig.endpointUrl}/${awsAccountConfig.bucketName}/${fileName}`;
        s3.upload(params, function (err, data) {
          if (err) {
            resolve()
            throw err;
          }
          fileUrl.push(url)
        });

        if (index === files.length) {
          resolve()
        }
      })
    })

    result.then(() => {
      req.fileUrl = fileUrl;
      next();
    })
  } else {
    console.log("inside else")
    next();
  }
};
