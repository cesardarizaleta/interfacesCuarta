import WeddingImg from "../assets/services/wedding.png"
import LifestyleImg from "../assets/services/lifestyle.png"
import MomentsImg from "../assets/services/moments.png"

const ServicesSection = () => {
  return (
    <section id="services-section" className="px-12 lg:px-32 py-16 relative overflow-hidden">
      {/* Text wrapper start */}
      <div className="flex gap-8 flex-col md:flex-row">
        {/* Main text start */}
        <h1 className="uppercase text-5xl mb-4 font-semibold">OUR SERVICES</h1>
        <p className="capitalize xl:w-1/2 text-stone-500 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure rem harum, quam magnam accusamus
          inventore incidunt nihil, fuga soluta earum! Voluptatibus, recusandae. Cumque sequi ullam, nostrum voluptatum
          eius saepe.
        </p>
        {/* Main text end */}
      </div>
      {/* Text wrapper end */}

      {/* Services start */}
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Wedding service start */}
        <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start my-8 md:w-1/3">
          <img src={WeddingImg || "/placeholder.svg?height=100&width=100"} alt="Wedding" className="-z-50 md:mb-4" />
          <div className="w-2/3 text-right md:text-left md:w-full">
            <h1 className="uppercase text-2xl font-semibold">Wedding</h1>
            <p className="capitalize text-stone-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, neque?
            </p>
          </div>
        </div>
        {/* Wedding service end */}

        {/* Lifestyle service start */}
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start my-8 md:w-1/3">
          <div className="w-2/3 text-left md:w-full md:order-2">
            <h1 className="uppercase text-2xl font-semibold">Lifestyle</h1>
            <p className="capitalize text-stone-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ratione!
            </p>
          </div>
          <img
            src={LifestyleImg || "/placeholder.svg?height=100&width=100"}
            alt="Lifestyle"
            className="-z-50 md:mb-4 md:order-1"
          />
        </div>
        {/* Lifestyle service end */}

        {/* Moments service start */}
        <div className="flex flex-row md:flex-col justify-between items-center md:items-start my-8 md:w-1/3">
          <div className="w-1/3">
            <img src={MomentsImg || "/placeholder.svg?height=100&width=100"} alt="Moments" className="-z-50 md:mb-4" />
          </div>
          <div className="w-2/3 text-right md:text-left md:w-full">
            <h1 className="uppercase text-2xl font-semibold">Moments</h1>
            <p className="capitalize text-stone-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, molestias.
            </p>
          </div>
        </div>
        {/* Moments service end */}
      </div>
      {/* Services end */}

      {/* Circle start */}
      <div className="bg-neutral-300 h-64 w-64 rounded-full absolute top-0 -right-20 mt-16 -z-20"></div>
      {/* Circle end */}
    </section>
  )
}

export default ServicesSection
