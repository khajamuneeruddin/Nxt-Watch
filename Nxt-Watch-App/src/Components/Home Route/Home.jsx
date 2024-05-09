import React, { useContext } from "react";
import { MyContext } from "../../Context/ContextApi";
import VideoCard from "../Video Item Details Route/VideoCard";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SearchQureyApi from "../SearchQureyApi/SearchQureyApi";

const Home = () => {
  const { applyDarkTheme } = useContext(MyContext);
  const navigate = useNavigate();

  const handleVideoPlayById = (id) => {
    navigate(`video/${id}`);
  };

  return (
    <>
      <div className="NavBarInHome">
        <NavBar />
      </div>

      <div className="mainContainer">
        <SideBar />

        <div
          className="HomeMainContainer"
          style={{ backgroundColor: applyDarkTheme ? "#000" : "#fff" }}
        >
          <div className="VideoPlayerContainer">
            <h1
              style={{ color: applyDarkTheme ? "#fff" : "#000" }}
              className="VideoPlayerContainer-Heading"
            >
              Home
            </h1>

            <div className="AllVideoContainer1231">
              <SearchQureyApi
                handleVideoPlayById={handleVideoPlayById}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;


