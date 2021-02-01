const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { changePassword, activeUser, getAllUsers, addUser, removeUser, getFilterByStatus } = require("../controllers/users");

//Authorization Role 
const role = require('../middlewares/role');
const { authorize } = require('../middlewares/');

//List all Users
router.get("/", authorize(role.ADMIN), asyncHandler(getAllUsers));

//Search User who are in enable (1) or disable (0) status
router.get("/status/:id", authorize(role.ADMIN), asyncHandler(getFilterByStatus));

//Create a new User
router.post("/add", authorize(role.ADMIN), asyncHandler(addUser));

//Change user Password
router.post("/changepassword", authorize(role.ADMIN, role.USER), asyncHandler(changePassword));

//Disable User
router.delete("/remove/:username", authorize(role.ADMIN), asyncHandler(removeUser));

//Enable User
router.put("/active", authorize(role.ADMIN), asyncHandler(activeUser));

module.exports = router;