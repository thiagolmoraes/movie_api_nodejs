const { Rating, Movie, User } = require("../models");

const voteUP = async (req, res) => {
    try {
        const { movie_id, rating } = req.body;
        const movie_result = await Movie.findOne({ where: { id: movie_id } });
        if (!movie_result) {
            return res.status(400).send({ message: "Movie was not found!" });
        }

        //Check if user already vote in that movie_id

        const duplicate_vote = await Rating.findOne({
            where: { movie_id, user_id: req.userId }
        });

        if (duplicate_vote) {
            return res.status(400).send({ message: "You already voted in this Movie, can not vote twice!" });
        }

        // Value between 0 and 4
        if (!isNaN(rating) && typeof rating == 'number' && rating >= 0 && rating <= 4) {
            const ratings = await Rating.create({ user_id: req.userId, movie_id: movie_id, rating });

            if (!ratings) {
                return res.status(400).send({ message: "Sorry, it was not possible to vote!" });
            }
            return res.status(200).send({ message: "Vote successfully registered" });
        } else {
            return res.status(400).send({ message: "The rating value must be between 0 and 4!" });
        }

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
    }
};


const meVotes = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['username'],
            where: { id: req.userId },
            include: [{
                model: Movie,
                as: 'movies',
                require: false,
                attributes: ['title'],
                through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: Rating,
                    as: 'ratings',
                    attributes: ['rating'],
                }
            }]
        });

        if (!user) {
            return res.status(400).send({ message: "You did not vote yet!" });
        }
        return res.status(200).send(user);

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong" });
    }
};

module.exports = { voteUP, meVotes };