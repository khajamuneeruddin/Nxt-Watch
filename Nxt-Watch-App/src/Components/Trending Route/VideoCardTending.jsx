import React, { useContext, useEffect, useState } from "react";
import "./VideoCardTrending.css";
import ReactPlayer from "react-player";
import { MyContext } from "../../Context/ContextApi";

const VideoCard = (props) => {
  const { applyDarkTheme } = useContext(MyContext);
  const [playerWidth, setPlayerWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setPlayerWidth("50%");
      } else {
        setPlayerWidth("96%");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="videoCardBigContainer">
      <ReactPlayer
        style={{ borderRadius: "15px" }}
        className="Animation"
        width={playerWidth}
        controls={true}
        height="250px"
        url={props.urlLink}
      />
      <div>
        <p>Video Content</p>
      </div>
    </div>
  );
};

export default VideoCard;
