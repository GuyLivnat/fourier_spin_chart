import ChartPage from "./pages/ChartPage";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import DocsPage from "./pages/DocsPage";
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./contexts/TooltipContext";
import Navbar from "./components/singletons/NavBar";
import Footer from "./components/singletons/Footer";
import "./App.css";
import { CoeffProvider } from "./contexts/CoeffContext";

function App() {
  return (
    <>
      <header className="fixed-top" style={{ width: "100vw" }}>
        <Navbar />
      </header>
      <main className="mt-5">
        <TooltipProvider>
          <CoeffProvider>
            <Routes>
              <Route path="/docs" Component={DocsPage} />
              <Route path="/about" Component={AboutPage} />
              <Route path="/chart" Component={ChartPage} />
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
