import { useState, useEffect } from "react"
import { useColors } from "../contexts/ColorContext"

const AboutSection = () => {
  const { activePalette, activePaletteId } = useColors()
  const [forceUpdate, setForceUpdate] = useState(0)

  // Forzar actualización cuando cambia la paleta
  useEffect(() => {
    if (activePaletteId) {
      setTimeout(() => {
        setForceUpdate(prev => prev + 1)
      }, 50)
    }
  }, [activePaletteId])

  return (
    <section
      key={`about-${forceUpdate}`}
      id="about-section"
      className="px-12 lg:px-32 py-16 relative"
      style={{
        backgroundColor: activePalette?.colors?.neutral || '#E7E5E4',
        borderTop: `1px solid ${activePalette?.colors?.accent || '#44403C'}`
      }}
    >
      {/* Main text start */}
      <h1
        className="uppercase text-5xl mb-4 font-semibold"
        style={{ color: activePalette?.colors?.accent || '#44403C' }}
      >
        ABOUT US
      </h1>
      <p
        className="capitalize xl:w-1/2 mb-8"
        style={{ color: activePalette?.colors?.text || '#78716C' }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sint quia quos, nesciunt id esse magnam
        facere eveniet ea laborum minus illo earum! Dolorum repellat eos, quod tempora omnis magni blanditiis eligendi
        nesciunt aut sapiente nemo distinctio placeat voluptas facilis deserunt quaerat, voluptatem hic accusamus dicta,
        eaque asperiores qui quasi?
      </p>
      {/* Main text end */}

      {/* "More" link start */}
      <a href="#" className="text-end">
        <p
          className="font-semibold text-lg group relative"
          style={{ color: activePalette?.colors?.primary || '#57534E' }}
        >
          <span>Read more </span>
          <i className="fa-solid fa-arrow-right"></i>
        </p>
      </a>
      {/* "More" link end */}

      {/* Circle start */}
      <div
        className="h-44 w-44 md:h-52 md:w-52 rounded-full absolute top-0 -left-20 mt-16 z-10"
        style={{ backgroundColor: activePalette?.colors?.text || '#78716C' }}
      ></div>
      {/* Circle end */}
    </section>
  )
}

export default AboutSection