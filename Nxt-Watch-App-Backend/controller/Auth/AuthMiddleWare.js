const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.checkingUserInDataBase = (db) => async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userNameQuery = `SELECT * FROM UsersTable WHERE username = ?`;
    const userNameResponse = await db.get(userNameQuery, username);
    if (userNameResponse) {
      const encrptPassWord = await bcrypt.compare(
        password,
        userNameResponse.password
      );
      if (encrptPassWord) {
        req.passedEmail = userNameResponse.email;
        next();
      } else {
        res.status(404).send("Plz Enter Correct PassWord");
      }
    } else {
      res.status(404).send("Plz Enter Correct Email");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkEmail = (db) => async (req, res, next) => {
  const { email } = req.body;
  try {
    const emailCheckQuery = "SELECT * FROM UsersTable WHERE email = ?";
    const QuerResp = await db.get(emailCheckQuery, email);
    if (!QuerResp) {
      next();
    } else {
      res.status(404).send("Email Already Taken");
    }
  } catch (error) {
    console.log(error);
  }
};

/////////////// Generating Token ////////////////////////////

exports.generateAuthToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = jwt.sign(email, "$Khwaja@Urs_18");
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.generateAuthTokenforLogin = async (req, res, next) => {
  try {
    const email = req.passedEmail;
    const token = jwt.sign(email, "$Khwaja@Urs_18");
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};



