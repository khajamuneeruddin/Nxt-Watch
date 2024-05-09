import React, { useContext } from "react";
import { MyContext } from "../../Context/ContextApi";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import VideoCard from "../Video Item Details Route/VideoCard";
import "./Gaming.css";

const Gaming = () => {
  const { applyDarkTheme } = useContext(MyContext);
  return (
    <>
      <NavBar />

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
              Gaming
            </h1>
            <div className="AllVideoContainer">
              <VideoCard urlLink="https://youtu.be/hHuG7FIKgtc?si=w1uacdTNS7BWzhCD" />
              <VideoCard urlLink="https://youtu.be/lDXHs4u24Nw?si=PSCjxZwNsoWX_FRk" />
              <VideoCard urlLink="https://youtu.be/YqFWG47ufzw?si=SsLS_9NXR5QE2FT7" />
              <VideoCard urlLink="https://youtu.be/_mR6bY-ndso?si=eSOIPdAK2M73IEWz" />
              <VideoCard urlLink="https://youtu.be/sFMRqxCexDk?si=-TBQu-vM-hfTSVt6" />
              <VideoCard urlLink="https://youtu.be/lDXHs4u24Nw?si=GV55KDnziZvQasVB" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gaming;
