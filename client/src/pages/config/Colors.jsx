import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import photographerImage from "../../assets/image.jpg"

const Colors = () => {
  // Estados para colores activos
  const [primaryColor, setPrimaryColor] = useState("#57534E")
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF")
  const [accentColor, setAccentColor] = useState("#44403C")
  const [textColor, setTextColor] = useState("#78716C")
  const [neutralColor, setNeutralColor] = useState("#E7E5E4")

  const initializeDefaultPalettes = useCallback(() => {
    const defaultPalettes = [
      {
        id: "default-stone",
        name: "Stone (Predeterminado)",
        colors: {
          primary: "#57534E",
          secondary: "#FFFFFF",
          accent: "#44403C",
          text: "#78716C",
          neutral: "#E7E5E4",
        },
        isDefault: true,
        createdAt: new Date("2020-01-01"),
      },
      {
        id: "default-slate",
        name: "Slate",
        colors: {
          primary: "#475569",
          secondary: "#F8FAFC",
          accent: "#334155",
          text: "#64748B",
          neutral: "#E2E8F0",
        },
        isDefault: true,
        createdAt: new Date("2020-01-02"),
      },
      {
        id: "default-zinc",
        name: "Zinc",
        colors: {
          primary: "#52525B",
          secondary: "#FAFAFA",
          accent: "#3F3F46",
          text: "#71717A",
          neutral: "#E4E4E7",
        },
        isDefault: true,
        createdAt: new Date("2020-01-03"),
      },
      {
        id: "default-neutral",
        name: "Neutral",
        colors: {
          primary: "#525252",
          secondary: "#FAFAFA",
          accent: "#404040",
          text: "#737373",
          neutral: "#E5E5E5",
        },
        isDefault: true,
        createdAt: new Date("2020-01-04"),
      },
      {
        id: "default-warm",
        name: "Cálido",
        colors: {
          primary: "#B45309",
          secondary: "#FFFBEB",
          accent: "#92400E",
          text: "#D97706",
          neutral: "#FEF3C7",
        },
        isDefault: true,
        createdAt: new Date("2020-01-05"),
      },
      {
        id: "default-cool",
        name: "Frío",
        colors: {
          primary: "#0369A1",
          secondary: "#F0F9FF",
          accent: "#075985",
          text: "#0EA5E9",
          neutral: "#E0F2FE",
        },
        isDefault: true,
        createdAt: new Date("2020-01-06"),
      },
      {
        id: "default-dark",
        name: "Oscuro",
        colors: {
          primary: "#1E293B",
          secondary: "#F8FAFC",
          accent: "#0F172A",
          text: "#334155",
          neutral: "#CBD5E1",
        },
        isDefault: true,
        createdAt: new Date("2020-01-07"),
      },
    ]


    // Aplicar la paleta activa
    const activePalette = defaultPalettes.find((p) => p.id === "default-stone")
    if (activePalette) {
      setPrimaryColor(activePalette.colors.primary)
      setSecondaryColor(activePalette.colors.secondary)
      setAccentColor(activePalette.colors.accent)
      setTextColor(activePalette.colors.text)
      setNeutralColor(activePalette.colors.neutral)
    }
  }, [])

  useEffect(() => {
    initializeDefaultPalettes()
  }, [initializeDefaultPalettes])


  return (
    <section className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-24 py-12 sm:py-16 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans relative">
      <div className="absolute inset-0 overflow-hidden opacity-10 -z-10">
        <img
          src={photographerImage || "/placeholder.svg?height=800&width=1200"}
          alt="Photographer at work"
          className="w-full h-full object-cover object-center scale-110 blur-sm"
        />
      </div>

      <div className="relative flex items-center justify-center mb-8 sm:mb-10">
        <Link
          to="/config"
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-stone-600 hover:text-stone-800 transition-colors duration-200 text-lg sm:text-xl md:text-2xl lg:text-3xl p-2 rounded-full hover:bg-stone-200 focus:outline-none focus:ring-2 z-[60] focus:ring-stone-500 focus:ring-opacity-50"
          aria-label="Volver al panel principal de configuración"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" />
          </svg>
        </Link>
        <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-stone-900 leading-tight">
          Configuración de Colores
        </h1>
      </div>

      {/* Vista Previa en Vivo */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Vista Previa en Vivo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-center justify-items-center">
          <div className="flex flex-col items-center text-center w-full px-2">
            <button
              style={{ backgroundColor: primaryColor, color: secondaryColor }}
              className="py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:opacity-90 text-sm sm:text-base font-semibold"
            >
              Botón de Muestra
            </button>
            <p className="text-xs sm:text-sm mt-2 text-stone-500">Fondo Principal, Texto Secundario</p>
          </div>

          <div className="text-center w-full px-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1" style={{ color: accentColor }}>
              Título de Ejemplo
            </h3>
            <p className="text-sm sm:text-base" style={{ color: textColor }}>
              Texto del cuerpo para previsualizar el color.
            </p>
            <p className="text-xs sm:text-sm mt-2 text-stone-500">Título de Acento, Texto del Cuerpo</p>
          </div>

          <div className="flex flex-col items-center text-center w-full px-2">
            <div
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: neutralColor }}
            >
              <i className="fas fa-star text-3xl sm:text-4xl" style={{ color: primaryColor }}></i>
            </div>
            <p className="text-xs sm:text-sm mt-2 text-stone-500">Fondo Neutro, Icono Principal</p>
          </div>

          <div className="flex flex-col items-center text-center w-full px-2">
            <button
              style={{ backgroundColor: accentColor, color: secondaryColor }}
              className="py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg border-2 transition-all duration-300 ease-in-out hover:opacity-90 text-sm sm:text-base font-semibold"
            >
              Otro Botón
            </button>
            <p className="text-xs sm:text-sm mt-2 text-stone-500">Fondo de Acento, Texto Secundario</p>
          </div>

          <div className="text-center w-full px-2">
            <a
              href="#"
              className="font-medium text-base sm:text-lg hover:underline transition-colors duration-200"
              style={{ color: primaryColor }}
            >
              Enlace de Muestra
            </a>
            <p className="text-xs sm:text-sm mt-2 text-stone-500">Color de Enlace Principal</p>
          </div>

          <div className="flex flex-col items-center w-full max-w-xs px-2">
            <input
              type="text"
              placeholder="Entrada de Texto"
              style={{ borderColor: primaryColor, color: textColor }}
              className="w-full px-3 py-2 sm:py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base focus:ring-stone-500"
            />
            <p className="text-xs sm:text-sm mt-2 text-stone-500">Borde Principal, Color de Texto</p>
          </div>
        </div>
      </div>

      {/* Ajustar Colores */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Ajustar Colores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          <div>
            <label htmlFor="primaryColor" className="block text-sm font-medium text-stone-600 mb-2">
              Color Primario
            </label>
            <input
              type="color"
              id="primaryColor"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-full h-10 sm:h-12 rounded-md cursor-pointer"
            />
            <span className="block text-center text-xs mt-1 text-stone-500">{primaryColor}</span>
          </div>

          <div>
            <label htmlFor="secondaryColor" className="block text-sm font-medium text-stone-600 mb-2">
              Color Secundario
            </label>
            <input
              type="color"
              id="secondaryColor"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
            />
            <span className="block text-center text-xs mt-1 text-stone-500">{secondaryColor}</span>
          </div>

          <div>
            <label htmlFor="accentColor" className="block text-sm font-medium text-stone-600 mb-2">
              Color de Acento
            </label>
            <input
              type="color"
              id="accentColor"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
            />
            <span className="block text-center text-xs mt-1 text-stone-500">{accentColor}</span>
          </div>

          <div>
            <label htmlFor="textColor" className="block text-sm font-medium text-stone-600 mb-2">
              Color de Texto
            </label>
            <input
              type="color"
              id="textColor"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
            />
            <span className="block text-center text-xs mt-1 text-stone-500">{textColor}</span>
          </div>

          <div>
            <label htmlFor="neutralColor" className="block text-sm font-medium text-stone-600 mb-2">
              Fondo Neutro
            </label>
            <input
              type="color"
              id="neutralColor"
              value={neutralColor}
              onChange={(e) => setNeutralColor(e.target.value)}
              className="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
            />
            <span className="block text-center text-xs mt-1 text-stone-500">{neutralColor}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={/*Añadir después*/ () => {}}
            className="px-6 py-3 bg-stone-800 text-white rounded-lg shadow-md hover:bg-stone-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <i className="fas fa-save mr-2"></i>
            <span>Guardar Paleta Actual</span>
          </button>
        </div>
      </div>

      {/*sección de gestión de paletas */}

    </section>
  )
}

export default Colors