import { MyContext } from "../../Context/ContextApi";
import React, { useContext } from "react";
import "../Eye.css";

const GameIcon = () => {
  const { applyDarkTheme, activeRoute } = useContext(MyContext);
  return (
    <>
      <svg
        style={{
          fill:
            activeRoute === "/api/gaming"
              ? applyDarkTheme
                ? "#fff"
                : "#000"
              : applyDarkTheme
              ? "#fff"
              : "#ff0b37",

          width: "31px",
        }}
        className="SideBarIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
      >
        <path d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z" />
      </svg>
    </>
  );
};

export default GameIcon;
