const { User } = require('../models/');
const bcrypt = require("bcrypt");

//Add new User
const addUser = async (req, res) => {
    try {
        const { username, password, role, status = 1 } = req.body;
        const role_list = ['admin', 'user'];

        if (role_list.includes(role)) {
            const user = await User.create({ username, password, role, status });
            if (user) {
                return res.status(200).send({ message: "User has been created!" });
            } else {
                return res.status(400).send({ message: "Something went wrong!" });
            }
        } else {
            return res.status(400).send({ message: "This role is not permitted!" });
        }

    } catch (err) {
        return res.status(400).send({ message: "User already exists!" });
    }
};

//Search All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users.length !== 0) {
            return res.status(200).send(users);
        } else {
            return res.status(400).send({ message: "Users was not found!" });
        }

    } catch (error) {
        return res.status(400).send({ message: "Error detected! Please contact the Administrator" });
    }
};

//Search Users Actived or Removed
const getFilterByStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.findAll({ where: { status: id } });
        if (users.length !== 0) {
            return res.status(200).send(users);
        } else {
            return res.status(400).send({ message: "Users was not found!" });
        }
    } catch (erro) {
        return res.status(400).send({ message: "Error Detected! Please contact the Administrator" });
    }
};

//Change user passoword
const changePassword = async (req, res) => {
    try {
        const { username, oldpassword, newpassword } = req.body;
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(400).send({ message: "User or Password are incorrect!" });
        }

        if (await user.validPassword(oldpassword)) {
            if (newpassword !== oldpassword) {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(newpassword, salt);
                const save = user.save();
                if (save) {
                    return res.status(200).send({ message: "Password has been changed!" });
                } else {
                    return res.status(400).send({ message: "It was not possible to change your password" });
                }
            } else {
                return res.status(400).send({ message: "Old and New Password are equals." });
            }

        } else {
            return res.status(401).send({ message: "User or Password are incorrect!" });
        }

    } catch (error) {
        return res.status(400).send({ message: "Error Detected! Please contact the Administrator" });
    }
};

//Change status = 0 to 1,  activing user
const activeUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }

        user.status = 1;
        const result = await user.save();
        if (result) {
            return res.status(200).send({ message: "User has been successfully actived!" });
        } else {
            return res.status(400).send({ message: "Error Detected! Please contact the Administrator" });
        }
    } catch (error) {
        return res.status(400).send({ message: "Error Detected! Please contact the Administrator" });
    }

};

//Change status = 1 to 0,  removing user
const removeUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }

        user.status = 0;
        const result = await user.save();
        if (result) {
            return res.status(200).send({ message: "User has been successfully removed!" });
        } else {
            return res.status(400).send({ message: "Error Detected! Please contact the Administrator" });
        }

    } catch (error) {
        return res.status(400).send({ message: "Error Detected! Please contact the Administrator" });
    }

};


module.exports = { getAllUsers, addUser, removeUser, getFilterByStatus, activeUser, changePassword };
