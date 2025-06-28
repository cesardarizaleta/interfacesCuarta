const AboutSection = () => {
  return (
    <section id="about-section" className="px-12 lg:px-32 py-16 border-t border-stone-500 relative">
      {/* Main text start */}
      <h1 className="uppercase text-5xl mb-4 font-semibold">ABOUT US</h1>
      <p className="capitalize xl:w-1/2 text-stone-500 mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint quia quos, nesciunt id esse magnam
        facere eveniet ea laborum minus illo earum! Dolorum repellat eos, quod tempora omnis magni blanditiis eligendi
        nesciunt aut sapiente nemo distinctio placeat voluptas facilis deserunt quaerat, voluptatem hic accusamus dicta,
        eaque asperiores qui quasi?
      </p>
      {/* Main text end */}

      {/* "More" link start */}
      <a href="#" className="text-end">
        <p className="font-semibold text-lg group relative">
          <span>Read more </span>
          <i className="fa-solid fa-arrow-right"></i>
        </p>
      </a>
      {/* "More" link end */}

      {/* Circle start */}
      <div className="bg-neutral-200 h-44 w-44 md:h-52 md:w-52 rounded-full absolute top-0 -left-20 mt-16 -z-20"></div>
      {/* Circle end */}
    </section>
  )
}

export default AboutSection
