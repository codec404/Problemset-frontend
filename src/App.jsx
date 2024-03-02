import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import { ThemeContext, themes } from "./context/ThemeContext";

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
            <Route path="/" element={<Homepage />} />
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/about" element={<Landing />} />
          <Route path="/contact" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
