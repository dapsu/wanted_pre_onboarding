const express = require('express');
const morgan = require('morgan');
const app = express();
const api = require('./routes/index');

// 미들웨어
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', api);      // api 미들웨어 등록

module.exports = app;