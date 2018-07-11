const logger = require('../../config/winston');
const config = require('../../config/config');
const AWS = require('aws-sdk');
const apiError = require('../../config/apiError');
const voiceIds = require('../models/voice_id.model');
const request = require('request-promise');
AWS.config.update({
  region: config.region,
});
const rekognition = new AWS.Rekognition({ region: config.region });
const fs = require('fs');

module.exports = function(req, res, next) {
  logger.info('FILEs: ' + JSON.stringify(req.files));
  logger.info('Face Scan Initiated');
  const imageFile = fs.readFileSync('./' + req.files.image[0].path);
  const voiceFilePath = './' + req.files.voice[0].path;

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
        if (data.FaceMatches && data.FaceMatches.length === 0) {
          next(new apiError('No Face Found'));
        } else if (
          data.FaceMatches &&
          data.FaceMatches[0].Face.ExternalImageId
        ) {
          const user = data.FaceMatches[0].Face.ExternalImageId.split('.')[0];
          console.log(user);
          let req = request(
            {
              method: 'POST',
              url:
                'https://westus.api.cognitive.microsoft.com/spid/v1.0/verify',
              qs: {
                verificationProfileId: voiceIds[user],
              },
              headers: {
                'Ocp-Apim-Subscription-Key': 'd64ba44d2e5b4610b26d498ee75aa5be',
              },
            },
            function(err, response, body) {
              if (err) {
                console.log(err);
                next(new apiError(err));
              } else {
                console.log('body:', body);
                res.send(user);
              }
            },
          );
          let form = req.form();
          form.append('file', fs.createReadStream(voiceFilePath));
        } else {
          next(new apiError(data));
        }
      }
    },
  );
};
