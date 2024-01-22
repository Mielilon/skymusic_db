const express = require("express");
const viewController = require("../controller/view.controller");
const router = express.Router();

router.get('/', viewController.getOverView);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.createAccount);
router.get('/token', viewController.getTokenForm);
router.get('/token/refresh', viewController.refreshToken);

module.exports=router;