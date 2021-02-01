'use strict';

const bcrypt = require("bcrypt");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class User extends Model {

        async validPassword(password) {
            return await bcrypt.compareSync(password, this.password);
        }
    }

    User.associate = (models) => {
        User.belongsToMany(models.Movie, {
            through: 'Rating',
            as: 'movies',
            foreignKey: 'user_id'
        });
    };

    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

    return User;
};