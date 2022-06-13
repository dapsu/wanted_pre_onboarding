const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Recruit = require('./recruit');

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Recruit = Recruit;

Recruit.init(sequelize);
Recruit.associate(db);

module.exports = db;