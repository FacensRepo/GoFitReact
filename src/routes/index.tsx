import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Gym } from "../pages/Gym";
import { Calculators } from "../pages/Calculators";
import { Nutrition } from "../pages/Nutrition";
import { About } from "../pages/About";
import { Checkin } from "../pages/Checkin";
import { Chatbot } from "../components/Chatbot";
import { LogIn } from "../pages/LogIn";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/checkin" element={<Checkin />} />
      </Routes>
      <Chatbot />
    </Router>
  );
}
