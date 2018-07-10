const logger = require('../../config/winston');
const config = require('../../config/config');
const AWS = require('aws-sdk');
const apiError = require('../../config/apiError');
AWS.config.update({
  accessKeyId: config.aws_access_key_id,
  secretAccessKey: config.aws_secret_access_key,
  region: config.region,
});
const rekognition = new AWS.Rekognition({ region: config.region });
const fs = require('fs');

module.exports = function(req, res, next) {
  const imageFile = fs.readFileSync(
    req.file.destination + '/' + req.file.filename,
  );

  logger.info(imageFile);

  rekognition.searchFacesByImage(
    {
      CollectionId: 'FaceImages',
      FaceMatchThreshold: 95,
      Image: {
        Bytes: imageFile,
      },
    },
    function(err, data) {
      if (err) {
        next(new apiError(err));
      } else {
        logger.info(data);
        res.send();
      }
    },
  );
};
