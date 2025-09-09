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
  return (
    <section id="portfolio-section" className="px-4 lg:px-8 py-16 relative">
      {/* Text wrapper start */}
      <div className="flex gap-8 flex-col md:flex-row">
        {/* Main text start */}
        <h1 className="uppercase text-5xl mb-4 font-semibold">OUR PORTFOLIO</h1>
        <p className="capitalize xl:w-1/2 text-stone-500 mb-8">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolores distinctio reiciendis
          obcaecati ea.
        </p>
        {/* Main text end */}
      </div>
      {/* Text wrapper end */}

      {/* Images grid start */}
      <div className="grid-cols-2 md:grid-cols-5 grid mb-8 gap-4">
        <div className="grid grid-cols-1 md:hidden gap-4">
          <img src={Portfolio1 || "/placeholder.svg"} alt="1" className="rounded-xl" />
          <img src={Portfolio2 || "/placeholder.svg"} alt="2" className="rounded-xl" />
          <img src={Portfolio3 || "/placeholder.svg"} alt="3" className="rounded-xl" />
          <img src={Portfolio4 || "/placeholder.svg"} alt="4" className="rounded-xl" />
          <img src={Portfolio5 || "/placeholder.svg"} alt="5" className="rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:hidden gap-4">
          <img src={Portfolio6 || "/placeholder.svg"} alt="6" className="rounded-xl" />
          <img src={Portfolio7 || "/placeholder.svg"} alt="7" className="rounded-xl" />
          <img src={Portfolio8 || "/placeholder.svg"} alt="8" className="rounded-xl" />
          <img src={Portfolio9 || "/placeholder.svg"} alt="9" className="rounded-xl" />
          <img src={Portfolio10 || "/placeholder.svg"} alt="10" className="rounded-xl" />
        </div>

        <div className="hidden md:flex flex-col gap-4">
          <img src={Portfolio1 || "/placeholder.svg"} alt="1" className="rounded-xl" />
          <img src={Portfolio2 || "/placeholder.svg"} alt="2" className="rounded-xl" />
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <img src={Portfolio3 || "/placeholder.svg"} alt="1" className="rounded-xl" />
          <img src={Portfolio4 || "/placeholder.svg"} alt="2" className="rounded-xl" />
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <img src={Portfolio8 || "/placeholder.svg"} alt="2" className="rounded-xl" />
          <img src={Portfolio5 || "/placeholder.svg"} alt="2" className="rounded-xl" />
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <img src={Portfolio7 || "/placeholder.svg"} alt="1" className="rounded-xl" />
          <img src={Portfolio6 || "/placeholder.svg"} alt="2" className="rounded-xl" />
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <img src={Portfolio9 || "/placeholder.svg"} alt="1" className="rounded-xl" />
          <img src={Portfolio10 || "/placeholder.svg"} alt="2" className="rounded-xl" />
        </div>
      </div>
      {/* Images grid end */}

      {/* "More" link start */}
      <a href="#" className="text-end">
        <p className="font-semibold text-lg group relative">
          <span>Show more photos </span>
          <i className="fa-solid fa-arrow-right"></i>
        </p>
      </a>
      {/* "More" link end */}

      {/* Circle start */}
      <div className="bg-neutral-300 h-64 w-64 rounded-full absolute top-0 left-0 mt-16 -z-20"></div>
      {/* Circle end */}
    </section>
  )
}

export default PortfolioSection
