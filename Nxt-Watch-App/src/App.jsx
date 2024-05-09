import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyContext } from "./Context/ContextApi";
import Favorites from "./Components/Not Found Route/Favorites";
import "./App.css";
import ProfilePage from "./Components/Profile/ProfilePage";
import Home from "./Components/Home Route/Home";
import AuthPage from "./Components/Login Route/AuthPage";
import Treanding from "./Components/Trending Route/Treanding";
import Gaming from "./Components/Gaming Route/Gaming";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import VideoPage from "./Components/VideoPage/VideoPage";

const App = () => {
  const [applyDarkTheme, setApplyDarkTheme] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleTheme = () => {
    setApplyDarkTheme((prev) => !prev);
  };

  return (
    <MyContext.Provider
      value={{
        applyDarkTheme: applyDarkTheme,
        handleTheme: handleTheme,
        activeRoute: activeRoute,
        setActiveRoute: setActiveRoute,
        isLoggedIn: isLoggedIn,
        setApplyDarkTheme: setApplyDarkTheme,
      }}
    >
      <div
        id="MainDarkThemeContainer"
        className={applyDarkTheme ? "DarkTheme" : ""}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/api/trending"
              element={
                <ProtectedRoute>
                  <Treanding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/gaming"
              element={
                <ProtectedRoute>
                  <Gaming />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="video/:id"
              element={
                <ProtectedRoute>
                  <VideoPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </MyContext.Provider>
  );
};

export default App;
