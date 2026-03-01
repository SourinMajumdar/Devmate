import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import LandingNav from "../components/LandingNav";
import LandingSections from "../components/LandingSections";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: "var(--color-bg)", width: "100%" }}>
      <LandingNav />
      <Hero
        onGetStarted={() => navigate("/dashboard")}
        onLearnMore={() => navigate("/about")}
      />
      <LandingSections onGetStarted={() => navigate("/dashboard")} />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default HeroPage;
