import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeContext, themes } from "./context/ThemeContext";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || themes.light
  );
  const handleClick = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
      localStorage.setItem("theme", themes.dark);
    } else {
      setTheme(themes.light);
      localStorage.setItem("theme", themes.light);
    }
  };
  return (
    <>
      {/* <h1>App is running</h1> */}
      <ThemeContext.Provider value={{ theme, handleClick }}>
        <Routes>
          {localStorage.getItem("token") ? (
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
          ) : (
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              }
            />
          )}
          <Route
            path="/about"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
