'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      overview: {
        type: Sequelize.TEXT
      },
      actors: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.FLOAT
      },
      directors: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genders: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};