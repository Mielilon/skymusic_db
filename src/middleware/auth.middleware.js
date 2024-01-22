const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = Number(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Учетные данные не были предоставлены или токен не действителен.",
    });
  }
};
