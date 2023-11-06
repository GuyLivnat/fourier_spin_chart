import ChartPage from "./pages/ChartPage";
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "./utilities/TooltipContext";
import Navbar from "./components/singletons/NavBar";

function App() {
  return (
    <TooltipProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={LandingPage} />
        <Route exact path="/about" Component={AboutPage} />
        <Route exact path="/chart" Component={ChartPage} />
      </Routes>
    </TooltipProvider>
  );
}

export default App;
