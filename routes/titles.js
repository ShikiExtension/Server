const router = require('express').Router();

router.get(
    '/title/:id/videos/episode/:episode',
    require('../app/controllers/titles').titleVideos
);

module.exports = router;