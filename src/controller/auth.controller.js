const jwtUtils = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req, res) => {
  // Verify the email address is not used already.
  const verifyEmail = await userModel.findOne({ email: req.body.email });
  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Введенный Email уже занят.",
      });
    } else {
      //Hash the password before storing in the database.
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userModel({
          ...req.body,
          password: hash,
        });

        let result = user.save();
        return res.status(201).json({
          message: "Пользователь был успешно создан!",
          result,
          success: true,
        });
      });
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let loginUser;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return false;
      }
      loginUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        // User by email doesn't exist or password didn't match.
        return res.status(401).json({
          message: "Не найдено активной учетной записи с указанными данными",
        });
      } else {
        return res.status(200).json({
          email: loginUser.email,
          username: loginUser.username,
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        messgae: err.message,
        success: false,
      });
    });
});

const token = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let loginUser;

  userModel
    .findOne({
      email: email,
    })
    .then((user) => {
      if (!user) {
        return false;
      }
      loginUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Не найдено активной учетной записи с указанными данными",
        });
      } else {
        return res.status(200).json({
          access: jwtUtils.generateAccessToken(loginUser),
          refresh: jwtUtils.generateRefreshToken(loginUser),
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        messgae: err.message,
        success: false,
      });
    });
});

const tokenRefresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  jwtUtils.verifyRefreshToken(refreshToken, (error, user) => {
    if (error) {
      return res.status(401).json({
        message: "Токен недействителен или просрочен.",
      });
    } else {
      const access = jwtUtils.generateAccessToken(user);
      return res.status(200).json({
        access,
      });
    }
  });
});

module.exports = {
  signup,
  login,
  token,
  tokenRefresh,
};
