/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ratings',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        movie_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
