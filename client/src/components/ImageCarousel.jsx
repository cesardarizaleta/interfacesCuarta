import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// Import carousel images
import weddingImg from "../assets/carousel/wedding.webp"
import portraitImg from "../assets/carousel/horses.webp"
import landscapeImg from "../assets/carousel/landscape.webp"
import eventsImg from "../assets/carousel/events.webp"
import fashionImg from "../assets/carousel/fashion.webp"
import familyImg from "../assets/carousel/family.webp"

const ImageCarousel = () => {
  const [swiper, setSwiper] = useState(null)
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const paginationRef = useRef(null)

  const images = [
    {
      src: weddingImg || "/placeholder.svg?height=400&width=600",
      alt: "Wedding Photography 1",
      title: "Romantic Wedding",
      description: "Beautiful moments captured on their special day",
      category: "Wedding",
    },
    {
      src: portraitImg || "/placeholder.svg?height=400&width=600",
      alt: "Portrait Photography",
      title: "Professional Portrait",
      description: "Stunning professional headshots and portraits",
      category: "Portrait",
    },
    {
      src: landscapeImg || "/placeholder.svg?height=400&width=600",
      alt: "Landscape Photography",
      title: "Nature Landscape",
      description: "Breathtaking natural landscapes and scenery",
      category: "Landscape",
    },
    {
      src: eventsImg || "/placeholder.svg?height=400&width=600",
      alt: "Event Photography",
      title: "Corporate Event",
      description: "Professional event and corporate photography",
      category: "Events",
    },
    {
      src: fashionImg || "/placeholder.svg?height=400&width=600",
      alt: "Fashion Photography",
      title: "Fashion Shoot",
      description: "High-end fashion and lifestyle photography",
      category: "Fashion",
    },
    {
      src: familyImg || "/placeholder.svg?height=400&width=600",
      alt: "Family Photography",
      title: "Family Moments",
      description: "Precious family memories captured forever",
      category: "Family",
    },
  ]

  const handleImageError = (event) => {
    // Fallback en caso de error de imagen
    event.target.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zOTkuNSAyMDBMMzUwIDI1MEg0NTBMMzk5LjUgMjAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K"
  }

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
    <div className="image-carousel-container px-4 lg:px-8 py-16 relative overflow-x-hidden max-w-full">
      {/* Título del carrusel */}
      <div className="text-center mb-12">
        <h2 className="uppercase text-4xl lg:text-5xl font-semibold mb-4 text-stone-800">Featured Gallery</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          Explore our most stunning photography work through this interactive gallery
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
            delay: 5000,
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
          {images.map((image, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer bg-gray-200 transition-transform duration-300 ease-in-out">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={handleImageError}
                />

                {/* Overlay con información */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl lg:text-2xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm lg:text-base opacity-90">{image.description}</p>
                  </div>
                </div>

                {/* Badge de categoría */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-800">{image.category}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegación personalizada */}
        <div
          ref={prevRef}
          className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-white transition-all duration-300 group hidden md:flex"
        >
          <svg
            className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </div>

        <div
          ref={nextRef}
          className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-white transition-all duration-300 group hidden md:flex"
        >
          <svg
            className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors"
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
      <div className="bg-neutral-200 h-32 w-32 rounded-full absolute -top-10 -right-10 -z-10 opacity-50"></div>

      <style jsx>{`
        .image-carousel-container {
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
          .image-carousel-container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default ImageCarousel
