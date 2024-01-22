const express = require("express");
const router = express.Router();

// Imporing the authvalidation functions for login and register 
const {  regsiterValidation, loginValidation} = require("../middleware/authvalidation.middleware")
// Importing functions from auth controller
const { login, register, token, tokenRefresh} = require("../controller/auth.controller")

// Register route with register validation 
router.post("/signup", regsiterValidation, register);
// Login route with register validation
router.post("/login", loginValidation, login);
// Register route with register validation 
router.post("/token", token);
// Login route with register validation
router.post("/token/refresh", tokenRefresh);

module.exports = router;