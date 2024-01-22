
const jwt = require("jsonwebtoken");
const serializers = require('./serializer');

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(serializers.userSerializer(user), process.env.JWT_SECRET, {
            expiresIn: "30m",
        });
    },
    generateRefreshToken: (user) => {
        return jwt.sign(serializers.userSerializer(user), process.env.JWT_REFRESH_SECRET);
    },
    verifyAccessToken: (token, callback) => {
        return jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    return callback({ message: "Invalid token" }, null);
                }
                return callback(null, decoded);
            }
        );
    },
    verifyRefreshToken: (token, callback) => {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET,
            (err, decoded) => {
                if (err) {
                    return callback({ message: "Invalid token" }, null);
                }
                return callback(null, decoded);
            }
        );
    },
};