import React, {  useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";
import EyeSolid from "../../Images/EyeSolid";
import EyeSlashSolid from "../../Images/EyeSlashSolid";
import { useNavigate, Navigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const token = Cookies.get("jwt_Token");
  if (token !== undefined) {
    return <Navigate to="/" />;
  }
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [LoginVal, setLogin] = useState(false);
  const navigate = useNavigate();

  const [errorMsg, setError] = useState({
    errorState: false,
    errormsg: "Enter All Fileds...!",
  });

  const handleSignUpOrLoginForm = () => {
    setLogin((prev) => !prev);
    setCheckBox(false);
    setUserPassword("");
    setUserName("");
    setUserEmail("");
    setError({
      errorState: false,
      errormsg: "Enter All Fileds...!",
    });
  };

  const postingDataFun = async (userData) => {
    const endpoint = userData.email ? "/api/sign" : "/api/login";
    try {
      const response = await axios.post(endpoint, userData);
      console.log(response.data.jwtToken);
      Cookies.set("jwt_Token", response.data.jwtToken, {
        expires: 7,
      });
      setIsLoading((prev) => !prev);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.response.data);
      setError({
        errorState: true,
        errormsg: error.response.data,
      });
      setIsLoading((prev) => !prev);
    }
  };

  const handleFormTagInputChange = (e, inputChangingParameter) => {
    if (inputChangingParameter === "username") {
      setUserName(e.target.value);
    } else if (inputChangingParameter === "userEmail") {
      setUserEmail(e.target.value);
    } else {
      setUserPassword(e.target.value);
    }
  };

  const handleFormTagCheckBox = () => {
    setCheckBox((prev) => !prev);
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!userName || !userPassword) {
      setError(true);
      return;
    }
    if (LoginVal && !userEmail) {
      setError(true);
      return;
    }

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const sendingData = LoginVal
      ? {
          username: userName,
          email: userEmail,
          password: userPassword,
          joinDate: formattedDate,
        }
      : { username: userName, password: userPassword };
    setIsLoading((prev) => !prev);
    console.log(sendingData);
    postingDataFun(sendingData);
  };

  return isLoading ? (
    <div className="LoaderDiv">
      <SyncLoader size={10} color="#ff0b37" />
    </div>
  ) : (
    <div className="authPage">
      <div className={`authBox ${LoginVal ? "authBox-H60" : "authBox-H55"}`}>
        <img
          className="Nxt_watch_logo"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="Nxt Watch Logo"
        />
        <form
          className="formTag"
          onSubmit={(e) => {
            handleSubmitForm(e);
          }}
        >
          <label htmlFor="userName">USERNAME</label>
          <input
            className="formTag_input"
            id="userName"
            type="text"
            onChange={(e) => {
              handleFormTagInputChange(e, "username");
            }}
            value={userName}
          />

          <>
            {LoginVal && (
              <>
                <label htmlFor="userName">Email</label>
                <input
                  className="formTag_input"
                  id="userName"
                  type="email"
                  onChange={(e) => {
                    handleFormTagInputChange(e, "userEmail");
                  }}
                  value={userEmail}
                />
              </>
            )}
          </>

          <label htmlFor="userpassword">PASSWORD</label>
          <div className="formTag_input_withEye">
            <input
              id="userpassword"
              type={checkBox ? "text" : "password"}
              onChange={(e) => {
                handleFormTagInputChange(e, "password");
              }}
              value={userPassword}
            />
            {checkBox ? <EyeSolid /> : <EyeSlashSolid />}
            <input
              id="checkBox"
              type="checkbox"
              value={checkBox}
              onClick={() => handleFormTagCheckBox()}
            />
          </div>

          <button type="submit" className="formTag_Btn">
            {LoginVal ? "Sign Up" : "Login"}
          </button>
        </form>
        {errorMsg.errorState ? (
          <p style={{ margin: "10px" }} className="ErrorMsg">
            {errorMsg.errormsg}
          </p>
        ) : null}
        <button
          className="wannaSignUpBtn"
          onClick={() => handleSignUpOrLoginForm()}
        >
          <p>{LoginVal ? "Go To Login" : "Wanna Sign Up...?"}</p>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
