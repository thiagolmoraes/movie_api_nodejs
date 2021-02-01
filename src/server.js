const express = require('express');
const app = express();
const port = 3333;
const passport = require("passport");
const cookieParser = require('cookie-parser');

//Passport Initialize
require("./config/passport")(passport);

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());


//Loading Routes
const routeUsers = require("./routes/users");
const routeMovies = require("./routes/movies");
const routeAuth = require("./routes/auth");

//Middleware VerifyJWT
app.use("/api/", routeAuth);

app.use("/api/users/", routeUsers);
app.use("/api/movies/", routeMovies);

app.listen(port, () => {
    console.log(`WebServer listening at ${port}`);
});
