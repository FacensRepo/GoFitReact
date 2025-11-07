import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Gym } from "../pages/Gym";
import { Calculators } from "../pages/Calculators";
import { Nutrition } from "../pages/Nutrition";
import { About } from "../pages/About";
import { Checkin } from "../pages/Checkin";
import { Chatbot } from "../components/Chatbot";
import { LogIn } from "../pages/LogIn";
import { Toaster } from "react-hot-toast";

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

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "800px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "grey",
          },
        }}
      />

      <Chatbot />
    </Router>
  );
}
