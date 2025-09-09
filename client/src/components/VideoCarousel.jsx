import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { useColors } from "../contexts/ColorContext"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Import videos
import video1 from "../assets/videos/283533_tiny.mp4"
import video2 from "../assets/videos/286278_tiny.mp4"
import video3 from "../assets/videos/2266-157183287_tiny.mp4"
import video4 from "../assets/videos/5631-183849543_tiny.mp4"
import video5 from "../assets/videos/15305-262921865_tiny.mp4"
import video6 from "../assets/videos/26314-357839024_tiny.mp4"
import video7 from "../assets/videos/26315-357839036_tiny.mp4"
import video8 from "../assets/videos/59291-492700392_tiny.mp4"
import video9 from "../assets/videos/154222-807166890_tiny.mp4"
import video10 from "../assets/videos/154586-808119408_tiny.mp4"

const VideoCarousel = () => {
  const { activePalette, activePaletteId } = useColors()
  const [forceUpdate, setForceUpdate] = useState(0)
  const [swiper, setSwiper] = useState(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)
  const [activeVideos, setActiveVideos] = useState([])
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  // Estado para controlar la carga de miniaturas
  const [loadedThumbnails, setLoadedThumbnails] = useState(new Set())
  const [loadingThumbnails, setLoadingThumbnails] = useState(new Set())

  // Static videos data - in a real app, this would come from an API or props
  const initialVideos = [
    {
      id: "v1",
      url: video1,
      name: "Olas en la orilla",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Hermosas olas rompiendo en la costa",
      category: "Naturaleza"
    },
    {
      id: "v2",
      url: video2,
      name: "Mar en calma al atardecer",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Tranquilo mar al atardecer",
      category: "Naturaleza"
    },
    {
      id: "v3",
      url: video3,
      name: "Video 2266-157183287",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v4",
      url: video4,
      name: "Video 5631-183849543",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v5",
      url: video5,
      name: "Video 15305-262921865",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v6",
      url: video6,
      name: "Video 26314-357839024",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v7",
      url: video7,
      name: "Video 26315-357839036",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v8",
      url: video8,
      name: "Video 59291-492700392",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v9",
      url: video9,
      name: "Video 154222-807166890",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
    {
      id: "v10",
      url: video10,
      name: "Video 154586-808119408",
      thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
      description: "Video destacado",
      category: "General"
    },
  ]

  const [videos, setVideos] = useState(initialVideos)

  const openVideoModal = (video) => {
    setSelectedVideo(video)
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    setSelectedVideo(null)
  }

  const closeAllModals = () => {
    setShowVideoModal(false)
    setSelectedVideo(null)
  }


  // Función para generar una miniatura de un vídeo
  const generateVideoThumbnail = (videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      const canvas = document.createElement("canvas")

      video.src = videoUrl
      video.crossOrigin = "anonymous"

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.currentTime = 1
      }

      video.onseeked = () => {
        const ctx = canvas.getContext("2d")
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL("image/jpeg"))
      }

      video.onerror = () => {
        reject("Error al cargar metadatos del video para generar la miniatura.")
      }
    })
  }

  // Función para cargar miniaturas de video de forma lazy
  const loadVideoThumbnail = async (videoId, videoUrl) => {
    if (loadedThumbnails.has(videoId) || loadingThumbnails.has(videoId)) return

    setLoadingThumbnails(prev => new Set([...prev, videoId]))

    try {
      const thumbnail = await generateVideoThumbnail(videoUrl)

      // Update both activeVideos and the main videos array
      const updateVideo = (video) => video.id === videoId ? { ...video, thumbnail } : video

      setActiveVideos(prevVideos => prevVideos.map(updateVideo))

      // Also update the videos array for when activeVideos is empty
      setVideos(prevVideos => prevVideos.map(updateVideo))

      setLoadedThumbnails(prev => new Set([...prev, videoId]))
    } catch (error) {
      console.error(`Error loading thumbnail for video ${videoId}:`, error)
    } finally {
      setLoadingThumbnails(prev => {
        const newSet = new Set(prev)
        newSet.delete(videoId)
        return newSet
      })
    }
  }

  useEffect(() => {
    // Load video settings from localStorage to get active videos
    const storedVideos = localStorage.getItem('carouselVideos')
    if (storedVideos) {
      const parsedVideos = JSON.parse(storedVideos)
      const activeOnes = parsedVideos.filter(video => video.active)
      setActiveVideos(activeOnes)
    } else {
      // Initialize with all videos active by default
      setActiveVideos(initialVideos)
    }
  }, [])

  // Forzar actualización cuando cambia la paleta
  useEffect(() => {
    if (activePaletteId) {
      setTimeout(() => {
        setForceUpdate(prev => prev + 1)
      }, 50)
    }
  }, [activePaletteId])

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current && paginationRef.current) {
      swiper.params.navigation.prevEl = prevRef.current
      swiper.params.navigation.nextEl = nextRef.current
      swiper.params.pagination.el = paginationRef.current
      swiper.navigation.init()
      swiper.navigation.update()
      swiper.pagination.init()
      swiper.pagination.update()
    }
  }, [swiper])

  return (
    <div
      key={`video-carousel-${forceUpdate}`}
      className="video-carousel-container px-4 lg:px-8 py-16 relative overflow-x-hidden max-w-full"
      style={{ backgroundColor: activePalette?.colors?.neutral || '#F8FAFC' }}
    >
      {/* Título del carrusel */}
      <div className="text-center mb-12">
        <h2
          className="uppercase text-4xl lg:text-5xl font-semibold mb-4"
          style={{ color: activePalette?.colors?.accent || '#44403C' }}
        >
          Featured Videos
        </h2>
        <p
          className="max-w-2xl mx-auto"
          style={{ color: activePalette?.colors?.text || '#78716C' }}
        >
          Explore our most stunning video work through this interactive gallery
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={setSwiper}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          grabCursor={true}
          watchOverflow={true}
          watchSlidesProgress={true}
          watchSlidesVisibility={true}
          preventInteractionOnTransition={true}
          resistance={true}
          resistanceRatio={0.85}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="pb-16"
        >
          {(activeVideos.length > 0 ? activeVideos : videos).map((video, index) => (
            <SwiperSlide key={video.id} className="h-auto">
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer bg-gray-200 transition-transform duration-300 ease-in-out" onClick={() => openVideoModal(video)} onMouseEnter={() => loadVideoThumbnail(video.id, video.url)}>
                <img
                  src={video.thumbnail}
                  alt={video.name}
                  className="w-full h-80 lg:h-96 object-cover"
                  loading="lazy"
                />
                {loadingThumbnails.has(video.id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="rounded-full p-4"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      border: `2px solid ${activePalette?.colors?.secondary || '#ffffff'}`
                    }}
                  >
                    <svg
                      className="w-12 h-12"
                      style={{ color: activePalette?.colors?.secondary || '#ffffff' }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Overlay con información */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    style={{ color: activePalette?.colors?.secondary || '#ffffff' }}
                  >
                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">{video.name}</h3>
                    <p className="text-sm lg:text-base opacity-90">{video.description}</p>
                  </div>
                </div>

                {/* Badge de categoría */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${activePalette?.colors?.secondary || '#ffffff'}e6`,
                    backdropFilter: 'blur(4px)',
                    border: `1px solid ${activePalette?.colors?.neutral || '#d6d3d1'}`
                  }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: activePalette?.colors?.accent || '#44403C' }}
                  >
                    {video.category}
                  </span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Modal de video */}
        {showVideoModal && selectedVideo && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          >
            <div
              className="rounded-lg overflow-hidden shadow-xl max-w-4xl w-full"
              style={{ backgroundColor: activePalette?.colors?.secondary || '#ffffff' }}
            >
              <div
                className="flex justify-between items-center p-4"
                style={{ borderBottom: `1px solid ${activePalette?.colors?.neutral || '#d6d3d1'}` }}
              >
                <h3
                  className="text-xl font-semibold"
                  style={{ color: activePalette?.colors?.accent || '#44403C' }}
                >
                  {selectedVideo.name}
                </h3>
                <button
                  onClick={closeAllModals}
                  className="transition-colors"
                  style={{
                    color: activePalette?.colors?.text || '#78716C',
                    ':hover': { color: activePalette?.colors?.accent || '#44403C' }
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <video
                  src={selectedVideo.url}
                  className="w-full rounded-lg"
                  controls
                  autoPlay
                >
                  <p
                    className="text-stone-500"
                    style={{ color: activePalette?.colors?.text || '#78716C' }}
                  >
                    Tu navegador no soporta el tag de vídeo.
                  </p>
                </video>
                <p
                  className="mt-4"
                  style={{ color: activePalette?.colors?.text || '#78716C' }}
                >
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}


        {/* Navegación personalizada */}
        <div
          ref={prevRef}
          className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 group md:flex"
          style={{
            backgroundColor: `${activePalette?.colors?.secondary || '#ffffff'}e6`,
            backdropFilter: 'blur(4px)'
          }}
        >
          <svg
            className="w-5 h-5 transition-colors"
            style={{
              color: activePalette?.colors?.accent || '#44403C',
              ':hover': { color: activePalette?.colors?.primary || '#57534E' }
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>

        <div
          ref={nextRef}
          className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 group md:flex"
          style={{
            backgroundColor: `${activePalette?.colors?.secondary || '#ffffff'}e6`,
            backdropFilter: 'blur(4px)'
          }}
        >
          <svg
            className="w-5 h-5 transition-colors"
            style={{
              color: activePalette?.colors?.accent || '#44403C',
              ':hover': { color: activePalette?.colors?.primary || '#57534E' }
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        {/* Paginación personalizada */}
        <div ref={paginationRef} className="swiper-pagination-custom flex justify-center mt-8 space-x-2"></div>
      </div>

      {/* Círculo decorativo */}
      <div
        className="h-32 w-32 rounded-full absolute -top-10 -right-10 z-10 opacity-50"
        style={{ backgroundColor: activePalette?.colors?.text || '#78716C' }}
      ></div>

      <style jsx>{`
        .video-carousel-container {
          overflow-x: hidden;
          max-width: 100vw;
        }

        .swiper-slide:not(.swiper-slide-active) {
          transform: scale(0.9);
          opacity: 0.7;
        }

        .swiper-slide-active {
          transform: scale(1);
          opacity: 1;
        }

        :global(.swiper-pagination-custom .swiper-pagination-bullet) {
          background: #d1d5db;
          opacity: 1;
          margin: 0 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        :global(.swiper-pagination-custom .swiper-pagination-bullet:hover) {
          background: #6b7280;
        }

        :global(.swiper-pagination-custom .swiper-pagination-bullet-active) {
          background: #374151;
          transform: scale(1.2);
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: translateY(-50%) scale(1.1);
        }

        @media (max-width: 768px) {
          .video-carousel-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default VideoCarousel