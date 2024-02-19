const express = require("express");
const router = express.Router();
const {signup , login ,logout} = require("../controller/userController");

//usersignup route

router.post("/signup", signup);

// login

router.post("/login", login);

// logout 

router.post("/logout", logout);

module.exports = router