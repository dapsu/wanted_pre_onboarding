const Sequelize = require("sequelize");

module.exports = class Recruit extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            companyName: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            country: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            location: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            recruitPosition: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            signingBonus: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            recruitDescribe: {
                type: Sequelize.STRING(300),
                allowNull: false
            },
            skillStack: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Recruit',
            tableName: 'recruits',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {

    }
}