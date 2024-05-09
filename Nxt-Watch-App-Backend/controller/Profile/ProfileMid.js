const jwt = require("jsonwebtoken");

exports.verifingToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Empty Jwt Token");
    const jwtToken = token.split(" ")[1];
    jwt.verify(jwtToken, "$Khwaja@Urs_18", async (error, payload) => {
      if (error) return res.status(400).send("Invalid Jwt Token");
      req.userEmail = payload;

      next();
    });
  } catch (error) {
    res.status(401).send("Invalid Jwt Token");
  }
};
