import photographerImage from "../assets/image.jpg"

const MainSection = () => {
  return (
    <section className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold uppercase text-stone-800 leading-tight">
              Capturing
              <br />
              Beauty 
              <br />
              Photo
            </h1>

            {/* Description */}
            <p className="text-lg text-stone-600 max-w-lg mx-auto lg:mx-0">
              A camera is an optical instrument that captures a visual image at their most basic, cameras are sealed
            </p>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6">
              <a href="#" className="text-2xl text-stone-600 hover:text-stone-900 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-2xl text-stone-600 hover:text-stone-900 transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-2xl text-stone-600 hover:text-stone-900 transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-2xl text-stone-600 hover:text-stone-900 transition-colors">
                <i className="fab fa-dribbble"></i>
              </a>
              <a href="#" className="text-2xl text-stone-600 hover:text-stone-900 transition-colors">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <img
                src={photographerImage || "/placeholder.svg?height=600&width=400"}
                alt="Professional photographer"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Scroll Down Button */}
        <div className="flex justify-center mt-16">
          <a
            href="#about-section"
            className="inline-flex items-center justify-center w-12 h-12 bg-stone-700 text-white rounded-full shadow-lg hover:bg-stone-800 hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fas fa-arrow-down"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default MainSection
