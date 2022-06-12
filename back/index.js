const express = require('express');
const morgan = require('morgan');
const app = express();

// 미들웨어
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('nodebird 백엔드 정상 동작!').status(200).end();
});

module.exports = app;