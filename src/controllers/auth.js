const { User } = require('../models/');
const jwt = require('jsonwebtoken');
const config = require("../config/jwt.config").secret;

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ attributes: ['id', 'username', 'password', 'role'], where: { username, status: 1 } });
        if (user) {
            const valid = await user.validPassword(password);
            if (valid) {

                const token = jwt.sign(user.toJSON(), config, { expiresIn: '1d' });

                //Authentication
                return res.cookie('authcookie', token, { expires: new Date(Date.now() + '1d'), httpOnly: false, secure: false }).status(200)
                    .send({ message: "User has been authenticated!", token: token });
            } else {
                return res.status(400).send({ message: "Authentication Failed" });
            }
        } else {
            return res.status(400).send({ message: "User or Password Incorrect!" });
        }
    } catch (error) {
        return res.status(400).send({ message: "Something went wrong" + error });
    }
};

const logout = async (req, res) => {
    res.cookie('authcookie', { maxAge: 0 });
    res.status(200).send({ message: "Logout Successful" });
};

const teste = async (req, res) => {
    console.log(`${req.userRole}`);
    res.send({ who: req.userName, token: req.cookies['authcookie'], role: req.userRole, message: "Working Fine!" });
};

module.exports = { logout, login, teste };