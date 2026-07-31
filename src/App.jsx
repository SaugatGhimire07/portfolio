import { useEffect, useState } from "react";
import "./App.css";
import PortfolioPage from "./PortfolioPage";
import ProjectArchive from "./components/ProjectArchive";

function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    }
  };

  if (currentPath === "/archive") {
    return <ProjectArchive onBack={() => navigateTo("/")} />;
  }

  return <PortfolioPage onViewArchive={() => navigateTo("/archive")} />;
}

export default App;
