require('dotenv').config();

const TitlesController = require('./app/controllers/titles');
const StatisticsMiddleware = require('./app/middlewares/StatisticsMiddleware');

const express = require('express');
const app = express();

app.use(StatisticsMiddleware.handle);

app.get('/', (req, res) => {
    res.status(403).send('Access denied');
});

app.get('/title/:id/videos/:page?', TitlesController.titleVideos);

app.listen(5000);