require("dotenv").config({ path: __dirname + "/./../../.env" });
const jwt = require("jsonwebtoken");

const generateAccessToken = (email) => {
  return (token =
    "Bearer " +
    jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    }));

  // 86400
};

const authenticateToken = (req, res, next) => {
  if (!req.headers["x-access-token"]) {
    return res.status(403).send({
      auth: false,
      message: "Error",
      errors: "No token provided",
    });
  }
  let tokenHeader = req.headers["x-access-token"];
  if (tokenHeader.split(" ")[0] !== "Bearer") {
    return res.status(500).send({
      auth: false,
      message: "Error",
      errors: "Incorrect token format",
    });
  }
  let token = tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "Error",
      errors: "No token provided",
    });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Error",
        errors: err,
      });
    }
    req.email = decoded.id;
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
