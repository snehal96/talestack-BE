const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");

const awsAccountConfig = require("../config/fileupload.config.json");

exports.fileUploadMiddleware = (req, res, next) => {
  if (req.files) {
    AWS.config.update({
      accessKeyId: awsAccountConfig.accessKeyId, // Access key ID
      secretAccesskey: awsAccountConfig.secretAccesskey, // Secret access key
      region: awsAccountConfig.region, //Region
    });

    const s3 = new AWS.S3();

    // Binary data base64
    const fileContent = Buffer.from(req.files.uploadedFileName.data, "binary");
    const fileName = `${
      req.files.uploadedFileName.name
    }_${new Date().toString()}`;

    // Setting up S3 upload parameters
    const params = {
      Bucket: awsAccountConfig.bucketName,
      Key: fileName,
      Body: fileContent,
    };
    const url = `${awsAccountConfig.endpointUrl}/${awsAccountConfig.bucketName}/${fileName}`;

    // Uploading files to the bucket
    s3.upload(params, function (err, data) {
      if (err) {
        throw err;
      }
      req.fileUrl = url;
      next();
    });
  } else {
    next();
  }
};
