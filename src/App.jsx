import SandboxPage from "./pages/SandboxPage";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import TutorialPage from "./pages/TutorialPage";
import HelpPage from "./pages/HelpPage";
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./contexts/TooltipContext";
import Navbar from "./components/singletons/NavBar";
import Footer from "./components/singletons/Footer";
import "./App.css";
import { CoeffProvider } from "./contexts/CoeffContext";

function App() {
  return (
    <>
      <header className="fixed-top">
        <Navbar />
      </header>
      <main className="mt-5 " data-bs-theme="dark">
        <TooltipProvider>
          <CoeffProvider>
            <Routes>
              <Route path="/help" Component={HelpPage} />
              <Route path="/about" Component={AboutPage} />
              <Route path="/sandbox" Component={SandboxPage} />
              <Route path="/tutorial" Component={TutorialPage} />
              <Route path="/" Component={LandingPage} />
            </Routes>
          </CoeffProvider>
        </TooltipProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
