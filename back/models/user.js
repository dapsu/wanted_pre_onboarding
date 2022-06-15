const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(45),
                allowNull: false,
                unique: true
            },
            userName: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            passowrd: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {
        db.User.belongsTo(db.Recruit);
    }
}