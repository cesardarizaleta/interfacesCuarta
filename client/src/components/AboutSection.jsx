const AboutSection = () => {
  return (
    <section id="about-section" className="px-4 sm:px-8 lg:px-32 py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main text */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-semibold uppercase mb-4 text-stone-800">About Us</h1>
          <p className="text-lg text-stone-600 max-w-2xl mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint quia quos, nesciunt id esse magnam
            facere eveniet ea laborum minus illo earum! Dolorum repellat eos, quod tempora omnis magni blanditiis
            eligendi nesciunt aut sapiente nemo distinctio placeat voluptas facilis deserunt quaerat, voluptatem hic
            accusamus dicta, eaque asperiores qui quasi?
          </p>
        </div>

        {/* "More" link */}
        <div className="text-left">
          <a href="#" className="inline-flex items-center text-stone-700 hover:text-stone-900 transition-colors group">
            <span className="font-semibold text-lg mr-2">Read more</span>
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        {/* Decorative circle */}
        <div className="absolute top-0 -left-20 w-44 h-44 md:w-52 md:h-52 bg-stone-200 rounded-full opacity-30 -z-10"></div>
      </div>
    </section>
  )
}

export default AboutSection
