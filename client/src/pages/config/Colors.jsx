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

  // Estados para paletas
  const [palettes, setPalettes] = useState([])
  const [activePaletteId, setActivePaletteId] = useState(null)

  // Estados para modales
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [newPaletteName, setNewPaletteName] = useState("")
  const [paletteNameError, setPaletteNameError] = useState("")
  const [paletteToDelete, setPaletteToDelete] = useState(null)
  const [paletteToRename, setPaletteToRename] = useState(null)

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

    setPalettes(defaultPalettes)
    setActivePaletteId("default-stone")

    // Aplicar la paleta activa
    const activePalette = defaultPalettes.find((p) => p.id === "default-stone")
    if (activePalette) {
      applyPalette(activePalette)
    }
  }, [])

  
  // Inicializar paletas predeterminadas
  useEffect(() => {
    initializeDefaultPalettes()
  }, [initializeDefaultPalettes])

  // Paletas ordenadas
  const sortedPalettes = [...palettes].sort((a, b) => {
    // Paleta activa primero
    if (a.id === activePaletteId) return -1
    if (b.id === activePaletteId) return 1

    // Luego ordenar por tipo (predefinidas primero)
    if (a.isDefault && !b.isDefault) return -1
    if (!a.isDefault && b.isDefault) return 1

    // Si ambas son del mismo tipo, ordenar por fecha (más reciente primero)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  const isActivePalette = (palette) => palette.id === activePaletteId

  const selectPalette = (palette) => {
    if (isActivePalette(palette)) return

    applyPalette(palette)
    setActivePaletteId(palette.id)
  }

  const applyPalette = (palette) => {
    setPrimaryColor(palette.colors.primary)
    setSecondaryColor(palette.colors.secondary)
    setAccentColor(palette.colors.accent)
    setTextColor(palette.colors.text)
    setNeutralColor(palette.colors.neutral)
  }

  // Funciones para modal de guardado
  const openSavePaletteModal = () => {
    setNewPaletteName("")
    setPaletteNameError("")
    setShowSaveModal(true)
  }

  const cancelSave = () => {
    setShowSaveModal(false)
    setNewPaletteName("")
    setPaletteNameError("")
  }

  const savePalette = () => {
    // Validar nombre
    if (!newPaletteName.trim()) {
      setPaletteNameError("El nombre de la paleta es obligatorio")
      return
    }

    // Verificar si ya existe una paleta con ese nombre
    const existingPalette = palettes.find(
      (p) => p.name.toLowerCase() === newPaletteName.trim().toLowerCase() && !p.isDefault,
    )

    if (existingPalette) {
      setPaletteNameError("Ya existe una paleta con ese nombre")
      return
    }

    // Crear nueva paleta
    const newPalette = {
      id: `palette-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: newPaletteName.trim(),
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        text: textColor,
        neutral: neutralColor,
      },
      isDefault: false,
      createdAt: new Date(),
    }

    // Agregar a la lista y seleccionarla
    setPalettes([...palettes, newPalette])
    setActivePaletteId(newPalette.id)

    // Cerrar modal
    setShowSaveModal(false)
    setNewPaletteName("")
    setPaletteNameError("")
  }

  // Funciones para modal de eliminación
  const confirmDeletePalette = (palette) => {
    if (palette.isDefault) return // No permitir eliminar paletas predefinidas

    setPaletteToDelete(palette)
    setShowDeleteModal(true)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setPaletteToDelete(null)
  }

  const confirmDelete = () => {
    if (!paletteToDelete) return

    // Si la paleta a eliminar es la activa, cambiar a la predeterminada
    if (isActivePalette(paletteToDelete)) {
      const defaultPalette = palettes.find((p) => p.id === "default-stone")
      selectPalette(defaultPalette)
    }

    // Eliminar la paleta
    setPalettes(palettes.filter((p) => p.id !== paletteToDelete.id))

    setShowDeleteModal(false)
    setPaletteToDelete(null)
  }

  // Funciones para modal de renombrar
  const openRenameModal = (palette) => {
    if (palette.isDefault) return // No permitir renombrar paletas predefinidas

    setPaletteToRename(palette)
    setNewPaletteName(palette.name)
    setPaletteNameError("")
    setShowRenameModal(true)
  }

  const cancelRename = () => {
    setShowRenameModal(false)
    setPaletteToRename(null)
    setNewPaletteName("")
    setPaletteNameError("")
  }

  const renamePalette = () => {
    // Validar nombre
    if (!newPaletteName.trim()) {
      setPaletteNameError("El nombre de la paleta es obligatorio")
      return
    }

    // Verificar si ya existe otra paleta con ese nombre
    const existingPalette = palettes.find(
      (p) =>
        p.name.toLowerCase() === newPaletteName.trim().toLowerCase() && p.id !== paletteToRename.id && !p.isDefault,
    )

    if (existingPalette) {
      setPaletteNameError("Ya existe una paleta con ese nombre")
      return
    }

    // Actualizar nombre
    setPalettes(palettes.map((p) => (p.id === paletteToRename.id ? { ...p, name: newPaletteName.trim() } : p)))

    // Cerrar modal
    setShowRenameModal(false)
    setPaletteToRename(null)
    setNewPaletteName("")
    setPaletteNameError("")
  }

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
              className="w-full h-10 sm:h-12 rounded-md cursor-pointer border border-stone-300 shadow-sm transition-shadow duration-200 hover:shadow-md"
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
            onClick={openSavePaletteModal}
            className="px-6 py-3 bg-stone-800 text-white rounded-lg shadow-md hover:bg-stone-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <i className="fas fa-save mr-2"></i>
            <span>Guardar Paleta Actual</span>
          </button>
        </div>
      </div>

      {/* Gestión de Paletas */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Paletas de Colores</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Vista Previa</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Estado</th>
                <th className="text-center py-3 px-4 font-semibold text-stone-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedPalettes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-stone-500">
                    No hay paletas guardadas
                  </td>
                </tr>
              ) : (
                sortedPalettes.map((palette) => (
                  <tr
                    key={palette.id}
                    className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${
                      isActivePalette(palette) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <i className={`fas ${palette.isDefault ? "fa-palette" : "fa-swatchbook"} text-stone-400`}></i>
                        <div>
                          <p className="font-medium text-stone-900">{palette.name}</p>
                          <p className="text-xs text-stone-500">
                            {palette.isDefault ? "Paleta predefinida" : "Paleta personalizada"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-full border border-stone-200"
                          style={{ backgroundColor: palette.colors.primary }}
                        ></div>
                        <div
                          className="w-6 h-6 rounded-full border border-stone-200"
                          style={{ backgroundColor: palette.colors.secondary }}
                        ></div>
                        <div
                          className="w-6 h-6 rounded-full border border-stone-200"
                          style={{ backgroundColor: palette.colors.accent }}
                        ></div>
                        <div
                          className="w-6 h-6 rounded-full border border-stone-200"
                          style={{ backgroundColor: palette.colors.text }}
                        ></div>
                        <div
                          className="w-6 h-6 rounded-full border border-stone-200"
                          style={{ backgroundColor: palette.colors.neutral }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {isActivePalette(palette) && <i className="fas fa-check-circle text-green-500"></i>}
                        <span
                          className={`text-sm font-medium ${
                            isActivePalette(palette) ? "text-green-600" : "text-stone-500"
                          }`}
                        >
                          {isActivePalette(palette) ? "Activa" : "Inactiva"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => selectPalette(palette)}
                          disabled={isActivePalette(palette)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            isActivePalette(palette)
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          <i className="fas fa-check mr-1"></i>
                          {isActivePalette(palette) ? "Activa" : "Aplicar"}
                        </button>
                        {!palette.isDefault && (
                          <>
                            <button
                              onClick={() => openRenameModal(palette)}
                              className="px-3 py-1 bg-stone-500 text-white rounded text-xs font-medium hover:bg-stone-600 transition-colors"
                            >
                              <i className="fas fa-edit mr-1"></i>
                              Renombrar
                            </button>
                            <button
                              onClick={() => confirmDeletePalette(palette)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                            >
                              <i className="fas fa-trash mr-1"></i>
                              Eliminar
                            </button>
                          </>
                        )}
                        {palette.isDefault && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium cursor-not-allowed">
                            <i className="fas fa-lock mr-1"></i>
                            Predefinida
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para guardar paleta */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-lg font-medium text-stone-900 mb-4">Guardar Paleta</h3>
            <div className="mb-4">
              <label htmlFor="paletteName" className="block text-sm font-medium text-stone-600 mb-2">
                Nombre de la Paleta
              </label>
              <input
                type="text"
                id="paletteName"
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                placeholder="Ej: Paleta Minimalista"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50"
              />
              {paletteNameError && <p className="text-red-500 text-xs mt-1">{paletteNameError}</p>}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: secondaryColor }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: accentColor }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: textColor }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: neutralColor }}
              ></div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelSave}
                className="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={savePalette}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar paleta */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-lg font-medium text-stone-900 mb-4">Confirmar eliminación</h3>
            <p className="text-stone-600 mb-6">
              ¿Realmente desea eliminar la paleta <span className="font-semibold">{paletteToDelete?.name}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para renombrar paleta */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-lg font-medium text-stone-900 mb-4">Renombrar Paleta</h3>
            <div className="mb-4">
              <label htmlFor="newPaletteName" className="block text-sm font-medium text-stone-600 mb-2">
                Nuevo Nombre
              </label>
              <input
                type="text"
                id="newPaletteName"
                value={newPaletteName}
                onChange={(e) => setNewPaletteName(e.target.value)}
                placeholder="Ingrese un nuevo nombre"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50"
              />
              {paletteNameError && <p className="text-red-500 text-xs mt-1">{paletteNameError}</p>}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: paletteToRename?.colors.primary }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: paletteToRename?.colors.secondary }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: paletteToRename?.colors.accent }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: paletteToRename?.colors.text }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border border-stone-200"
                style={{ backgroundColor: paletteToRename?.colors.neutral }}
              ></div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelRename}
                className="px-4 py-2 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={renamePalette}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Colors
