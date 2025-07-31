import { useState } from "react"
import { Link } from "react-router-dom"
import photographerImage from "../../assets/image.jpg"

const Multimedia = () => {
  // Estados principales
  const [activeTab, setActiveTab] = useState("videos")
  const [videos, setVideos] = useState([])
  const [images, setImages] = useState([])
  const [error, setError] = useState("")

  // Estados para modales
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  // Estados para formularios
  const [videoForm, setVideoForm] = useState({
    name: "",
    file: null,
    format: "",
    duration: "",
    size: 0,
    description: "",
    audioTracks: [
      { name: "Pista Principal", language: "es", duration: "" },
      { name: "Pista Secundaria", language: "en", duration: "" },
    ],
    subtitles: [
      { name: "Español", language: "es", file: null },
      { name: "Inglés", language: "en", file: null },
    ],
  })

  const [imageForm, setImageForm] = useState({
    name: "",
    file: null,
    format: "",
    size: 0,
    dimensions: { width: 0, height: 0 },
    description: "",
  })

  // Estados para validación
  const [videoErrors, setVideoErrors] = useState({})
  const [imageErrors, setImageErrors] = useState({})

  // Función para obtener información del archivo de video
  const getVideoInfo = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        const duration = Math.round((video.duration / 60) * 100) / 100 // en minutos
        const format = file.name.split(".").pop().toUpperCase()
        const size = Math.round((file.size / (1024 * 1024)) * 100) / 100 // en MB

        resolve({ duration, format, size })
      }

      video.src = URL.createObjectURL(file)
    })
  }

  // Función para obtener información de la imagen
  const getImageInfo = (file) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const format = file.name.split(".").pop().toUpperCase()
        const size = Math.round((file.size / (1024 * 1024)) * 100) / 100 // en MB
        const dimensions = { width: img.width, height: img.height }

        resolve({ format, size, dimensions })
      }
      img.src = URL.createObjectURL(file)
    })
  }

  // Manejar selección de archivo de video
  const handleVideoFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar formato de video
    const allowedFormats = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
    const fileExtension = file.name.split(".").pop().toLowerCase()

    if (!allowedFormats.includes(fileExtension)) {
      setVideoErrors({ file: "Formato de video no válido. Formatos permitidos: MP4, AVI, MOV, WMV, FLV, WEBM" })
      return
    }

    try {
      const videoInfo = await getVideoInfo(file)
      setVideoForm((prev) => ({
        ...prev,
        file,
        format: videoInfo.format,
        duration: videoInfo.duration.toString(),
        size: videoInfo.size,
        audioTracks: prev.audioTracks.map((track) => ({
          ...track,
          duration: videoInfo.duration.toString(),
        })),
      }))
      setVideoErrors({})
    } catch (error) {
      setVideoErrors({ file: "Error al procesar el archivo de video" })
    }
  }

  // Manejar selección de archivo de imagen
  const handleImageFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validar formato de imagen
    const allowedFormats = ["jpg", "jpeg", "png"]
    const fileExtension = file.name.split(".").pop().toLowerCase()

    if (!allowedFormats.includes(fileExtension)) {
      setImageErrors({ file: "Formato de imagen no válido. Formatos permitidos: JPG, PNG" })
      return
    }

    try {
      const imageInfo = await getImageInfo(file)
      setImageForm((prev) => ({
        ...prev,
        file,
        format: imageInfo.format,
        size: imageInfo.size,
        dimensions: imageInfo.dimensions,
      }))
      setImageErrors({})
    } catch (error) {
      setImageErrors({ file: "Error al procesar el archivo de imagen" })
    }
  }

  // Validar formulario de video
  const validateVideoForm = () => {
    const errors = {}

    if (!videoForm.name.trim()) {
      errors.name = "El nombre es obligatorio"
    }

    if (!videoForm.file) {
      errors.file = "Debe seleccionar un archivo de video"
    }

    // Validar pistas de audio
    videoForm.audioTracks.forEach((track, index) => {
      if (!track.name.trim()) {
        errors[`audioTrack_${index}_name`] = "El nombre de la pista es obligatorio"
      }
      if (!track.duration || Number.parseFloat(track.duration) <= 0) {
        errors[`audioTrack_${index}_duration`] = "La duración debe ser mayor a 0"
      }
      if (
        videoForm.duration &&
        Math.abs(Number.parseFloat(track.duration) - Number.parseFloat(videoForm.duration)) > 0.1
      ) {
        errors[`audioTrack_${index}_duration`] = "La duración debe coincidir con el video"
      }
    })

    // Validar subtítulos
    videoForm.subtitles.forEach((subtitle, index) => {
      if (!subtitle.name.trim()) {
        errors[`subtitle_${index}_name`] = "El nombre del subtítulo es obligatorio"
      }
      if (!subtitle.file) {
        errors[`subtitle_${index}_file`] = "Debe seleccionar un archivo de subtítulo"
      }
    })

    setVideoErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Validar formulario de imagen
  const validateImageForm = () => {
    const errors = {}

    if (!imageForm.name.trim()) {
      errors.name = "El nombre es obligatorio"
    }

    if (!imageForm.file) {
      errors.file = "Debe seleccionar un archivo de imagen"
    }

    setImageErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Funciones para manejar pistas de audio
  const addAudioTrack = () => {
    setVideoForm((prev) => ({
      ...prev,
      audioTracks: [...prev.audioTracks, { name: "", language: "es", duration: prev.duration }],
    }))
  }

  const removeAudioTrack = (index) => {
    if (videoForm.audioTracks.length <= 2) return // Mínimo 2 pistas

    setVideoForm((prev) => ({
      ...prev,
      audioTracks: prev.audioTracks.filter((_, i) => i !== index),
    }))
  }

  const updateAudioTrack = (index, field, value) => {
    setVideoForm((prev) => ({
      ...prev,
      audioTracks: prev.audioTracks.map((track, i) => (i === index ? { ...track, [field]: value } : track)),
    }))
  }

  // Funciones para manejar subtítulos
  const addSubtitle = () => {
    setVideoForm((prev) => ({
      ...prev,
      subtitles: [...prev.subtitles, { name: "", language: "es", file: null }],
    }))
  }

  const removeSubtitle = (index) => {
    if (videoForm.subtitles.length <= 2) return // Mínimo 2 subtítulos

    setVideoForm((prev) => ({
      ...prev,
      subtitles: prev.subtitles.filter((_, i) => i !== index),
    }))
  }

  const updateSubtitle = (index, field, value) => {
    setVideoForm((prev) => ({
      ...prev,
      subtitles: prev.subtitles.map((subtitle, i) => (i === index ? { ...subtitle, [field]: value } : subtitle)),
    }))
  }

  const handleSubtitleFileSelect = (index, file) => {
    if (!file) return

    // Validar formato de subtítulo
    const allowedFormats = ["srt", "vtt", "ass"]
    const fileExtension = file.name.split(".").pop().toLowerCase()

    if (!allowedFormats.includes(fileExtension)) {
      setVideoErrors((prev) => ({
        ...prev,
        [`subtitle_${index}_file`]: "Formato no válido. Formatos permitidos: SRT, VTT, ASS",
      }))
      return
    }

    updateSubtitle(index, "file", file)

    // Limpiar error si existía
    setVideoErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[`subtitle_${index}_file`]
      return newErrors
    })
  }

  // Funciones para guardar
  const handleSaveVideo = () => {
    if (!validateVideoForm()) return

    // Simular guardado exitoso
    const newVideo = {
      id: Date.now(),
      ...videoForm,
      createdAt: new Date(),
    }

    setVideos((prev) => [...prev, newVideo])
    setShowVideoModal(false)
    resetVideoForm()
  }

  const handleSaveImage = () => {
    if (!validateImageForm()) return

    // Simular guardado exitoso
    const newImage = {
      id: Date.now(),
      ...imageForm,
      createdAt: new Date(),
    }

    setImages((prev) => [...prev, newImage])
    setShowImageModal(false)
    resetImageForm()
  }

  // Funciones para resetear formularios
  const resetVideoForm = () => {
    setVideoForm({
      name: "",
      file: null,
      format: "",
      duration: "",
      size: 0,
      description: "",
      audioTracks: [
        { name: "Pista Principal", language: "es", duration: "" },
        { name: "Pista Secundaria", language: "en", duration: "" },
      ],
      subtitles: [
        { name: "Español", language: "es", file: null },
        { name: "Inglés", language: "en", file: null },
      ],
    })
    setVideoErrors({})
  }

  const resetImageForm = () => {
    setImageForm({
      name: "",
      file: null,
      format: "",
      size: 0,
      dimensions: { width: 0, height: 0 },
      description: "",
    })
    setImageErrors({})
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
          Gestión Multimedia
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700">{error}</p>
            <button onClick={() => setError("")} className="ml-auto text-red-500 hover:text-red-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8 border border-stone-200">
        <div className="border-b border-stone-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("videos")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "videos"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Videos ({videos.length})
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "images"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Imágenes ({images.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "videos" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-stone-900">Gestión de Videos</h2>
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Subir Video</span>
                </button>
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">No hay videos subidos</p>
                  <p className="text-gray-400 text-sm">Sube tu primer video para comenzar</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div key={video.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-stone-900 truncate">{video.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Formato:</span> {video.format}
                        </p>
                        <p>
                          <span className="font-medium">Duración:</span> {video.duration} min
                        </p>
                        <p>
                          <span className="font-medium">Tamaño:</span> {video.size} MB
                        </p>
                        <p>
                          <span className="font-medium">Pistas de Audio:</span> {video.audioTracks.length}
                        </p>
                        <p>
                          <span className="font-medium">Subtítulos:</span> {video.subtitles.length}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "images" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-stone-900">Gestión de Imágenes</h2>
                <button
                  onClick={() => setShowImageModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Subir Imagen</span>
                </button>
              </div>

              {images.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">No hay imágenes subidas</p>
                  <p className="text-gray-400 text-sm">Sube tu primera imagen para comenzar</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {images.map((image) => (
                    <div key={image.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-stone-900 truncate">{image.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Formato:</span> {image.format}
                        </p>
                        <p>
                          <span className="font-medium">Tamaño:</span> {image.size} MB
                        </p>
                        <p>
                          <span className="font-medium">Dimensiones:</span> {image.dimensions.width}x
                          {image.dimensions.height}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal para subir video */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Subir Video</h2>
                <button
                  onClick={() => {
                    setShowVideoModal(false)
                    resetVideoForm()
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información básica del video */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Video <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={videoForm.name}
                    onChange={(e) => setVideoForm((prev) => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      videoErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ej: Video Promocional 2024"
                  />
                  {videoErrors.name && <p className="text-red-500 text-sm mt-1">{videoErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Archivo de Video <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileSelect}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      videoErrors.file ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {videoErrors.file && <p className="text-red-500 text-sm mt-1">{videoErrors.file}</p>}
                  <p className="text-xs text-gray-500 mt-1">Formatos permitidos: MP4, AVI, MOV, WMV, FLV, WEBM</p>
                </div>
              </div>

              {videoForm.file && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Formato:</span>
                    <p className="text-sm text-gray-900">{videoForm.format}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Duración:</span>
                    <p className="text-sm text-gray-900">{videoForm.duration} minutos</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Tamaño:</span>
                    <p className="text-sm text-gray-900">{videoForm.size} MB</p>
                  </div>
                </div>
              )}

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción (Opcional)</label>
                <textarea
                  value={videoForm.description}
                  onChange={(e) => setVideoForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe brevemente el contenido del video..."
                />
              </div>

              {/* Pistas de Audio */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Pistas de Audio</h3>
                  <button
                    onClick={addAudioTrack}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Agregar Pista
                  </button>
                </div>

                <div className="space-y-4">
                  {videoForm.audioTracks.map((track, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900">Pista {index + 1}</h4>
                        {videoForm.audioTracks.length > 2 && (
                          <button
                            onClick={() => removeAudioTrack(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={track.name}
                            onChange={(e) => updateAudioTrack(index, "name", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              videoErrors[`audioTrack_${index}_name`] ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Ej: Pista Principal"
                          />
                          {videoErrors[`audioTrack_${index}_name`] && (
                            <p className="text-red-500 text-sm mt-1">{videoErrors[`audioTrack_${index}_name`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                          <select
                            value={track.language}
                            onChange={(e) => updateAudioTrack(index, "language", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="es">Español</option>
                            <option value="en">Inglés</option>
                            <option value="fr">Francés</option>
                            <option value="de">Alemán</option>
                            <option value="it">Italiano</option>
                            <option value="pt">Portugués</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duración (min) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={track.duration}
                            onChange={(e) => updateAudioTrack(index, "duration", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              videoErrors[`audioTrack_${index}_duration`] ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="0.00"
                          />
                          {videoErrors[`audioTrack_${index}_duration`] && (
                            <p className="text-red-500 text-sm mt-1">{videoErrors[`audioTrack_${index}_duration`]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtítulos */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Subtítulos</h3>
                  <button
                    onClick={addSubtitle}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    + Agregar Subtítulo
                  </button>
                </div>

                <div className="space-y-4">
                  {videoForm.subtitles.map((subtitle, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900">Subtítulo {index + 1}</h4>
                        {videoForm.subtitles.length > 2 && (
                          <button
                            onClick={() => removeSubtitle(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={subtitle.name}
                            onChange={(e) => updateSubtitle(index, "name", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              videoErrors[`subtitle_${index}_name`] ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Ej: Español"
                          />
                          {videoErrors[`subtitle_${index}_name`] && (
                            <p className="text-red-500 text-sm mt-1">{videoErrors[`subtitle_${index}_name`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                          <select
                            value={subtitle.language}
                            onChange={(e) => updateSubtitle(index, "language", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="es">Español</option>
                            <option value="en">Inglés</option>
                            <option value="fr">Francés</option>
                            <option value="de">Alemán</option>
                            <option value="it">Italiano</option>
                            <option value="pt">Portugués</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Archivo <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="file"
                            accept=".srt,.vtt,.ass"
                            onChange={(e) => handleSubtitleFileSelect(index, e.target.files[0])}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              videoErrors[`subtitle_${index}_file`] ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {videoErrors[`subtitle_${index}_file`] && (
                            <p className="text-red-500 text-sm mt-1">{videoErrors[`subtitle_${index}_file`]}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Formatos: SRT, VTT, ASS</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowVideoModal(false)
                  resetVideoForm()
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveVideo}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Guardar Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para subir imagen */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Subir Imagen</h2>
                <button
                  onClick={() => {
                    setShowImageModal(false)
                    resetImageForm()
                  }}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información básica de la imagen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Imagen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={imageForm.name}
                    onChange={(e) => setImageForm((prev) => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      imageErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ej: Logo Empresa 2024"
                  />
                  {imageErrors.name && <p className="text-red-500 text-sm mt-1">{imageErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Archivo de Imagen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageFileSelect}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      imageErrors.file ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {imageErrors.file && <p className="text-red-500 text-sm mt-1">{imageErrors.file}</p>}
                  <p className="text-xs text-gray-500 mt-1">Formatos permitidos: JPG, PNG</p>
                </div>
              </div>

              {imageForm.file && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Formato:</span>
                    <p className="text-sm text-gray-900">{imageForm.format}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Tamaño:</span>
                    <p className="text-sm text-gray-900">{imageForm.size} MB</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Dimensiones:</span>
                    <p className="text-sm text-gray-900">
                      {imageForm.dimensions.width}x{imageForm.dimensions.height}
                    </p>
                  </div>
                </div>
              )}

              {/* Descripción adicional */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción (Opcional)</label>
                <textarea
                  value={imageForm.description}
                  onChange={(e) => setImageForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Describe brevemente el contenido de la imagen..."
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowImageModal(false)
                  resetImageForm()
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveImage}
                disabled={!imageForm.name || !imageForm.file}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guardar Imagen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Multimedia
