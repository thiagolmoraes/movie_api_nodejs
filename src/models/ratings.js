'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Rating extends Model {

    }

    Rating.init({
        user_id: DataTypes.INTEGER,
        movie_id: DataTypes.INTEGER,
        rating: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Rating',
    });

    return Rating;
};