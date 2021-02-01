const { Rating, Movie, User } = require("../models");
const sequelize = require("sequelize");
const voteUP = async (req, res) => {
    try {
        const { movie_id, rating } = req.body;
        const movie_result = await Movie.findOne({ movie_id });
        if (!movie_result) {
            return res.status(400).send({ message: "Movie was not found!" });
        }

        //Check if user already vote in that movie_id
        const duplicate_vote = await Rating.findOne({
            where: { movie_id, user_id: req.userId }
        });

        // if (duplicate_vote) {
        //     return res.status(400).send({ message: "You already voted in this Movie, can not vote twice!" });
        // }

        // Value between 0 and 4
        if (!isNaN(rating) && typeof rating == 'number' && rating >= 0 && rating <= 4) {
            // const ratings = await Rating.create({ user_id: req.userId, movie_id: movie_id, rating });
            const ratings = 1;
            if (ratings) {

                //Average here
                //Search all count and value about rating with  movie relation in Rating Table:
                const ratings_data = await Rating.sequelize.query(
                    `select avg(rating) as AR from ratings
                where movie_id = ${movie_id}
                group by movie_id
                `
                    , { type: sequelize.QueryTypes.SELECT, nest: true });

                if (!ratings_data) {
                    return res.status(400).send({ message: "Something went wrong" });
                }

                movie_result.rating = ratings_data[0].AR;
                const update = await movie_result.save();
                if (update) {
                    return res.status(200).send({ message: "Vote successfully registered" });
                } else {
                    return res.status(400).send({ message: "Sorry, it was not possible to vote!" });
                }

            } else {
                return res.status(400).send({ message: "Sorry, it was not possible to vote!" });
            }

        } else {
            return res.status(400).send({ message: "Please, It is just only permitted numbers between 0 and 4" });
        }


    } catch (error) {
        return res.status(400).send({ message: "Something went wrong" + error });
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