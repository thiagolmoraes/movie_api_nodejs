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
        if (users.length == 0) {
            return res.status(400).send({ message: "Users was not found!" });
        }

        return res.status(200).send(users);

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
    }
};

//Search Users Actived or Removed
const getFilterByStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.findAll({ where: { status: id } });

        if (users.length == 0) {
            return res.status(400).send({ message: "Users was not found!" });
        }
        return res.status(200).send(users);

    } catch (erro) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
    }
};

//Change user passoword
const changePassword = async (req, res) => {
    try {
        const { username, oldpassword, newpassword } = req.body;
        const user = await User.findOne({
            where: { username }
        });

        console.log(user);

        if (user.username !== req.userName) {
            return res.status(400).send({ message: "Only change your user's password!" });
        }

        if (!user || user == null) {
            return res.status(400).send({ message: "User or Password are incorrect!" });
        }

        if (!await user.validPassword(oldpassword)) {
            return res.status(401).send({ message: "User or Password are incorrect!" });

        }
        if (newpassword == oldpassword) {
            return res.status(400).send({ message: "Old and New Password are equals." });
        }

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(newpassword, salt);
        const save = user.save();

        if (!save) {
            return res.status(400).send({ message: "It was not possible to change your password" });
        }

        return res.status(200).send({ message: "Password has been changed!" });

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
    }
};

//Change status = 0 to 1,  activing user
const activateUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({
            where: { username }
        });

        if (!user || user.status === 1) {
            return res.status(400).send({ message: "User not found!" });
        }

        user.status = 1;
        const result = await user.save();

        if (!result) {
            return res.status(400).send({ message: "It was not possible activate user" });
        }

        return res.status(200).send({ message: "User has been successfully activated!" });

    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
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

        if (!result) {
            return res.status(400).send({ message: "It was not possible remove user!" });
        }

        return res.status(200).send({ message: "User has been successfully removed!" });


    } catch (error) {
        return res.status(400).send({ message: "Something went wrong, please contact the administrator." });
    }

};


module.exports = { getAllUsers, addUser, removeUser, getFilterByStatus, activateUser, changePassword };
