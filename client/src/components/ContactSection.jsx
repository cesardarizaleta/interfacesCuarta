import { useState, useEffect } from "react"
import { useColors } from "../contexts/ColorContext"
import CameraImg from "../assets/camera.png"

const ContactSection = () => {
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
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <>
      <style>
        {`
          #user_email::placeholder {
            color: ${activePalette?.colors?.text || '#78716C'} !important;
            opacity: 0.6 !important;
          }
          #user_message::placeholder {
            color: ${activePalette?.colors?.text || '#78716C'} !important;
            opacity: 0.6 !important;
          }
        `}
      </style>
      <section
        key={`contact-${forceUpdate}`}
        id="contact-section"
        className="px-12 lg:px-32 py-16 relative"
        style={{
          backgroundColor: activePalette?.colors?.neutral || '#E7E5E4'
        }}
      >
        {/* Círculo decorativo - Colocado en la capa de fondo (z-index: 0) */}
        <div
          className="h-44 w-44 md:h-52 md:w-52 rounded-full absolute -top-20 left-0 mt-16 z-0"
          style={{ backgroundColor: activePalette?.colors?.secondary || '#d6d3d1' }}
        ></div>
        
        {/* Contenedor principal con texto y formulario - Elevado a una capa superior (z-index: 10) */}
        <div className="relative z-10">
          {/* Main text start */}
          <h1
            className="uppercase text-5xl mb-4 font-semibold"
            style={{ color: activePalette?.colors?.accent || '#44403C' }}
          >
            Contact us
          </h1>
          {/* Main text end */}

          {/* Form start */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <div className="hidden md:flex justify-center items-center">
              <img src={CameraImg || "/placeholder.svg?height=300&width=400"} alt="Camera" />
            </div>
            <div className="flex flex-col w-full items-center">
              <div className="flex flex-col items-center w-full max-w-xs px-2 mb-6">
                <p
                  className="text-xs sm:text-sm mt-2"
                  style={{ color: activePalette?.colors?.text || '#78716C' }}
                >
                  E-mail address
                </p>
                <input
                  type="email"
                  name="email"
                  id="user_email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@domain.com"
                  className="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base resize-vertical"
                  style={{
                    borderColor: activePalette?.colors?.text || '#78716C',
                    color: activePalette?.colors?.text || '#78716C',
                    backgroundColor: activePalette?.colors?.secondary || '#ffffff'
                  }}
                  required
                />
              </div>

              <p
                className="text-xs sm:text-sm mt-2"
                style={{ color: activePalette?.colors?.text || '#78716C' }}
              >
                Message
              </p>
              <div className="flex flex-col items-center w-full max-w-xs px-2 mb-6">
                <textarea
                  name="message"
                  id="user_message"
                  cols="30"
                  rows="10"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base resize-vertical"
                  style={{
                    borderColor: activePalette?.colors?.text || '#78716C',
                    color: activePalette?.colors?.text || '#78716C',
                    backgroundColor: activePalette?.colors?.secondary || '#ffffff'
                  }}
                  required
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="btn w-full md:w-1/2 px-6 py-3 rounded-md transition-colors font-medium"
                style={{
                  backgroundColor: activePalette?.colors?.primary || '#57534E',
                  color: activePalette?.colors?.secondary || '#ffffff'
                }}
              >
                Send
              </button>
            </div>
          </div>
          {/* Form end */}
        </div>
      </section>
    </>
  )
}

export default ContactSection