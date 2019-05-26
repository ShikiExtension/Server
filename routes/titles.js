const router = require('express').Router();
const controller = require('../app/controllers/titles');

router.get('/title/:id/videos/episode/:episode', controller.videos);

router.get('/title/:id/videos/episodes/', controller.episodes);

module.exports = router;