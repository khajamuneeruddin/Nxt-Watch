import React, { useState, useEffect, useContext } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import BackArrow from "../../Images/BackArrow";
import Upload from "../../Images/Upload";
import EditIcon from "../../Images/EditIcon";
import { MyContext } from "../../Context/ContextApi";
import VideoCard from "../Video Item Details Route/VideoCard";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import UploadVideoIcon from "../../Images/UploadVideoIcon";
import CloseIcon from "../../Images/CloseIcon";

import Cookies from "js-cookie";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { applyDarkTheme, setActiveRoute } = useContext(MyContext);
  const [box, setBox] = useState(false);
  const [ProfileData, setProfileData] = useState([]);
  const [EditInput, setEditInput] = useState(false);
  const [editVal, setEditVal] = useState({
    eidtBanner: "",
    eidtBio: "",
    eidtPic: "",
  });
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [VideoLink, setVideoLink] = useState({
    link: "",
    tittle: "",
    description: "",
  });

  const handleVideoLink = (e, fieldName) => {
    const value = e.target.value;
    setVideoLink((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleOnchangeEditForm = (e, val) => {
    const value = e.target.value;
    setEditVal((prev) => ({
      ...prev,
      [val]: value,
    }));
  };

  const handleEditForm = (e) => {
    e.preventDefault();
    if (!editVal.eidtBanner || !editVal.eidtBio || !editVal.eidtPic) {
      return alert("Enter All Fields");
    }
    const ApiData = async () => {
      const cookie = Cookies.get("jwt_Token");
      if (cookie) {
        const response = await axios.patch(
          "/api/profile/edit",
          {
            eidtBanner: editVal.eidtBanner,
            eidtBio: editVal.eidtBio,
            eidtPic: editVal.eidtPic,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        ApiDataFromBackend();
        setEditInput((prev) => !prev);
      }
    };
    ApiData();
  };

  const handleVideeoSubmit = (e) => {
    e.preventDefault();
    if (!VideoLink.link || !VideoLink.tittle || !VideoLink.description) {
      return alert("Enter All Fields");
    }
    const fetch = async () => {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      const cookie = Cookies.get("jwt_Token");
      if (cookie) {
        const response = await axios.post(
          "/api/video/upload",
          {
            link: VideoLink.link,
            title: VideoLink.tittle,
            description: VideoLink.description,
            uploadDate: formattedDate,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        if (response.data) {
          setVideoLink({
            link: "",
            tittle: "",
            description: "",
          });
          setBox((prev) => !prev);
          alert(response.data);
        } else {
          alert("uplaod Again");
        }
        console.log(response);
      } else {
        navigate("/login", { replace: true });
      }
    };
    fetch();
  };

  const handleUploadBox = () => {
    setBox((prev) => !prev);
  };

  const handleBackArrow = () => {
    console.log("Arrow Clicked");
    setActiveRoute("/");
    navigate("/");
  };

  const imgVal = "Banner.png";

  const handleEditBtn = (e) => {
    e.preventDefault();
    console.log("btn clicked");
    setEditInput((prev) => !prev);
  };

  const ApiDataFromBackend = async () => {
    const cookie = Cookies.get("jwt_Token");
    try {
      const response = await axios("/api/user/details", {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setProfileData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const cookie = Cookies.get("jwt_Token");

    ApiDataFromBackend();

    const fetchFun = async () => {
      try {
        if (cookie) {
          const response = await axios.get("/api/profile", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          });

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchFun();
  }, []);

  return isLoading ? (
    <div className="LoadingMid">
      <SyncLoader size={10} color="#ff0b37" />
    </div>
  ) : (
    <div
      className="ProfileContainer"
      style={{ background: applyDarkTheme ? "#000" : "#fff" }}
    >
      <div className="NavBarPos">
        <div className="postionNav">
          <NavBar />
        </div>
      </div>
      <div
        className="mid-Section"
        style={{ color: applyDarkTheme ? "#fff" : "" }}
      >
        <div className="BackArrowDiv">
          <button type="button" onClick={handleBackArrow} className="BackArrow">
            <BackArrow />
          </button>
        </div>
        <div className="bannerContainer">
          <img
            className={
              applyDarkTheme
                ? "linkedin-banner"
                : "linkedin-banner linkedin-banner-DarkTheme"
            }
            src={ProfileData.banner_img ? ProfileData.banner_img : imgVal}
            alt="BannerImg"
          />
          <button type="button" className="editBtn" onClick={handleEditBtn}>
            <EditIcon />
          </button>

          {EditInput && (
            <form
              className={`editInputBox ${applyDarkTheme ? "bgColor" : ""}`}
              onSubmit={(e) => handleEditForm(e)}
            >
              <button onClick={handleEditBtn} className="Closebtn">
                <CloseIcon />
              </button>
              <label>Edit Banner</label>
              <input
                value={editVal.eidtBanner}
                onChange={(e) => handleOnchangeEditForm(e, "eidtBanner")}
                type="text"
              />
              <label>Edit Bio</label>
              <input
                value={editVal.eidtBio}
                onChange={(e) => handleOnchangeEditForm(e, "eidtBio")}
                type="text"
              />
              <label>Edit Profile Pic</label>
              <input
                value={editVal.eidtPic}
                onChange={(e) => handleOnchangeEditForm(e, "eidtPic")}
                type="text"
              />
              <button type="submit" className="uploadBio">
                <Upload />
              </button>
            </form>
          )}
        </div>
        <div className="profliePicContainer">
          <div className="profliePicBox">
            <img
              src={
                ProfileData.profile_pic
                  ? ProfileData.profile_pic
                  : "https://i.seadn.io/gae/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A?auto=format&dpr=1&w=1000"
              }
              alt="ProfilePic"
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            />
            <div>
              <h3>
                {ProfileData.username ? ProfileData.username : `Khwaja@Ur$_18`}
              </h3>
              <p>
                {ProfileData.bio_text
                  ? ProfileData.bio_text
                  : `Exploring the wonders of nature and sharing tips for sustainable
                living on our YouTube channel.`}
              </p>
            </div>
          </div>
        </div>

        <div className="ProfileVideoDiv">
          <button className="uploadBtn" onClick={handleUploadBox}>
            <UploadVideoIcon />
          </button>
          {box ? (
            <>
              <form onSubmit={handleVideeoSubmit} className="UploadVideoBox">
                <button onClick={handleUploadBox} className="Closebtn">
                  <CloseIcon />
                </button>
                <label>Upload Video</label>
                <h5>Link</h5>
                <input
                  value={VideoLink.link}
                  type="text"
                  onChange={(e) => handleVideoLink(e, "link")}
                />
                <h5>Tittle</h5>
                <input
                  value={VideoLink.tittle}
                  type="text"
                  onChange={(e) => handleVideoLink(e, "tittle")}
                />
                <h5>Description</h5>
                <input
                  value={VideoLink.description}
                  type="text"
                  onChange={(e) => handleVideoLink(e, "description")}
                />
                <button className="uploadVideoBtn">
                  <Upload />
                </button>
              </form>
            </>
          ) : (
            ""
          )}
          <VideoCard url="https://www.youtube.com/watch?v=iAIBF2ngbWY" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
