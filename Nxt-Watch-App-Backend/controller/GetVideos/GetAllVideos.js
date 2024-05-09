exports.getAllVideos = (db) => async (req, res) => {
  try {
    const { limit, page } = req.query;

    const userQuery1 = "SELECT COUNT(*) as totalRows FROM videosTable";
    const totalRows = await db.all(userQuery1);
    const offset = (page - 1) * limit;

    const userQuery = "SELECT * FROM videosTable LIMIT ? OFFSET ?";

    const allVideos = await db.all(userQuery, [limit, offset]);

    if (!allVideos) {
      res.status(400).send("Invaild Query");
    }

    res
      .status(200)
      .send({ videos: allVideos, totalRows: totalRows[0].totalRows });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error", error);
  }
};

exports.getVideo = (db) => async (req, res) => {
  try {
    const videoId = req.params.id;
    const { userEmail } = req;

    const userIdQuery = `SELECT user_id FROM UsersTable WHERE email = ?`;
    const userIdResponse = await db.get(userIdQuery, userEmail);

    if (!userIdResponse) {
      res.status(400).send("Invaild User");
    }

    const userQuery = "SELECT * FROM videosTable WHERE VideoID = ?";
    const video = await db.all(userQuery, [videoId]);

    if (!video) {
      return res.status(404).send("Video not found");
    }

    const userQuery1 = "SELECT COUNT(*) as totalRows FROM videosTable";
    const totalRows = await db.all(userQuery1);
    const randomOffset = Math.floor(Math.random() * totalRows[0].totalRows);

    const offset = Math.max(0, randomOffset - 3);

    const suggstionQuery = "SELECT * FROM videosTable LIMIT ? OFFSET ?";
    const suggstion = await db.all(suggstionQuery, [3, offset]);

    res.status(200).send({ video: video, suggstion: suggstion });
  } catch (error) {
    console.log(error);
  }
};
