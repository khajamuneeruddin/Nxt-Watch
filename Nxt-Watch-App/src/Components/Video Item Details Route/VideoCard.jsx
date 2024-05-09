import React from "react";
import "./VideoCard.css";
import ReactPlayer from "react-player";

const VideoCard = (props) => {
  const { elem, light, styleMethod } = props;

  const videoDisplayStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  return (
    <div
      className="videoCardItem"
      // style={styleMethod ? videoDisplayStyle : { borderRadius: "15px" }}
    >
      <ReactPlayer
        style={{ borderRadius: "15px" }}
        className="Animation"
        width="100%"
        light={light ? false : true}
        playing={true}
        controls={true}
        height="250px"
        url={elem.Link}
      />
      <div className="DivPara">
        <p>{elem.Title}</p>
      </div>
    </div>
  );
};

export default VideoCard;
