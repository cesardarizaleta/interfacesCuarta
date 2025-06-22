import WeddingImg from "../assets/services/wedding.png";
import LifestyleImg from "../assets/services/lifestyle.png";
import MomentsImg from "../assets/services/moments.png";

const ServicesSection = () => {
  const services = [
    {
      image: WeddingImg,
      title: "Wedding",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, neque?",
      alignment: "left",
    },
    {
      image: LifestyleImg,
      title: "Lifestyle",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ratione!",
      alignment: "right",
    },
    {
      image: MomentsImg,
      title: "Moments",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, molestias.",
      alignment: "left",
    },
  ]

  return (
    <section id="services-section" className="px-4 sm:px-8 lg:px-32 py-16 bg-stone-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <h1 className="text-4xl lg:text-5xl font-semibold uppercase text-stone-800">Our Services</h1>
            <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iure rem harum, quam magnam accusamus
              inventore incidunt nihil, fuga soluta earum! Voluptatibus, recusandae. Cumque sequi ullam, nostrum
              voluptatum eius saepe.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-48 h-48 bg-stone-200 rounded-lg overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold uppercase text-stone-800 mb-2">{service.title}</h3>
                <p className="text-stone-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative circle */}
        <div className="absolute top-0 -right-20 w-64 h-64 bg-stone-200 rounded-full opacity-20 -z-10"></div>
      </div>
    </section>
  )
}

export default ServicesSection
