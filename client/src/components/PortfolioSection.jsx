import Portfolio1 from "../assets/portfolio/portfolio1.jpg"
import Portfolio2 from "../assets/portfolio/portfolio2.jpg"
import Portfolio3 from "../assets/portfolio/portfolio3.jpg"
import Portfolio4 from "../assets/portfolio/portfolio4.jpg"
import Portfolio5 from "../assets/portfolio/portfolio5.jpg"
import Portfolio6 from "../assets/portfolio/portfolio6.jpg"
import Portfolio7 from "../assets/portfolio/portfolio7.jpg"
import Portfolio8 from "../assets/portfolio/portfolio8.jpg"
import Portfolio9 from "../assets/portfolio/portfolio9.jpg"
import Portfolio10 from "../assets/portfolio/portfolio10.jpg"

const PortfolioSection = () => {
  const portfolioImages = [
    Portfolio1,
    Portfolio2,
    Portfolio3,
    Portfolio4,
    Portfolio5,
    Portfolio6,
    Portfolio7,
    Portfolio8,
    Portfolio9,
    Portfolio10
  ]

  return (
    <section id="portfolio-section" className="px-4 sm:px-8 lg:px-32 py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <h1 className="text-4xl lg:text-5xl font-semibold uppercase text-stone-800">Our Portfolio</h1>
            <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolores distinctio reiciendis
              obcaecati ea.
            </p>
          </div>
        </div>

        {/* Portfolio Grid - Mobile: 2 columns, Desktop: 5 columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {/* Mobile Layout */}
          <div className="md:hidden col-span-2 grid grid-cols-2 gap-4">
            {portfolioImages.map((image, index) => (
              <div key={index} className="aspect-[3/4] bg-stone-200 rounded-xl overflow-hidden">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          {Array.from({ length: 5 }).map((_, columnIndex) => (
            <div key={columnIndex} className="hidden md:flex flex-col gap-4">
              {portfolioImages
                .filter((_, index) => index % 5 === columnIndex)
                .map((image, index) => (
                  <div key={index} className="bg-stone-200 rounded-xl overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Portfolio ${columnIndex * 2 + index + 1}`}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* "More" link */}
        <div className="text-right">
          <a href="#" className="inline-flex items-center text-stone-700 hover:text-stone-900 transition-colors group">
            <span className="font-semibold text-lg mr-2">Show more photos</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        {/* Decorative circle */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-stone-200 rounded-full opacity-20 -z-10"></div>
      </div>
    </section>
  )
}

export default PortfolioSection
