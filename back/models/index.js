const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Recruit = require('./recruit');
const User = require('./user');

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
db.User = User;

// init 통해 시퀄라이즈 인스턴스 실행
Recruit.init(sequelize);
User.init(sequelize);

// 테이블 관계 설정 (하나의 회사가 많은 지원자를 받을 수 있는 1:N 관계)
Recruit.associate(db);
User.associate(db);

module.exports = db;