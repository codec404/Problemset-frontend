import React, { useEffect, useState } from "react";
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
import Profile from "./pages/Profile";
import AdminHome from "./pages/AdminHome";
import UserContest from "./pages/UserContest";
import { UserContext } from "./context/UserContext";
import { ProblemContext } from "./context/ProblemContext";
import axios from "axios";
import AdminProblems from "./pages/AdminProblems";
import AddNewProblem from "./pages/AddNewProblem";
import ProblemPage from "./pages/ProblemPage";
import EditProblem from "./pages/EditProblem";

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

  const [currentUser, setCurrentUser] = useState({});
  const fetchUser = async () => {
    try {
      if (localStorage.getItem("token") === "demo") {
        const res = await axios.get("http://localhost:8080/login/success", {
          withCredentials: true,
        });
        if (res?.data?.success) {
          localStorage.setItem("token", res?.data?.token + "demo");
          setCurrentUser(res?.data?.user);
          // setClientId(res?.data?.user._id);
        }
      } else {
        const res = await axios.get("/api/v1/auth/current-user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (res?.data?.success) {
          setCurrentUser(res?.data?.user);
          // setClientId(res?.data?.user._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [problems, setProblems] = useState([]);
  const fetchProblems = async () => {
    try {
      const res = await axios.get("/api/v1/admin/problems");
      if (res?.data?.success) {
        setProblems(res?.data?.problems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProblems();
  }, []);

  return (
    <>
      {/* <h1>App is running</h1> */}
      <ThemeContext.Provider value={{ theme, handleClick }}>
        <UserContext.Provider value={{ currentUser, fetchUser }}>
          <ProblemContext.Provider value={{ problems }}>
            <Routes>
              {localStorage.getItem("token") ? (
                localStorage.getItem("role") ? (
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <AdminHome />
                      </ProtectedRoute>
                    }
                  />
                ) : (
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Homepage />
                      </ProtectedRoute>
                    }
                  />
                )
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
                path="/reset-password/:id/:token"
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
              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              {localStorage.getItem("role") && (
                <Route
                  path="/admin/profile/:id"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              )}
              <Route
                path="/contests"
                element={
                  <ProtectedRoute>
                    <UserContest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problems"
                element={
                  <ProtectedRoute>
                    <AdminProblems />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/problem/:id"
                element={
                  <ProtectedRoute>
                    <ProblemPage />
                  </ProtectedRoute>
                }
              />
              {localStorage.getItem("role") && (
                <Route
                  path="/add-new-problem"
                  element={
                    <ProtectedRoute>
                      <AddNewProblem />
                    </ProtectedRoute>
                  }
                />
              )}
              {localStorage.getItem("role") && (
                <Route
                  path="/edit/problem/:id"
                  element={
                    <ProtectedRoute>
                      <EditProblem />
                    </ProtectedRoute>
                  }
                />
              )}
            </Routes>
          </ProblemContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
