const router = require('express').Router(),
  faceScanController = require('../controllers/face_scanning.controller'),
  voiceVerificationController = require('../controllers/voice_verfication.controller'),
  express_healthcheck = require('express-healthcheck'),
  multer = require('multer')({ dest: './photos' });

router.get('/healthcheck', express_healthcheck());

router.post('/face-scanning', multer.single('image'), faceScanController);

router.post('/voice-verification', voiceVerificationController);

module.exports = router;
