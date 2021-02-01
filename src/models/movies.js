'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Movie extends Model {
    }

    Movie.associate = (models) => {
        Movie.belongsToMany(models.User, { through: 'Rating', as: 'users', foreignKey: "movie_id" });
    };

    Movie.init({
        title: DataTypes.STRING,
        overview: DataTypes.TEXT,
        release_date: DataTypes.INTEGER,
        rating: DataTypes.FLOAT,
        actors: DataTypes.STRING,
        directors: DataTypes.STRING,
        genders: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Movie',
    });

    return Movie;
};