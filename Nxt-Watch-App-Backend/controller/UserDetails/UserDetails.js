exports.UserDetails = (db) => async (req, res) => {
  const { userEmail } = req;
  const userNameQuery = `SELECT * FROM UsersTable WHERE email = ?`;
  try {
    const userNameResponse = await db.get(userNameQuery, userEmail);
    
    res.status(200).send(userNameResponse);
  } catch (error) {
    console.log(error);
  }
};
