const express = require("express");
const AuthMiddleWare = require("./controller/Auth/AuthMiddleWare.js");
const profileToken = require("./controller/Profile/ProfileMid.js");
const Profile = require("./controller/Profile/Profile.js");
const controller = require("./controller/Auth/Auth.js");
const Upload = require("./controller/Upload_Video/UploadVideo.js");
const { open } = require("sqlite");
const User = require("./controller/UserDetails/UserDetails.js");
const Eidt = require("./controller/EidtProfile/EidtProfile.js");
const path = require("path");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "Nxt_Watch_App_DB.db");
const allVideos = require("./controller/GetVideos/GetAllVideos.js");
const GetVideo = require("./controller/GetVideos/GetAllVideos.js");
const app = express();
app.use(express.json());

let db;

const initializing_Db = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    registerRoutes();
    app.listen(3000, () => {
      console.log("Sever Started");
    });
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

initializing_Db();

const registerRoutes = () => {
  app.get("/api/profile", profileToken.verifingToken, Profile.profile(db));

  app.post(
    "/api/login",
    AuthMiddleWare.checkingUserInDataBase(db),
    AuthMiddleWare.generateAuthTokenforLogin,
    controller.login
  );

  app.post(
    "/api/sign",
    AuthMiddleWare.checkEmail(db),
    AuthMiddleWare.generateAuthToken,
    controller.sign(db)
  );

  app.post(
    "/api/video/upload",
    profileToken.verifingToken,
    Upload.UploadVideo(db)
  );

  app.patch(
    "/api/profile/edit",
    profileToken.verifingToken,
    Eidt.EidthProfile(db)
  );

  app.get(
    "/api/user/details",
    profileToken.verifingToken,
    User.UserDetails(db)
  );

  app.get(
    "/api/videos/",
    profileToken.verifingToken,
    allVideos.getAllVideos(db)
  );

  app.get("/api/video/:id", profileToken.verifingToken, GetVideo.getVideo(db));

  const fun = async () => {
    try {
      const userData = await db.all("SELECT * FROM videosTable");
      console.log(userData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // fun();
};
