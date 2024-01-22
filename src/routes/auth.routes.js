const express = require("express");
const router = express.Router();
const authValidation = require("../middleware/authvalidation.middleware");
const authController = require("../controller/auth.controller");

// Sign up route with validation
router.post("/signup", authValidation.regsiterValidation, authController.signup);
// Login route with credentials validation
router.post("/login", authValidation.loginValidation, authController.login);
// Tokens retrieve route.
router.post("/token", authController.token);
// Token refresh route.
router.post("/token/refresh", authController.tokenRefresh);

module.exports = router;
