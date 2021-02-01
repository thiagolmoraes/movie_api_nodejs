'use strict';

const movies = [
  {
    "title": "The Cotton Club",
    "release_date": 1984,
    "rating": 4,
    "genders": "Music, Action",
    "actors": "Tim, Claus, Mario Novas",
    "directors": "Francis Ford Coppola, Blazer",
    "overview": "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47",

  },
  {
    "title": "Beetlejuice",
    "release_date": 1988,
    "rating": 3.3,
    "genders": "Fantasy",
    "actors": "Tim, Claus, Mario Novas, Ricardo, Paulo",
    "directors": "Tim Burton",
    "overview": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47",
  },
  {
    "title": "The Shawshank Redemption",
    "release_date": 1994,
    "rating": "30",
    "genders": "Drama",
    "actors": "Fabiana, Marcos, Geraldo",
    "directors": "Frank Darabont",
    "overview": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47",

  },
  {
    "title": "Crocodile Dundee",
    "release_date": 1986,
    "rating": 4,
    "genders": "Comedy",
    "directors": "Peter Faiman",
    "actors": "Crocodilo Danti, Marcos Paulo",
    "overview": "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47",

  },
  {
    "title": "Valkyrie",
    "release_date": 2008,
    "rating": 10,
    "genders": "Thriller, Comedy",
    "directors": "Bryan Singer",
    "actors": "Tim, Claus, Mario Novas, Ricardo, Paulo",
    "overview": "A dramatization of the 20 July assassination and political coup overview by desperate renegade German Army officers against Hitler during World War II.",
    "created_at": "2021-02-01 01:59:47",
    "updated_at": "2021-02-01 01:59:47",
  },
];


module.exports = {

  /* eslint-disable no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('movies', movies, {});
  },

  /* eslint-disable no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
