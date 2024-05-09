import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { MyContext } from "../../Context/ContextApi";
import HomeIcon from "../../Images/SiderBar_Icons/HomeIcon";
import GameIcon from "../../Images/SiderBar_Icons/GameIcon";
import TrendingIcon from "../../Images/SiderBar_Icons/TrendingIcon";
import SavedVideosIcon from "../../Images/SiderBar_Icons/SavedVideosIcon";
import InstaIcon from "../../Images/Social_Media/InstaIcon";
import Linkedin from "../../Images/Social_Media/Linkedin";
import Twitter from "../../Images/Social_Media/Twitter";

const sideElements = [
  {
    id: "HomeIcon",
    textToDisplay: "Home",
    path: "/",
    element: <HomeIcon />,
  },
  {
    id: "TrendingIcon",
    textToDisplay: "Trending",
    path: "/api/trending",
    element: <TrendingIcon />,
  },
  {
    id: "GameIcon",
    textToDisplay: "Gaming",
    path: "/api/gaming",
    element: <GameIcon />,
  },
  {
    id: "favorites",
    textToDisplay: "Favorites",
    path: "/api/favorites",
    element: <SavedVideosIcon />,
  },
];
const SideBar = () => {
  const { applyDarkTheme, activeRoute, setActiveRoute, height } =
    useContext(MyContext);

  const handleIconColor = (path) => {
    setActiveRoute(path);
  };

  return (
    <div
      className="SideBar"
      style={{
        backgroundColor: applyDarkTheme ? "#181818" : "#ebebeb",
        height: { height },
      }}
    >
      <div className="SideBarPos">
        <div className="nonSences">
          <div className="sideBarContainingElementsContainer">
            {sideElements.map((elem) => (
              <NavLink
                to={elem.path}
                key={elem.id}
                onClick={() => handleIconColor(elem.path)}
              >
                <button key={elem.id} className="SideBarElements">
                  {elem.element}
                  <div className="Block">
                    <p style={{ color: applyDarkTheme ? "#fff" : "#000" }}>
                      {elem.textToDisplay}
                    </p>
                  </div>
                </button>
              </NavLink>
            ))}
          </div>
          <div>
            {/* <h1
              style={{ color: applyDarkTheme ? "#fff" : "#000" }}
              className="connectWithMe"
            >
              
            </h1> */}
            <div className="SideBar_BottomDiv">
              <button>
                <a
                  href="https://www.instagram.com/urs_khwaja_60/"
                  target="_blank"
                >
                  <InstaIcon />
                </a>
              </button>
              <button>
                <a
                  href="https://www.linkedin.com/in/shaik-khwajamuneeruddin"
                  target="_blank"
                >
                  <Linkedin />
                </a>
              </button>
              <button>
                <a
                  href="https://www.linkedin.com/in/shaik-khwajamuneeruddin"
                  target="_blank"
                >
                  <Twitter />
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
