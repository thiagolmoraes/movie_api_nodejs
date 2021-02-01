'use strict';

const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('123mudar', salt);

const user = [
  {
    "username": "admin",
    "password": hash,
    "status": 1,
    "role": "admin",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "username": "user1",
    "password": hash,
    "status": 1,
    "role": "user",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "username": "user2",
    "password": hash,
    "status": 1,
    "role": "user",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "username": "user3",
    "password": hash,
    "status": 1,
    "role": "user",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "username": "user4",
    "password": hash,
    "status": 1,
    "role": "user",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
];

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', user, {});

  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
