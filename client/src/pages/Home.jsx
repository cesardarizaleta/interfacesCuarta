import Navbar from "../components/Navbar"
import MainSection from "../components/MainSection"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <MainSection />
        {/* Placeholder sections */}
        <div id="about-section" className="h-32 bg-stone-100 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-stone-800">About Section</h2>
        </div>
        <div id="portfolio-section" className="h-32 bg-stone-200 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-stone-800">Portfolio Section</h2>
        </div>
        <div id="contact-section" className="h-32 bg-stone-300 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-stone-800">Contact Section</h2>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
