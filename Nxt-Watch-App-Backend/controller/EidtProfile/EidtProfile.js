exports.EidthProfile = (db) => async (req, res) => {
  const { eidtBanner, eidtBio, eidtPic } = req.body;
  const { userEmail } = req;

  const query = `UPDATE UsersTable SET banner_img = ?, bio_text = ?, profile_pic = ? WHERE email = ?`;

  try {
    await db.run(query, [eidtBanner, eidtBio, eidtPic, userEmail]);
    console.log("Profile updated successfully");
    res.status(200).send("Profile updated successfully");
  } catch (error) {
    res.status(500).send("Error updating profile");
    console.log("error edit");
  }
};
