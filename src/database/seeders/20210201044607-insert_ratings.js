'use strict';

const ratings = [
  //The Cotton Club
  {
    "movie_id": 1,
    "user_id": 2,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "movie_id": 1,
    "user_id": 3,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "movie_id": 1,
    "user_id": 4,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  //Beetlejuice
  {
    "movie_id": 2,
    "user_id": 2,
    "rating": 2,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "movie_id": 2,
    "user_id": 3,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "movie_id": 2,
    "user_id": 4,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  //Crocodile Dundee
  {
    "movie_id": 3,
    "user_id": 2,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "movie_id": 3,
    "user_id": 3,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
  {
    "movie_id": 3,
    "user_id": 4,
    "rating": 4,
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47"
  },
];

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ratings', ratings, {});

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
