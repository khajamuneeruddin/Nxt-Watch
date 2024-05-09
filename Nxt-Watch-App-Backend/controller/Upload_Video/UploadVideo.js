const jwt = require("jsonwebtoken");

exports.verifingTokenUpload = async (req, res, next) => {
  console.log("enter into Token");
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Empty Jwt Token");
    const jwtToken = token.split(" ")[1];
    jwt.verify(jwtToken, "$Khwaja@Urs_18", async (error, payload) => {
      if (error) return res.status(400).send("Invalid Jwt Token muneer");
      req.userEmail = payload;
      next();
    });
  } catch (error) {
    res.status(401).send("Invalid Jwt Token");
  }
};

exports.UploadVideo = (db) => async (req, res) => {
  const { userEmail } = req;
  const { link, title, description, uploadDate } = req.body;
  console.log(userEmail, "muneer");

  const dataQuery = `select user_id from UsersTable WHERE email = ? `;
  const data = await db.get(dataQuery, userEmail);
  console.log(data.user_id);
  console.log(data);
  if (!data) {
    res.status(400).send("Invaild User");
  }
  const insertQuery = `INSERT INTO videosTable (UserID, Title, Description, uploadDate, Link) VALUES (?, ?, ?, ?, ?)`;

  const insertValues = [data.user_id, title, description, uploadDate, link];

  try {
    await db.run(insertQuery, insertValues);
    console.log("Video uploaded successfully");
    return res.status(200).send("Video uploaded successfully");
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).send("Internal Server Error");
  }
};
