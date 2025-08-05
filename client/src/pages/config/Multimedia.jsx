import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ImageCropper from "../../components/ImageCropper";
import VideoUploader from "../../components/VideoUploader";
import ConfigHeader from "../../components/ConfigHeader";
import weddingImg from "../../assets/carousel/wedding.webp";
import portraitImg from "../../assets/carousel/horses.webp";
import landscapeImg from "../../assets/carousel/landscape.webp";

// Importa los nuevos vídeos desde la carpeta assets
import video1 from "../../assets/videos/283533_tiny.mp4";
import video2 from "../../assets/videos/286278_tiny.mp4";

// Importa los nuevos archivos de subtítulos
import video1_es_vtt from "../../assets/subtitles/waves_es.vtt";
import video1_en_vtt from "../../assets/subtitles/waves_en.vtt";
import video2_es_vtt from "../../assets/subtitles/sea_es.vtt";
import video2_en_vtt from "../../assets/subtitles/sea_en.vtt";


const STATIC_VIDEOS = [
  { 
    id: "v1", 
    url: video1, 
    name: "Olas en la orilla",
    subtitles: [
      { src: video1_es_vtt, srclang: 'es', label: 'Español' },
      { src: video1_en_vtt, srclang: 'en', label: 'Inglés' },
    ]
  },
  { 
    id: "v2", 
    url: video2, 
    name: "Mar en calma al atardecer",
    subtitles: [
      { src: video2_es_vtt, srclang: 'es', label: 'Español' },
      { src: video2_en_vtt, srclang: 'en', label: 'Inglés' },
    ]
  },
];

const initialImages = [
  {
    id: "i3",
    url: landscapeImg,
    name: "Paisaje con Montañas",
    dimensions: "",
    size: "",
    format: "",
  },
  {
    id: "i1",
    url: portraitImg,
    name: "Retrato de Caballos",
    dimensions: "",
    size: "",
    format: "",
  },
];

const Multimedia = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [videos, setVideos] = useState([]); // Inicialmente vacío, se llenará con los datos correctos
  const [images, setImages] = useState(initialImages);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userRole, setUserRole] = useState("admin");

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedMediaForAnalytics, setSelectedMediaForAnalytics] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const videoPlayerRef = useRef(null);

  // Función para generar una miniatura de un vídeo
  const generateVideoThumbnail = (videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 1;
      };

      video.onseeked = () => {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      
      video.onerror = () => {
        reject("Error al cargar metadatos del video para generar la miniatura.");
      };
    });
  };

  // Función para obtener metadatos de un vídeo y sus subtítulos
  const fetchVideoProperties = async (videoItem) => {
    try {
      const videoUrl = new URL(videoItem.url, window.location.origin).href;
      
      const video = document.createElement("video");
      video.src = videoUrl;
      
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = () => reject("Error al cargar metadatos del video.");
      });
      
      const dimensions = `${video.videoWidth} x ${video.videoHeight} px`;
      const format = videoUrl.split(".").pop().toUpperCase() || "N/A";
      
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);

      const thumbnail = await generateVideoThumbnail(videoUrl);

      return {
        ...videoItem,
        thumbnail: thumbnail,
        dimensions: dimensions,
        size: `${sizeInMB} MB`,
        format: format,
        views: Math.floor(Math.random() * 5000),
        uniqueViews: Math.floor(Math.random() * 2000),
      };

    } catch (error) {
      console.error("Error en fetchVideoProperties:", error);
      return {
        ...videoItem,
        thumbnail: "https://placehold.co/300x200?text=Error",
        dimensions: "N/A",
        size: "N/A",
        format: "N/A",
        views: 0,
        uniqueViews: 0,
        subtitles: [],
      };
    }
  };

  // Función para obtener metadatos de una imagen
  const fetchImageProperties = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const sizeInKB = (blob.size / 1024).toFixed(2);
      const format = blob.type.split('/')[1].toUpperCase();

      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            size: `${sizeInKB} KB`,
            dimensions: `${img.width} x ${img.height} px`,
            format: format,
          });
        };
        img.onerror = () => resolve({ size: "N/A", dimensions: "N/A", format: "N/A" });
        img.src = url;
      });
    } catch (e) {
      console.error("Error al obtener las propiedades del archivo:", e);
      return { size: "N/A", dimensions: "N/A", format: "N/A" };
    }
  };


  useEffect(() => {
    const processMedia = async () => {
      // Cargar propiedades de las imágenes
      const propertiesWedding = await fetchImageProperties(weddingImg);
      const propertiesPortrait = await fetchImageProperties(portraitImg);
      const propertiesLandscape = await fetchImageProperties(landscapeImg);

      const weddingImageObject = {
        id: "i2",
        url: weddingImg,
        name: "Foto de Boda",
        ...propertiesWedding,
      };

      const portraitImageObject = {
        id: "i1",
        url: portraitImg,
        name: "Retrato de Caballos",
        ...propertiesPortrait,
      };

      const landscapeImageObject = {
        id: "i3",
        url: landscapeImg,
        name: "Paisaje con Montañas",
        ...propertiesLandscape,
      };

      setImages([weddingImageObject, portraitImageObject, landscapeImageObject]);

      // Cargar propiedades de los vídeos estáticos
      const processedVideos = await Promise.all(
        STATIC_VIDEOS.map(video => fetchVideoProperties(video))
      );
      setVideos(processedVideos);

      setLoading(false);
    };

    processMedia();
  }, []);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };
  
  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const closeAllModals = () => {
    setShowVideoModal(false);
    setShowImageModal(false);
    setShowAnalyticsModal(false);
    setShowImageCropper(false);
    setShowVideoUploader(false);
    setSelectedMediaForAnalytics(null);
  };

  const onAnalyticsClick = (item) => {
    setSelectedMediaForAnalytics(item);
    setAnalyticsData({
      totalViews: item.views || Math.floor(Math.random() * 5000),
      uniqueViews: item.uniqueViews || Math.floor(Math.random() * 2000),
      engagementRate: Math.random(),
    });
    setShowAnalyticsModal(true);
  };

  const handleImageCrop = (croppedImage) => {
    const newImage = {
      ...croppedImage,
      id: `img-${Date.now()}`,
    };
    setImages([newImage, ...images]);
  };

  const handleVideoUpload = (newVideo) => {
    setVideos([newVideo, ...videos]);
  };

  const filteredMedia = (activeTab === "videos" ? videos : images)
    .filter((media) =>
      media.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") return b.id.localeCompare(a.id);
      if (sortOrder === "oldest") return a.id.localeCompare(b.id);
      return 0;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative min-h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-stone-50 to-stone-200 text-stone-800 font-sans">
      <div className="relative z-10 w-full max-w-full mx-auto">
        <ConfigHeader title="Gestión de Multimedia" />
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
        {loading && <div className="text-stone-500 mb-4">Cargando...</div>}

        <div className="mb-6 border-b border-stone-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("videos")}
              className={`${activeTab === "videos" ? "border-stone-700 text-stone-900" : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"} whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`${activeTab === "images" ? "border-stone-700 text-stone-900" : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"} whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200`}
            >
              Imágenes
            </button>
          </nav>
        </div>

        {activeTab === "videos" && (
          <>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowVideoUploader(true)}
                className="bg-stone-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-stone-800 transition-colors"
              >
                Subir Nuevo Vídeo
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-stone-200 transition-transform duration-200 hover:scale-105">
                    <div className="relative group">
                      <img src={item.thumbnail} alt={item.name} className="w-full h-48 object-cover" />
                      <div
                        className="absolute inset-0 bg-stone-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        onClick={() => openVideoModal(item)}
                      >
                        <span className="text-white text-lg font-bold">Ver</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-800 truncate">{item.name}</h3>
                      <div className="text-sm text-stone-600 mt-2">
                        <p>Dimensiones: <span className="font-medium text-stone-700">{item.dimensions || "N/A"}</span></p>
                        <p>Tamaño: <span className="font-medium text-stone-700">{item.size || "N/A"}</span></p>
                        <p>Formato: <span className="font-medium text-stone-700">{item.format || "N/A"}</span></p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="md:col-span-4 text-center py-10 text-stone-500">No se encontraron videos.</p>
              )}
            </div>
          </>
        )}

        {activeTab === "images" && (
          <>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setShowImageCropper(true)}
                className="bg-stone-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-stone-800 transition-colors"
              >
                Subir y Recortar Nueva Imagen
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-stone-800 mb-4 mt-12">Galería de Imágenes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.length > 0 ? (
                images.map((item) => (
                  <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 border border-stone-200">
                    <div className="relative group">
                      <img
                        className="w-full h-48 object-cover"
                        src={item.url}
                        alt={item.name}
                      />
                      <div
                        className="absolute inset-0 bg-stone-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        onClick={() => openImageModal(item)}
                      >
                        <span className="text-white text-lg font-bold">Ver</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-800 truncate">{item.name}</h3>
                      <div className="text-sm text-stone-600 mt-2">
                          <p>Dimensiones: <span className="font-medium text-stone-700">{item.dimensions}</span></p>
                          <p>Tamaño: <span className="font-medium text-stone-700">{item.size}</span></p>
                          <p>Formato: <span className="font-medium text-stone-700">{item.format}</span></p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-4 text-center py-10 text-stone-500">
                  <p>No se encontraron imágenes en la galería.</p>
                </div>
              )}
            </div>
          </>
        )}

        {showImageCropper && (
          <ImageCropper onImageCrop={handleImageCrop} onClose={closeAllModals} />
        )}

        {showVideoUploader && (
          <VideoUploader onVideoUpload={handleVideoUpload} onClose={closeAllModals} />
        )}

        {showVideoModal && selectedVideo && (
          <div className="fixed inset-0 bg-stone-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-4xl w-full">
              <div className="flex justify-between items-center p-4 border-b border-stone-200">
                <h3 className="text-xl font-semibold text-stone-800">{selectedVideo.name}</h3>
                <button onClick={closeAllModals} className="text-stone-400 hover:text-stone-600">
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
                  {/* Se añaden las pistas de subtítulos */}
                  {selectedVideo.subtitles && selectedVideo.subtitles.map((track, index) => (
                    <track
                      key={index}
                      kind="subtitles"
                      src={track.src}
                      srcLang={track.srclang}
                      label={track.label}
                      default={track.srclang === 'es'}
                    />
                  ))}
                  <p className="text-stone-500">Tu navegador no soporta el tag de vídeo.</p>
                </video>
              </div>
            </div>
          </div>
        )}

        {showImageModal && selectedImage && (
          <div className="fixed inset-0 bg-stone-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
              <div className="flex justify-between items-center p-4 border-b border-stone-200">
                <h3 className="text-xl font-semibold text-stone-800">{selectedImage.name}</h3>
                <button onClick={closeAllModals} className="text-stone-400 hover:text-stone-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <img src={selectedImage.url} alt={selectedImage.name} className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multimedia;