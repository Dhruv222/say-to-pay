const router = require('express').Router(),
  faceScanController = require('../controllers/face_scanning.controller'),
  voiceVerificationController = require('../controllers/voice_verfication.controller'),
  express_healthcheck = require('express-healthcheck');

router.use('/healthcheck', express_healthcheck());

router.use('/face-scanning', faceScanController);

router.use('/voice-verification', voiceVerificationController);

module.exports = router;
