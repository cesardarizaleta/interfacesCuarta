import { Link } from "react-router-dom"
import photographerImage from "../../assets/image.jpg"

const ConfigIndex = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <img
          src={photographerImage || "/placeholder.svg?height=800&width=1200"}
          alt="Photographer at work"
          className="w-full h-full object-cover object-center scale-110 blur-sm"
        />
      </div>

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 text-center border border-stone-200 transform transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-stone-900 mb-1 sm:mb-2 leading-tight">
            Configuración
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light uppercase tracking-wide text-stone-600">
            Personaliza tu sitio
          </p>
        </div>

        <p className="text-stone-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm sm:text-base md:text-lg">
          Bienvenido al panel de configuración. Elige una opción para personalizar la apariencia de tu sitio web.
        </p>

        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
          <Link
            to="/config/colors"
            className="relative flex items-center justify-center w-full bg-stone-700 text-white py-3 sm:py-3.5 md:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg overflow-hidden group hover:bg-stone-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
          >
            <span className="absolute inset-0 bg-stone-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            Configurar Colores
            <i className="fas fa-palette ml-2 sm:ml-3 group-hover:scale-110 transition-transform duration-300 text-lg sm:text-xl"></i>
          </Link>

          <Link
            to="/config/fonts"
            className="relative flex items-center justify-center w-full bg-stone-700 text-white py-3 sm:py-3.5 md:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg overflow-hidden group hover:bg-stone-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
          >
            <span className="absolute inset-0 bg-stone-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            Configurar Fuentes
            <i className="fas fa-font ml-2 sm:ml-3 group-hover:scale-110 transition-transform duration-300 text-lg sm:text-xl"></i>
          </Link>

        <Link
          to="/config/multimedia"
          className="relative flex items-center justify-center w-full bg-stone-700 text-white py-3 sm:py-3.5 md:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg overflow-hidden group hover:bg-stone-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
        >
          <span className="absolute inset-0 bg-stone-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            Configurar Multimedia
          <i className="fas fa-font ml-2 sm:ml-3 group-hover:scale-110 transition-transform duration-300 text-lg sm:text-xl"></i>

        </Link>


        </div>

        <Link
          to="/"
          className="inline-block mt-5 sm:mt-6 md:mt-8 text-stone-500 hover:text-stone-700 hover:underline transition-colors duration-200 text-xs sm:text-sm md:text-base"
        >
          <i className="fas fa-arrow-left mr-1 sm:mr-2"></i> Volver a la página principal
        </Link>
      </div>
    </section>
  )
}

export default ConfigIndex
