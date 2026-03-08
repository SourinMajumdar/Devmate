import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import LandingSections from "../components/LandingSections";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useAuth } from "../contexts/AuthContext";

const HeroPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If already logged in, "Get Started" goes to dashboard; otherwise to login
  const handleGetStarted = () => navigate(user ? "/dashboard" : "/login");

  return (
    <div style={{ background: "var(--color-bg)", width: "100%" }}>
      <Navbar />
      <Hero
        onGetStarted={handleGetStarted}
        onLearnMore={() => navigate("/about")}
      />
      <LandingSections onGetStarted={handleGetStarted} />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default HeroPage;
