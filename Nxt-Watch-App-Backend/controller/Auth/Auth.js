const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { token } = req;
  console.log({ jwtToken: token });
  res.status(200).send({ jwtToken: token });
};

exports.sign = (db) => async (req, res) => {
  const { username, email, password, joinDate } = req.body;
  
  const { token } = req;
  const encrptedPassWord = await bcrypt.hash(password, 10);
  const insertingQuery = `INSERT INTO UsersTable (username, email, password, date_joined) VALUES (?, ?, ?, ?)`;
  await db.run(insertingQuery, [username, email, encrptedPassWord, joinDate]);
  res.status(200).send({ jwtToken: token });
};
