const jwt = require("jsonwebtoken");
const key = require("../../config/config").token.key;

const encodeToken = (email, userID) => {
  const payload = {
    email,
    userID,
  };
  return jwt.sign(payload, key, { expiresIn: "24h" });
};
const decodeToken = (token) => {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    return null;
  }
};

module.exports = { encodeToken, decodeToken };
