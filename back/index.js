const express = require('express');
const morgan = require('morgan');
const app = express();
const { sequelize } = require('./models');

sequelize.sync({ force: false })
    .then(() => {
        console.log('DB 연결 성공!')
    })
    .catch((err) => {
        console.error(err);
    });

// 미들웨어
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('nodebird 백엔드 정상 동작!').status(200).end();
});

module.exports = app;