import ChartPage from "./pages/ChartPage";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import DocsPage from "./pages/DocsPage";
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./utilities/TooltipContext";
import Navbar from "./components/singletons/NavBar";
import Footer from "./components/singletons/Footer";
import "./App.css";

function App() {
  return (
    <>
      <header className="fixed-top" style={{ width: "100vw" }}>
        <Navbar />
      </header>
      <main className="mt-5">
        <TooltipProvider>
          <Routes>
            <Route exact path="/" Component={LandingPage} />
            <Route exact path="/docs" Component={DocsPage} />
            <Route exact path="/about" Component={AboutPage} />
            <Route exact path="/chart" Component={ChartPage} />
          </Routes>
        </TooltipProvider>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
