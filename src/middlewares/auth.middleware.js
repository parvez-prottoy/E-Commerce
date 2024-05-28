const { decodeToken } = require("../utility/token.util");

const authenticating = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    token = req.cookies["token"];
  }
  const decode = decodeToken(token);
  if (decode === null) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  } else {
    const email = decode["email"];
    const userID = decode["userID"];
    req.headers.email = email;
    req.headers.userID = userID;
    next();
  }
};
module.exports = authenticating;
