const { Movie } = require('../models/');
const { Sequelize } = require("sequelize");

const getAll = async (req, res) => {
    try {
        const movies = await Movie.findAll({});
        if (movies.length !== 0) {
            return res.status(200).send(movies);
        } else {
            return res.status(400).send({ message: "It was not possible list the movies! Contact the administrator!" });
        }
    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator" + error });
    }
};


const addMovie = async (req, res) => {
    try {
        const { title, overview, release_date, rating, directors, genders, actors } = req.body;
        const movie = await Movie.create({ title, overview, release_date, rating, directors, genders, actors });
        if (movie) {
            return res.status(200).send({ message: "Movie has been created!" });
        } else {
            return res.status(400).send({ message: "Movie has not been created!" });
        }

    } catch (error) {
        return res.status(400).send({ message: "Movie already exists" });
    }
};

//Serch only by movies Titles
const details = async (req, res) => {
    try {
        const { title } = req.params;
        const Op = Sequelize.Op;
        const movie = await Movie.findOne({
            attributes: ['title', 'overview', 'release_date', 'rating', 'directors', 'genders', 'actors'],
            where: {
                [Op.or]: [
                    { title: { [Op.like]: '%' + title + '%' } },
                ]
            }
        });

        if (movie) {
            return res.status(200).send(movie);
        } else {
            return res.status(400).send({ message: "Movies was not found! Use only Title names to search" });
        }
    } catch (erro) {
        return res.status(400).send({ message: "Something went wrong, plase contact the administrator" });
    }
};


//Search movie by diretors, title, gender or  actors
const findBy = async (req, res) => {
    try {
        const { name } = req.params;
        const Op = Sequelize.Op;
        const movies = await Movie.findAll({
            attributes: ['title', 'overview', 'release_date', 'rating', 'directors', 'genders', 'actors'],
            where: {
                [Op.or]: [
                    { title: { [Op.like]: '%' + name + '%' } },
                    { genders: { [Op.like]: '%' + name + '%' } },
                    { directors: { [Op.like]: '%' + name + '%' } },
                    { actors: { [Op.like]: '%' + name + '%' } }
                ]
            }
        });

        if (movies.length != 0) {
            return res.status(200).send(movies);
        } else {
            return res.status(400).send({ message: "Movie was not found!" });
        }

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, plase contact the administrator" + error });
    }
};

module.exports = { getAll, addMovie, findBy, details };