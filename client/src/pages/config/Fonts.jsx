
import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import photographerImage from "../../assets/image.jpg"

const Fonts = () => {
  // Estados para tamaños
  const [headlineSize, setHeadlineSize] = useState(48)
  const [subtitleSize, setSubtitleSize] = useState(24)
  const [paragraphSize, setParagraphSize] = useState(16)

  // Estados para fuentes activas
  const [titleFont, setTitleFont] = useState("Georgia, serif") // Fuente para títulos (secundaria)
  const [bodyFont, setBodyFont] = useState("Arial, sans-serif") // Fuente para cuerpo (principal)

  // Estados para historial de fuentes
  const [fontHistory, setFontHistory] = useState([])

  // Estados de subida
  const [primaryUploadMessage, setPrimaryUploadMessage] = useState("")
  const [primaryUploadSuccess, setPrimaryUploadSuccess] = useState(false)
  const [secondaryUploadMessage, setSecondaryUploadMessage] = useState("")
  const [secondaryUploadSuccess, setSecondaryUploadSuccess] = useState(false)

  // Estados de modales
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [fontToDelete, setFontToDelete] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [pendingFont, setPendingFont] = useState(null)

  // Referencias para inputs de archivo
  const primaryFontInputRef = useRef(null)
  const secondaryFontInputRef = useRef(null)

  // Fuentes del sistema
  const systemFonts = [
    { name: "Arial", value: "Arial, sans-serif" },
    { name: "Verdana", value: "Verdana, sans-serif" },
    { name: "Helvetica", value: "Helvetica, sans-serif" },
    { name: "Tahoma", value: "Tahoma, sans-serif" },
    { name: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Times New Roman", value: "Times New Roman, serif" },
    { name: "Palatino", value: "Palatino Linotype, Book Antiqua, Palatino, serif" },
    { name: "Courier New", value: "Courier New, monospace" },
    { name: "Lucida Console", value: "Lucida Console, monospace" },
  ]

  // FUNCIONES DECLARADAS PRIMERO (antes de usarlas)
  function isActiveFontForType(font) {
    if (font.type === "title") {
      return titleFont === font.fontFamily
    } else {
      return bodyFont === font.fontFamily
    }
  }

  function getTitleFontName() {
    // Buscar en fuentes personalizadas
    const customFont = fontHistory.find((f) => f.fontFamily === titleFont && f.type === "title")
    if (customFont) return customFont.name

    // Buscar en fuentes del sistema
    const systemFont = systemFonts.find((f) => f.value === titleFont)
    return systemFont ? systemFont.name : "Fuente desconocida"
  }

  function getBodyFontName() {
    // Buscar en fuentes personalizadas
    const customFont = fontHistory.find((f) => f.fontFamily === bodyFont && f.type === "body")
    if (customFont) return customFont.name

    // Buscar en fuentes del sistema
    const systemFont = systemFonts.find((f) => f.value === bodyFont)
    return systemFont ? systemFont.name : "Fuente desconocida"
  }

  function selectFont(font) {
    if (font.type === "title") {
      setTitleFont(font.fontFamily)
    } else {
      setBodyFont(font.fontFamily)
    }
  }

  // Validación de archivos TTF
  function validateTTFFile(file) {
    const fileName = file.name.toLowerCase()
    if (!fileName.endsWith(".ttf")) {
      return {
        valid: false,
        message: "Error: Solo se permiten archivos .ttf",
      }
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        valid: false,
        message: "Error: El archivo es demasiado grande (máx. 5MB)",
      }
    }

    return {
      valid: true,
      message: `Archivo ${file.name} cargado correctamente`,
    }
  }

  // Crear fuente
  function createFont(fontUrl, fileName, type, setActive = true) {
    try {
      const fontId = `font-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const fontName = fileName
      // Limpiar el nombre para CSS - remover caracteres especiales
      const cleanFontName = fontName.replace(/[^a-zA-Z0-9]/g, "")
      const fontFamily = `CustomFont-${cleanFontName}-${fontId}`

      // Crear el estilo CSS de forma más segura
      const style = document.createElement("style")
      style.setAttribute("data-font-id", fontId)
      style.type = "text/css"

      // Crear CSS de forma más segura
      const cssText = `
      @font-face {
        font-family: "${fontFamily}";
        src: url("${fontUrl}") format("truetype");
        font-display: swap;
      }
    `

      // Añadir el CSS de forma compatible con todos los navegadores
      if (style.styleSheet) {
        style.styleSheet.cssText = cssText
      } else {
        style.appendChild(document.createTextNode(cssText))
      }

      document.head.appendChild(style)

      // Crear entrada del historial
      const fontEntry = {
        id: fontId,
        name: fontName,
        description: `Fuente personalizada para ${type === "title" ? "títulos" : "cuerpo de texto"}`,
        type: type,
        fontFamily: fontFamily,
        uploadDate: new Date(),
      }

      // Actualizar el historial usando la función de callback para evitar problemas de estado
      setFontHistory((prevHistory) => [fontEntry, ...prevHistory])

      // Aplicar automáticamente si se solicita
      if (setActive) {
        // Usar setTimeout para asegurar que el estado se actualice primero
        setTimeout(() => {
          if (type === "title") {
            setTitleFont(fontFamily)
          } else {
            setBodyFont(fontFamily)
          }
        }, 100)
      }

      console.log(`Fuente ${fontName} creada exitosamente con ID: ${fontId}`)
    } catch (error) {
      console.error("Error al crear la fuente:", error)
      // Mostrar mensaje de error al usuario
      if (type === "title") {
        setSecondaryUploadMessage("Error al procesar la fuente")
        setSecondaryUploadSuccess(false)
      } else {
        setPrimaryUploadMessage("Error al procesar la fuente")
        setPrimaryUploadSuccess(false)
      }
    }
  }

  function deleteFont(fontId) {
    try {
      const fontIndex = fontHistory.findIndex((f) => f.id === fontId)
      if (fontIndex === -1) {
        console.warn(`Fuente con ID ${fontId} no encontrada`)
        return
      }

      const font = fontHistory[fontIndex]

      // Si la fuente está activa, volver a la por defecto
      if (font.type === "title" && titleFont === font.fontFamily) {
        setTitleFont("Georgia, serif")
      } else if (font.type === "body" && bodyFont === font.fontFamily) {
        setBodyFont("Arial, sans-serif")
      }

      // Remover el estilo CSS de forma segura
      const styleElement = document.querySelector(`style[data-font-id="${fontId}"]`)
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }

      // Remover del historial usando callback para evitar problemas de estado
      setFontHistory((prevHistory) => prevHistory.filter((f) => f.id !== fontId))

      // Resetear los inputs de archivo para permitir subir el mismo archivo nuevamente
      if (font.type === "title") {
        if (secondaryFontInputRef.current) {
          secondaryFontInputRef.current.value = ""
        }
      } else {
        if (primaryFontInputRef.current) {
          primaryFontInputRef.current.value = ""
        }
      }

      console.log(`Fuente ${font.name} eliminada exitosamente`)
    } catch (error) {
      console.error("Error al eliminar la fuente:", error)
    }
  }

  // AHORA SÍ PODEMOS USAR LAS FUNCIONES EN VARIABLES CALCULADAS
  // Historial ordenado
  const sortedFontHistory = [...fontHistory].sort((a, b) => {
    const aIsActive = isActiveFontForType(a)
    const bIsActive = isActiveFontForType(b)

    // Si una está activa y la otra no, la activa va primero
    if (aIsActive && !bIsActive) return -1
    if (!aIsActive && bIsActive) return 1

    // Si ambas tienen el mismo estado, ordenar por fecha (más reciente primero)
    return new Date(b.uploadDate) - new Date(a.uploadDate)
  })

  // Fuentes personalizadas para cuerpo
  const customBodyFonts = fontHistory.filter((font) => font.type === "body")

  // Fuentes personalizadas para títulos
  const customTitleFonts = fontHistory.filter((font) => font.type === "title")

  // Manejo de subida de fuente principal
  const handlePrimaryFontUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const validation = validateTTFFile(file)

    if (!validation.valid) {
      setPrimaryUploadMessage(validation.message)
      setPrimaryUploadSuccess(false)
      return
    }

    // Verificar si la fuente ya existe en el historial
    const fontName = file.name.replace(".ttf", "")
    const existingFont = fontHistory.find((f) => f.name === fontName && f.type === "body")

    if (existingFont) {
      setPrimaryUploadMessage(`La fuente "${fontName}" ya está en el historial`)
      setPrimaryUploadSuccess(false)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      // Preparar la fuente pendiente
      setPendingFont({
        url: e.target.result,
        name: file.name.replace(".ttf", ""),
        type: "body",
      })

      // Mostrar el modal de opciones
      setShowUploadModal(true)

      setPrimaryUploadMessage(validation.message)
      setPrimaryUploadSuccess(true)
    }
    reader.onerror = () => {
      setPrimaryUploadMessage("Error al leer el archivo")
      setPrimaryUploadSuccess(false)
    }
    reader.readAsDataURL(file)
  }

  // Manejo de subida de fuente secundaria
  const handleSecondaryFontUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const validation = validateTTFFile(file)

    if (!validation.valid) {
      setSecondaryUploadMessage(validation.message)
      setSecondaryUploadSuccess(false)
      return
    }

    // Verificar si la fuente ya existe en el historial
    const fontName = file.name.replace(".ttf", "")
    const existingFont = fontHistory.find((f) => f.name === fontName && f.type === "title")

    if (existingFont) {
      setSecondaryUploadMessage(`La fuente "${fontName}" ya está en el historial`)
      setSecondaryUploadSuccess(false)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      // Preparar la fuente pendiente
      setPendingFont({
        url: e.target.result,
        name: file.name.replace(".ttf", ""),
        type: "title",
      })

      // Mostrar el modal de opciones
      setShowUploadModal(true)

      setSecondaryUploadMessage(validation.message)
      setSecondaryUploadSuccess(true)
    }
    reader.onerror = () => {
      setSecondaryUploadMessage("Error al leer el archivo")
      setSecondaryUploadSuccess(false)
    }
    reader.readAsDataURL(file)
  }

  // Aplicar fuente pendiente
  const applyPendingFont = (setActive) => {
    if (!pendingFont) {
      console.warn("No hay fuente pendiente para aplicar")
      return
    }

    try {
      const { url, name, type } = pendingFont

      // Crear y aplicar la fuente
      createFont(url, name, type, setActive)

      // Cerrar el modal
      setShowUploadModal(false)
      setPendingFont(null)

      // Resetear los inputs para permitir subir el mismo archivo nuevamente
      setTimeout(() => {
        if (type === "title") {
          if (secondaryFontInputRef.current) {
            secondaryFontInputRef.current.value = ""
          }
        } else {
          if (primaryFontInputRef.current) {
            primaryFontInputRef.current.value = ""
          }
        }
      }, 100)
    } catch (error) {
      console.error("Error al aplicar fuente pendiente:", error)
    }
  }

  // Cancelar subida
  const cancelUpload = () => {
    setShowUploadModal(false)
    setPendingFont(null)

    // Resetear los inputs
    if (primaryFontInputRef.current) {
      primaryFontInputRef.current.value = ""
    }
    if (secondaryFontInputRef.current) {
      secondaryFontInputRef.current.value = ""
    }
  }

  // Funciones para modal de eliminación
  const confirmDeleteFont = (font) => {
    setFontToDelete(font)
    setShowDeleteModal(true)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setFontToDelete(null)
  }

  const confirmDelete = () => {
    if (!fontToDelete) return

    deleteFont(fontToDelete.id)
    setShowDeleteModal(false)
    setFontToDelete(null)
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
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-stone-600 hover:text-stone-800 transition-colors duration-200 text-lg sm:text-xl md:text-2xl lg:text-3xl p-2 rounded-full hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-50"
          aria-label="Volver al panel principal de configuración"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" />
          </svg>
        </Link>
        <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-stone-900 leading-tight">
          Configuración de Fuentes
        </h1>
      </div>

      {/* Vista previa de fuentes */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Vista Previa de Fuentes</h2>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 items-center justify-items-center">
          <div className="text-center w-full px-2">
            <h3
              style={{ fontSize: headlineSize + "px", fontFamily: titleFont }}
              className="font-bold mb-2 transition-all duration-300 ease-in-out text-3xl sm:text-4xl md:text-5xl"
            >
              Título Principal (Fuente Secundaria)
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">Fuente de títulos: {getTitleFontName()}</p>
          </div>

          <div className="text-center w-full px-2">
            <h4
              style={{ fontSize: subtitleSize + "px", fontFamily: bodyFont }}
              className="font-semibold mb-2 transition-all duration-300 ease-in-out text-xl sm:text-2xl md:text-3xl"
            >
              Subtítulo con Fuente Principal
            </h4>
            <p className="text-xs sm:text-sm text-stone-500">Fuente de cuerpo: {getBodyFontName()}</p>
          </div>

          <div className="text-center w-full max-w-xl sm:max-w-2xl px-2">
            <p
              style={{ fontSize: paragraphSize + "px", fontFamily: bodyFont }}
              className="leading-relaxed transition-all duration-300 ease-in-out text-sm sm:text-base md:text-lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">Párrafo usando fuente principal.</p>
          </div>
        </div>
      </div>

      {/* Ajustes de Tamaño */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Ajustes de Tamaño</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <label htmlFor="headlineSize" className="block text-sm font-medium text-stone-600 mb-2">
              Tamaño de Título (px)
            </label>
            <input
              type="number"
              id="headlineSize"
              value={headlineSize}
              onChange={(e) => setHeadlineSize(Number(e.target.value))}
              min="16"
              max="72"
              className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 text-sm shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="subtitleSize" className="block text-sm font-medium text-stone-600 mb-2">
              Tamaño de Subtítulo (px)
            </label>
            <input
              type="number"
              id="subtitleSize"
              value={subtitleSize}
              onChange={(e) => setSubtitleSize(Number(e.target.value))}
              min="12"
              max="48"
              className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 text-sm shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="paragraphSize" className="block text-sm font-medium text-stone-600 mb-2">
              Tamaño de Párrafo (px)
            </label>
            <input
              type="number"
              id="paragraphSize"
              value={paragraphSize}
              onChange={(e) => setParagraphSize(Number(e.target.value))}
              min="10"
              max="24"
              className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Selección de Fuentes del Sistema */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Fuentes del Sistema</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fuentes para Cuerpo */}
          <div>
            <h3 className="text-lg font-semibold text-stone-700 mb-4">Fuente Principal (Cuerpo)</h3>
            <div className="space-y-2">
              <label htmlFor="bodyFontSelect" className="block text-sm font-medium text-stone-600 mb-2">
                Seleccionar fuente para cuerpo
              </label>
              <select
                id="bodyFontSelect"
                value={bodyFont}
                onChange={(e) => setBodyFont(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 text-sm bg-white pr-8 shadow-sm appearance-none"
                style={{
                  backgroundImage: `url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2212%22%20height%3D%227%22%20viewBox%3D%220%200%2012%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%2378716C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "0.75em 0.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {systemFonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
                {customBodyFonts.map((font) => (
                  <option key={font.fontFamily} value={font.fontFamily}>
                    {font.name} (Personalizada)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fuentes para Títulos */}
          <div>
            <h3 className="text-lg font-semibold text-stone-700 mb-4">Fuente Secundaria (Títulos)</h3>
            <div className="space-y-2">
              <label htmlFor="titleFontSelect" className="block text-sm font-medium text-stone-600 mb-2">
                Seleccionar fuente para títulos
              </label>
              <select
                id="titleFontSelect"
                value={titleFont}
                onChange={(e) => setTitleFont(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 text-sm bg-white pr-8 shadow-sm appearance-none"
                style={{
                  backgroundImage: `url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2212%22%20height%3D%227%22%20viewBox%3D%220%200%2012%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201L6%206L11%201%22%20stroke%3D%22%2378716C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "0.75em 0.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {systemFonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
                {customTitleFonts.map((font) => (
                  <option key={font.fontFamily} value={font.fontFamily}>
                    {font.name} (Personalizada)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Subida de Fuentes Personalizadas */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">Subir Fuentes Personalizadas</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fuente Principal (Cuerpo) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-700 text-center">Fuente Principal (Cuerpo)</h3>
            <p className="text-sm text-stone-500 text-center">Se aplicará a subtítulos, párrafos y texto general</p>
            <div className="flex flex-col items-center">
              <label
                htmlFor="primaryFontUpload"
                className="text-sm sm:text-base font-medium text-stone-600 mb-4 bg-blue-50 hover:bg-blue-100 py-4 px-6 rounded-lg cursor-pointer transition-colors duration-200 border-2 border-dashed border-blue-300 w-full text-center"
              >
                <i className="fas fa-upload mr-2"></i> Subir Fuente Principal (.ttf)
              </label>
              <input
                type="file"
                id="primaryFontUpload"
                accept=".ttf"
                onChange={handlePrimaryFontUpload}
                className="hidden"
                ref={primaryFontInputRef}
              />
              {primaryUploadMessage && (
                <p
                  className={`mt-2 text-xs sm:text-sm text-center max-w-sm ${primaryUploadSuccess ? "text-green-600" : "text-red-600"}`}
                >
                  {primaryUploadMessage}
                </p>
              )}
            </div>
          </div>

          {/* Fuente Secundaria (Títulos) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-700 text-center">Fuente Secundaria (Títulos)</h3>
            <p className="text-sm text-stone-500 text-center">Se aplicará únicamente a los títulos principales</p>
            <div className="flex flex-col items-center">
              <label
                htmlFor="secondaryFontUpload"
                className="text-sm sm:text-base font-medium text-stone-600 mb-4 bg-green-50 hover:bg-green-100 py-4 px-6 rounded-lg cursor-pointer transition-colors duration-200 border-2 border-dashed border-green-300 w-full text-center"
              >
                <i className="fas fa-upload mr-2"></i> Subir Fuente Secundaria (.ttf)
              </label>
              <input
                type="file"
                id="secondaryFontUpload"
                accept=".ttf"
                onChange={handleSecondaryFontUpload}
                className="hidden"
                ref={secondaryFontInputRef}
              />
              {secondaryUploadMessage && (
                <p
                  className={`mt-2 text-xs sm:text-sm text-center max-w-sm ${secondaryUploadSuccess ? "text-green-600" : "text-red-600"}`}
                >
                  {secondaryUploadMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Historial de Fuentes */}
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 border border-stone-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-stone-800">
          Historial de Fuentes Personalizadas
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Descripción</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Tipo</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-700">Estado</th>
                <th className="text-center py-3 px-4 font-semibold text-stone-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedFontHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-stone-500">
                    No hay fuentes personalizadas cargadas
                  </td>
                </tr>
              ) : (
                sortedFontHistory.map((font) => (
                  <tr
                    key={font.id}
                    className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${
                      isActiveFontForType(font) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-font text-stone-400"></i>
                        <div>
                          <p className="font-medium text-stone-900">{font.name}</p>
                          <p className="text-sm text-stone-500" style={{ fontFamily: font.fontFamily }}>
                            Vista previa de la fuente
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-stone-600">{font.description}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          font.type === "title" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {font.type === "title" ? "Títulos" : "Cuerpo"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {isActiveFontForType(font) && <i className="fas fa-check-circle text-green-500"></i>}
                        <span
                          className={`text-sm font-medium ${
                            isActiveFontForType(font) ? "text-green-600" : "text-stone-500"
                          }`}
                        >
                          {isActiveFontForType(font) ? "Activa" : "Inactiva"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => selectFont(font)}
                          disabled={isActiveFontForType(font)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            isActiveFontForType(font)
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          <i className="fas fa-check mr-1"></i>
                          {isActiveFontForType(font) ? "Activa" : "Seleccionar"}
                        </button>
                        <button
                          onClick={() => confirmDeleteFont(font)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación para eliminar fuente */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-lg font-medium text-stone-900 mb-4">Confirmar eliminación</h3>
            <p className="text-stone-600 mb-6">
              ¿Realmente desea eliminar la fuente <span className="font-semibold">{fontToDelete?.name}</span>?
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

      {/* Modal de opciones para subir fuente */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <h3 className="text-lg font-medium text-stone-900 mb-2">Opciones de fuente</h3>
            <p className="text-stone-600 mb-6">
              La fuente <span className="font-semibold">{pendingFont?.name}</span> ha sido cargada. ¿Qué desea hacer?
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => applyPendingFont(true)}
                className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-check-circle mr-2"></i>
                Subir y aplicar como fuente activa
              </button>
              <button
                onClick={() => applyPendingFont(false)}
                className="px-4 py-3 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-save mr-2"></i>
                Solo guardar en el historial
              </button>
              <button
                onClick={cancelUpload}
                className="px-4 py-2 text-stone-500 hover:text-stone-700 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-times mr-2"></i>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Fonts
