const jwtUtils = require('../utils/jwt');
//Importing the bcrypt package
const bcrypt = require('bcryptjs')
//Imprtong the user model 
const userModel = require('../models/user.model')
//Importing the express-async-handler package
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
    //Verifying the email address inputed is not used already 
    const verifyEmail = await userModel.findOne({ email: req.body.email })
    try {
        if (verifyEmail) {
            return res.status(403).json({
                message: "Email already used"
            });
        } else {
            //using bcrypt to hash the password sent from the user
            bcrypt.hash(req.body.password, 10)
                .then((hash) => {
                    console.log(hash, {
                        ...req.body,
                        password: hash,
                    });
                    //Registering the user
                    const user = new userModel({
                        ...req.body,
                        password: hash,
                    });

                    console.log(user);

                    //saving the data to the mongodb user collection
                    let userRes = user.save();
                    console.log("lol", userRes);
                    return res.status(201).json({
                                message: 'user successfully created!',
                                result: userRes,
                                success: true
                            });
                });
        }
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        });
    }
});

const login = asyncHandler(async (req, res) => {
    //Destructing the inputs from req.body
    const { email, password } = req.body

    //created a variable to assign the user
    let getUser

    //verifying that the user with the email exist or not
    userModel.findOne({
        email: email
    }).then((user) => {
        if (!user) {
            //if user does not exist responding Authentication Failed
            return false;
        }
        //assigned the user to getUser variable
        getUser = user;
        /*
    Then compare the password from the req.body and the hased password on the database 
    using the bcrypt.compare built in function
    */
        return bcrypt.compare(password, user.password)
    })
        .then((response) => {
            if (!response) {
                return res.status(401).json({
                    message: "Authentication Failed"
                })
            } else {
                return res.status(200).json({
                    email: getUser.email,
                    username: getUser.username,
                });
            }
        })
        .catch((err) => {
            return res.status(401).json({
                messgae: err.message,
                success: false
            })
        })
})

const token = asyncHandler(async (req, res) => {
      //Destructing the inputs from req.body
      const { email, password } = req.body

      //created a variable to assign the user
      let getUser
  
      //verifying that the user with the email exist or not
      userModel.findOne({
          email: email
      }).then((user) => {
          if (!user) {
              //if user does not exist responding Authentication Failed
              return false;
          }
          //assigned the user to getUser variable
          getUser = user
          /*
      Then compare the password from the req.body and the hased password on the database 
      using the bcrypt.compare built in function
      */
          return bcrypt.compare(password, user.password)
      })
          .then((response) => {
              if (!response) {
                  return res.status(401).json({
                      message: "Authentication Failed"
                  })
              } else {
                  return res.status(200).json({
                      access: jwtUtils.generateAccessToken(getUser),
                      refresh: jwtUtils.generateRefreshToken(getUser),
                  });
              }
          })
          .catch((err) => {
              return res.status(401).json({
                  messgae: err.message,
                  success: false
              })
          })
});

const tokenRefresh = asyncHandler(async (req, res) => {
    //Destructing the inputs from req.body
    const { refresh } = req.body

    jwtUtils.verifyRefreshToken(refresh, (error, user) => {
        if (error) {
            return res.status(401).json({
                message: "Token is invalid."
            })
        } else {
            const access = jwtUtils.generateAccessToken(user);
            return res.status(200).json({
                access
            });
        }
    });
});

module.exports = {
    register,
    login,
    token,
    tokenRefresh,
}