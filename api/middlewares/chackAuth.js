const jwt = require("jsonwebtoken");

const chackAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
  
    jwt.verify(token, process.env.token);
    next();

} catch {
    res.status(401).json({
      message: "auth failed",
    });
  }
};

module.exports = chackAuth;
