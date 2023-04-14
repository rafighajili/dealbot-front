import Footer from "./Footer";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import Pricing from "./Pricing";
import Trial from "./Trial";
import ContactUs from "./ContactUs";
import Navbar from "./Navbar";

const LandingPageLayout = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <HowItWorks />
      <Pricing />
      <Trial />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
