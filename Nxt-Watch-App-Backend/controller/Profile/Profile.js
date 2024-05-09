exports.profile = (db) => async (req, res) => {
  const { userEmail } = req;
  console.log(userEmail);

  const dataQuery = `select user_id, username, email, profile_pic, bio_text, banner_img from UsersTable WHERE email = ? `;
  const data = await db.all(dataQuery, userEmail);

  res.status(200).send(data);
};
