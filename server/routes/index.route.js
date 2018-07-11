const router = require('express').Router(),
  faceScanController = require('../controllers/face_scanning.controller'),
  voiceVerificationController = require('../controllers/voice_verfication.controller'),
  express_healthcheck = require('express-healthcheck'),
  multer = require('multer')({ dest: './photos' });

router.get('/healthcheck', express_healthcheck());

router.post(
  '/face-scanning',
  multer.fields([
    { name: 'image', maxCount: 1 },
    { name: 'voice', maxCount: 1 },
  ]),
  faceScanController,
);

router.post('/voice-verification', voiceVerificationController);

module.exports = router;
