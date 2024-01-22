const express = require("express");
const viewController = require("../controller/view.controller");
const router = express.Router();

router.get("/login", viewController.loginForm);
router.get("/signup", viewController.signupForm);
router.get("/token", viewController.tokenForm);
router.get("/token/refresh", viewController.refreshTokenForm);

module.exports = router;
