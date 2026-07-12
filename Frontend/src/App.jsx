import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes.jsx";
import Vehicle from "./pages/Vehicle";

function App() {
  const [theme, setTheme] = useState("light");

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
