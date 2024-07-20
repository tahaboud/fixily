import HeroSection from "../components/landingPage/sections/HeroSection";
import Navbar from "../components/landingPage/sections/Navbar";

import Categories from "../components/landingPage/sections/Categories";
import EmploymentSection from "../components/landingPage/sections/EmploymentSection";
import Footer from "../components/landingPage/sections/Footer";
import HowSection from "../components/landingPage/sections/HowSection";
import QaSection from "../components/landingPage/sections/QaSection";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Categories />
      <HowSection />
      <EmploymentSection />
      <QaSection />
      {/* <ArticleSection /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
