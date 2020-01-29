const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(morgan("common"));
server.use(express.json());
server.use(cors())

const { checkLoginStatus } = require("../middleware/restricted");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");

const Users = require("./model");

server.get("/api/users", checkLoginStatus, (request, response, next) => {
    //yuk
    Users.find()
        .then((allUsers) => {
            response.status(200).json({ ...allUsers });
        })
        .catch((error) => {
            console.log("\n\n!!!\n\n!***~~~INTERNAL SERVER ERROR~~~***!\n\n!!!\n\n\n", error);
            response.status(500).json({ message: "RUH ROH! Server's BROKE, man... HARASS THE DEVS!" })
        })
})

server.post("/api/register", (request, response, next) => {
    //uee
    let user = request.body;
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash;

    Users.add(user)
        .then((newUser) => {
            response.status(200).json({ ...newUser });
        })
        .catch((error) => {
            console.log("\n\n!!!\n\n!***~~~INTERNAL SERVER ERROR~~~***!\n\n!!!\n\n\n", error);
            response.status(500).json({ message: "RUH ROH! Server's BROKE, man... HARASS THE DEVS!" })
        })
})

server.post("/api/login", (request, response, next) => {
    //ARHLAKJHR
    let { username, password } = request.body;

    Users.findBy({ username })
        .first()
        .then((foundUser) => {
            if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
                const token = signToken(foundUser);

                response.status(200).json({ token });
            }
            else {
                response.status(401).json({ message: "Invalid Credentials." })
            }
        })
        .catch((error) => {
            console.log("\n\n!!!\n\n!***~~~INTERNAL SERVER ERROR~~~***!\n\n!!!\n\n\n", error);
            response.status(500).json({ message: "RUH ROH! Server's BROKE, man... HARASS THE DEVS!" })
        })
})

function signToken(user) {
    const payload = {
        user,
    }

    const secret = jwtSecret;

    const options = {
        expiresIn: "1d",
    }
    return jwt.sign(payload, secret, options);
}

module.exports = server;