const jwt = require('jsonwebtoken');
const config = require("../config/jwt.config").secret;

function verifyJWT(req, res, next) {
    const token = req.cookies['authcookie'] || '';
    try {
        if (!token) return res.status(401).send({ message: 'No token provided.' });


        jwt.verify(token, config, function (err, decoded) {
            if (err) return res.status(500).send({ message: 'Failed to authenticate token.' });

            let rol = decoded.role;
            req.userRole = rol.toLowerCase();
            req.userId = decoded.id;
            req.userName = decoded.username;

            next();
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

function authorize(...roles) {
    const allowedRoles = new Set(roles);

    return (req, res, next) => {
        if (!isAuthorized([req.userRole], allowedRoles)) {
            // next();
            return res.status(501).send({ message: "Forbidden Access" });
        }

        next();
    };
}

function isAuthorized(userRoles, allowedRoles) {
    // O(n) runtime where n is the amount of roles a user has
    return userRoles.some((role) => allowedRoles.has(role));
}

module.exports = { authorize, verifyJWT };

