import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  // Simple local-state driven theme, remembered in localStorage.
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <AppRoutes theme={theme} setTheme={setTheme} />;
}

export default App;
