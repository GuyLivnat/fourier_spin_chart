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
              <Route
                exact
                path="/starchart_fourier_react_d3/"
                Component={LandingPage}
              />
              <Route
                exact
                path="/starchart_fourier_react_d3/docs"
                Component={DocsPage}
              />
              <Route
                exact
                path="/starchart_fourier_react_d3/about"
                Component={AboutPage}
              />
              <Route
                exact
                path="/starchart_fourier_react_d3/chart"
                Component={ChartPage}
              />
            </Routes>
          </CoeffProvider>
        </TooltipProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
