const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Recruit = require('./recruit');

const db = {};
//시퀄라이즈 인스턴스 생성
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Recruit = Recruit;

Recruit.init(sequelize);    // init 통해 시퀄라이즈 인스턴스 실행
Recruit.associate(db);

module.exports = db;