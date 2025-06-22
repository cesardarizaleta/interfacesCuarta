import Navbar from "../components/Navbar"
import MainSection from "../components/MainSection"
import AboutSection from "../components/AboutSection"
import ServicesSection from "../components/ServicesSection"
import PortfolioSection from "../components/PortfolioSection"
import ContactSection from "../components/ContactSection"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <MainSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home
