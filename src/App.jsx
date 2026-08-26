import { useEffect, useState } from "react";
import "./App.css";
import PortfolioPage from "./PortfolioPage";
import ProjectArchive from "./components/ProjectArchive";
import KycCaseStudy from "./components/KycCaseStudy";

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
    return <ProjectArchive onBack={() => navigateTo("/")} onNavigate={navigateTo} />;
  }

  if (currentPath === "/kyc-case-study") {
    return <KycCaseStudy onBack={() => navigateTo("/")} />;
  }

  return <PortfolioPage onViewArchive={() => navigateTo("/archive")} onNavigate={navigateTo} />;
}

export default App;
