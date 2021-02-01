const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { getAll, addMovie, findBy, details } = require("../controllers/movies");
const { voteUP, meVotes } = require("../controllers/ratings");

//Authorization Role 
const role = require('../middlewares/role');
const { authorize } = require('../middlewares/');


//List all Movies
router.get("/", authorize(role.ADMIN, role.USER), asyncHandler(getAll));

//Search movie only by Title name
router.get("/findby/:name", authorize(role.ADMIN, role.USER), asyncHandler(findBy));

//Search movie by director, actors, genders, titles
router.get("/details/:title", authorize(role.ADMIN, role.USER), asyncHandler(details));

//Create new Movie
router.post("/add", authorize(role.ADMIN), asyncHandler(addMovie));

//Vote for the movie
router.post("/vote", authorize(role.USER), asyncHandler(voteUP));

//Check My Votes
router.get("/check_votes", authorize(role.USER), asyncHandler(meVotes));

module.exports = router;