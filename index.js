require('dotenv').config();

const HttpException = require('./app/exceptions/HttpException');
const StatisticsMiddleware = require('./app/middlewares/StatisticsMiddleware');
const HandleResponse = require('./src/services/HandleResponse/HandleResponse');
const TitlesRouter = require('./routes/titles');
const allowOrigins = require('./config/app').cors.allowOrigins;

const express = require('express');
const app = express();

app.use(StatisticsMiddleware.handle);

app.use((req, res, next) => {
    const requestOrigin = req.get('Origin');
    let responseOrigin = allowOrigins.slice(0).shift();

    if (allowOrigins.includes(requestOrigin))
        responseOrigin = allowOrigins[allowOrigins.indexOf(requestOrigin)];

    res.set('Access-Control-Allow-Origin', responseOrigin);
    res.set('Access-Control-Allow-Credentials', 'false');

    next();
});

app.use('/', TitlesRouter);

app.use((error, req, res, next) => {
    console.error(error);

    if (error instanceof HttpException)
        return void HandleResponse.getInstance(res).throwError(error, res);

    res.sendStatus(500);
});

app.use((req, res) => {
    res
        .status(403)
        .send('Access denied');
});

const server = app.listen(5000);

process.on('exit', function () {
    server.close();
});