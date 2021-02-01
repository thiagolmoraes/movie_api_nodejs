const { Movie } = require('../models/');
const sequelize = require("sequelize");

const getAll = async (req, res) => {
    try {
        const movies = await Movie.sequelize.query(`
            SELECT movies.id, movies.title, movies.overview, movies.release_date, movies.directors, movies.genders, movies.actors, ROUND(AVG(CAST(ratings.rating AS FLOAT)), 1) as rating 
            FROM movies LEFT JOIN ratings ON movies.id = ratings.movie_id 
            GROUP BY movies.id, movies.title
        `, { type: sequelize.QueryTypes.SELECT, nest: true });

        if (movies.length === 0) {
            return res.status(400).send({ message: "It was not possible list the movies! Contact the administrator!" });
        }

        return res.status(200).send(movies);

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
    }
};

// Add a new Movie
const addMovie = async (req, res) => {
    try {
        const { title, overview, release_date, directors, genders, actors } = req.body;
        const movie = await Movie.create({ title, overview, release_date, directors, genders, actors });

        if (!movie) {
            return res.status(400).send({ message: "Movie has not been created!" });
        }

        return res.status(200).send({ message: "Movie has been created!" });


    } catch (error) {
        return res.status(400).send({ message: "Movie already exists" });
    }
};

//Serch only by movies Titles
const details = async (req, res) => {
    try {
        const { title } = req.params;

        const movie = await Movie.sequelize.query(`
            SELECT movies.id, movies.title, movies.overview, movies.release_date, movies.directors, movies.genders, movies.actors, ROUND(AVG(CAST(ratings.rating AS FLOAT)), 1) as rating 
            FROM movies LEFT JOIN ratings ON movies.id = ratings.movie_id 
            WHERE movies.title like '%${title}%'
            GROUP BY movies.id, movies.title
        `, { type: sequelize.QueryTypes.SELECT, nest: true });

        if (movie.length === 0) {
            return res.status(400).send({ message: "Movies was not found! Use only Title names to search" });
        }

        return res.status(200).send(movie);

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." + error });
    }
};


//Search movie by diretors, title, gender or  actors
const findBy = async (req, res) => {
    try {
        const { name } = req.params;
        const movies = await Movie.sequelize.query(`
             SELECT
                movies.id,
                movies.title,
                movies.overview,
                movies.release_date,
                movies.directors,
                movies.genders,
                movies.actors,
                ROUND(AVG(CAST(ratings.rating AS FLOAT)), 1) as rating
            FROM
                movies
                LEFT JOIN ratings ON movies.id = ratings.movie_id      
            WHERE 
                movies.title like '%${name}%' or
                movies.actors like '%${name}%' or
                movies.directors like '%${name}%' or
                movies.genders like '%${name}%' 
            GROUP BY
                movies.id,
                movies.title
        
        `, { type: sequelize.QueryTypes.SELECT, nest: true });


        if (movies.length === 0) {
            return res.status(400).send({ message: "Movie was not found!" });
        }

        return res.status(200).send(movies);


    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." + error });
    }
};

module.exports = { getAll, addMovie, findBy, details };