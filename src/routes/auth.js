const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { login, teste, logout } = require("../controllers/auth");

//Authorization Role 
const role = require('../middlewares/role');
const { verifyJWT, authorize } = require('../middlewares/');

//Login Authentication
router.post('/login', asyncHandler(login));

//Logout
router.delete('/logout', asyncHandler(logout));

//Global Check JWT Token
router.use(verifyJWT);

//Who Am I? Middlware Test
router.get("/teste", authorize(role.ADMIN, role.USER), asyncHandler(teste));


module.exports = router;    