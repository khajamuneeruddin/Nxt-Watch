import React, { useState, useEffect } from "react";
import VideoCard from "../Video Item Details Route/VideoCard";
import NavBar from "../NavBar/NavBar";
import BackArrow from "../../Images/BackArrow";
import SyncLoader from "react-spinners/SyncLoader";
import axios from "axios";
import Cookies from "js-cookie";
import "./VideoPage.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const VideoPage = () => {
  const [videoState, setVideoState] = useState(null); // Initialize as null
  const [isLoading, setLoading] = useState(true);
  const navGate = useNavigate();
  const navigate = useNavigate();
  const handleBackArrowBtn = () => {
    navigate("/");
  };

  const { id } = useParams();
  console.log(id, "id");

  const apiVideoFunction = async (ids) => {
    try {
      const cookie = Cookies.get("jwt_Token");
      if (!cookie) {
        alert("JWT token not found");
        navigate("/login", { replace: true });
        return;
      }
      const idVal = ids ? ids : id;
      const url = `/api/video/${idVal}`;
      console.log(url);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });

      setVideoState(response.data);

      if (ids) {
        navigate(`/video/${ids}`);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    apiVideoFunction();
    setLoading(false);
  }, [id, navigate]);

  return (
    <>
      {isLoading ? (
        <div className="LoaderDiv">
          <SyncLoader size={10} color="#ff0b37" />
        </div>
      ) : videoState ? (
        <div className="VideoPageMainConatiner">
          <NavBar />
          <div className="midDivVideoContainer">
            <button className="BackPos" onClick={handleBackArrowBtn}>
              <BackArrow />
            </button>
            <div className="VideoPageVideoDiv">
              {videoState.video && (
                <VideoCard
                  styleMethod="str"
                  elem={videoState.video[0]}
                  light={true}
                />
              )}
            </div>
            <div className="VideoPageSuggestionDiv">
              {videoState.suggstion &&
                videoState.suggstion.map((item) => (
                  <button
                  className="btnTran"
                    key={item.VideoID}
                    onClick={() => apiVideoFunction(item.VideoID)}
                  >
                    <VideoCard elem={item} />
                  </button>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="LoaderDiv">
          <SyncLoader size={10} color="#ff0b37" />
        </div>
      )}
    </>
  );
};

export default VideoPage;
