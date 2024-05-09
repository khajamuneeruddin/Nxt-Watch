import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { MyContext } from "../../Context/ContextApi";
import Moon from "../../Images/Moon";
import SearchIcon from "../../Images/SearchIcon";
import Sun from "../../Images/Sun";
import UserLogo from "../../Images/UserLogo";
import CloseIcon from "../../Images/CloseIcon";
import Menu from "../../Images/menu";

import { Link, useNavigate } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const { applyDarkTheme, setActiveRoute, handleTheme, setApplyDarkTheme } =
    useContext(MyContext);
  const [display, setDisplay] = useState(false);
  const [menuState, setMenuState] = useState(true);
  const navigate = useNavigate();

  const toggleMenuAndNavigate = (path) => {
    setMenuState((prev) => !prev);
    setTimeout(() => {
      navigate(path);
    }, 0);
  };

  const handleProfile = () => {
    toggleMenuAndNavigate("/profile");
  };

  const hangleLogout = () => {
    Cookies.remove("jwt_Token");
    setApplyDarkTheme(false);
    toggleMenuAndNavigate("/login", { replace: true });
  };

  const handleLoggin = () => {
    setActiveRoute("/");
  };

  const handleMenu = () => {
    setMenuState((prev) => !prev);
  };

  const handleinput = () => {
    setDisplay((prev) => !prev);
  };
  return (
    <div
      className={`NavBar ${
        applyDarkTheme ? "BackGroungBlack" : "BackGroungAnyColor"
      }`}
    >
      <div className="NavBar_Comp">
        <Link to="/">
          <button
            style={{ backgroundColor: "transparent", borderWidth: "0px" }}
            onClick={handleLoggin}
          >
            <img
              className="Nav_NxtWatch_Logo"
              src={
                applyDarkTheme
                  ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              }
              alt="logo"
            />
          </button>
        </Link>
        <div className="mainInputDiv">
          {
            <div className="divPostion">
              <div className="hideBtn hideBtn1">
                <input
                  className={display ? "expandInput1" : "expandInput"}
                  type="text"
                />
                <button onClick={handleinput}>
                  <SearchIcon />
                </button>
              </div>
            </div>
          }
        </div>
        <div>
          <div className="itemBlock">
            <button className="menubtn" onClick={handleMenu}>
              {menuState ? <Menu /> : <CloseIcon />}
            </button>
          </div>
          <div className={menuState ? "posDiv" : "posDis"}>
            <div className="NavBar_Comp_rightBox">
              <button className="DarkLogoBtn" onClick={handleTheme}>
                {applyDarkTheme ? <Sun /> : <Moon />}
              </button>
              <button className="NavProfileLogoBtn" onClick={handleProfile}>
                <UserLogo />
              </button>
              <button className="Nav_Logout_Btn" onClick={hangleLogout}>
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
