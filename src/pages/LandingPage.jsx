import Header from '../Components/layout/Header';
import HeroSection from '../Components/home/HeroSection';
import PopularDestinations from '../Components/home/PopularDestinations';
import Footer from '../Components/layout/Footer';

function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <PopularDestinations />
      <Footer />
    </>
  );
}

export default LandingPage;
