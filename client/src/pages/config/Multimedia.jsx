import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ImageCropper from "../../components/ImageCropper";
import VideoUploader from "../../components/VideoUploader";
import ConfigHeader from "../../components/ConfigHeader";
import weddingImg from "../../assets/carousel/wedding.webp";
import portraitImg from "../../assets/carousel/horses.webp";
import landscapeImg from "../../assets/carousel/landscape.webp";
import eventsImg from "../../assets/carousel/events.webp";
import fashionImg from "../../assets/carousel/fashion.webp";
import familyImg from "../../assets/carousel/family.webp";
import climbImg from "../../assets/carousel/climb.webp";
import landscapeWaterImg from "../../assets/carousel/landscapeWater.webp";
import mountainClimbingImg from "../../assets/carousel/mountain-climbing.webp";
import veneciaImg from "../../assets/carousel/venecia.webp";
import EditSubtitlesModal from "../../components/EditSubtitlesModal";

// Importa los nuevos vídeos desde la carpeta assets
import video1 from "../../assets/videos/283533_tiny.mp4";
import video2 from "../../assets/videos/286278_tiny.mp4";
import video3 from "../../assets/videos/2266-157183287_tiny.mp4";
import video4 from "../../assets/videos/5631-183849543_tiny.mp4";
import video5 from "../../assets/videos/15305-262921865_tiny.mp4";
import video6 from "../../assets/videos/26314-357839024_tiny.mp4";
import video7 from "../../assets/videos/26315-357839036_tiny.mp4";
import video8 from "../../assets/videos/59291-492700392_tiny.mp4";
import video9 from "../../assets/videos/154222-807166890_tiny.mp4";
import video10 from "../../assets/videos/154586-808119408_tiny.mp4";

// Importa los nuevos archivos de audio
import audio1 from "../../assets/sound/waves.mp3";
import audio2 from "../../assets/sound/sea.mp3";

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
    ],
    audioTracks: [
      { id: "a1_orig", src: video1, srclang: "orig", label: "Audio Original" },
      { id: "a1_es", src: audio1, srclang: "es", label: "Olas" },
    ]
  },
  {
    id: "v2",
    url: video2,
    name: "Mar en calma al atardecer",
    subtitles: [
      { src: video2_es_vtt, srclang: 'es', label: 'Español' },
      { src: video2_en_vtt, srclang: 'en', label: 'Inglés' },
    ],
    audioTracks: [
      { id: "a2_orig", src: video2, srclang: "orig", label: "Audio Original" },
      { id: "a2_en", src: audio2, srclang: "en", label: "Mar en calma" },
    ]
  },
  {
    id: "v3",
    url: video3,
    name: "Video 2266-157183287",
    subtitles: [],
    audioTracks: [
      { id: "a3_orig", src: video3, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v4",
    url: video4,
    name: "Video 5631-183849543",
    subtitles: [],
    audioTracks: [
      { id: "a4_orig", src: video4, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v5",
    url: video5,
    name: "Video 15305-262921865",
    subtitles: [],
    audioTracks: [
      { id: "a5_orig", src: video5, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v6",
    url: video6,
    name: "Video 26314-357839024",
    subtitles: [],
    audioTracks: [
      { id: "a6_orig", src: video6, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v7",
    url: video7,
    name: "Video 26315-357839036",
    subtitles: [],
    audioTracks: [
      { id: "a7_orig", src: video7, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v8",
    url: video8,
    name: "Video 59291-492700392",
    subtitles: [],
    audioTracks: [
      { id: "a8_orig", src: video8, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v9",
    url: video9,
    name: "Video 154222-807166890",
    subtitles: [],
    audioTracks: [
      { id: "a9_orig", src: video9, srclang: "orig", label: "Audio Original" }
    ]
  },
  {
    id: "v10",
    url: video10,
    name: "Video 154586-808119408",
    subtitles: [],
    audioTracks: [
      { id: "a10_orig", src: video10, srclang: "orig", label: "Audio Original" }
    ]
  },
];

const initialImages = [
  {
    id: "i1",
    url: weddingImg,
    name: "Foto de Boda",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i2",
    url: portraitImg,
    name: "Retrato de Caballos",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i3",
    url: landscapeImg,
    name: "Paisaje con Montañas",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i4",
    url: eventsImg,
    name: "Evento Corporativo",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i5",
    url: fashionImg,
    name: "Fotografía de Moda",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i6",
    url: familyImg,
    name: "Fotografía Familiar",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i7",
    url: climbImg,
    name: "Escalada de Aventura",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i8",
    url: landscapeWaterImg,
    name: "Paisaje con Agua",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i9",
    url: mountainClimbingImg,
    name: "Escalada en Montaña",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
  {
    id: "i10",
    url: veneciaImg,
    name: "Canales de Venecia",
    dimensions: "",
    size: "",
    format: "",
    active: true,
  },
];

const Multimedia = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [videos, setVideos] = useState([]); // Inicialmente vacío, se llenará con los datos correctos
  const [images, setImages] = useState(initialImages);
  const [videoCarouselSettings, setVideoCarouselSettings] = useState([]);
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
  
  const [selectedAudioSrc, setSelectedAudioSrc] = useState(null);

  // Nuevos estados para la edición de subtítulos
  const [showEditSubtitlesModal, setShowEditSubtitlesModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  // Estado para controlar la carga de miniaturas
  const [loadedThumbnails, setLoadedThumbnails] = useState(new Set());
  const [loadingThumbnails, setLoadingThumbnails] = useState(new Set());

  const videoPlayerRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const videoDurationRef = useRef(0);
  
  // Estado para manejar el audio original del video
  const [isOriginalAudioMuted, setIsOriginalAudioMuted] = useState(false);


  useEffect(() => {
    // Sincronizar la reproducción del video y el audio
    const video = videoPlayerRef.current;
    const audio = audioPlayerRef.current;

    const syncPlayback = () => {
        if (audio && !audio.paused && !video.paused) {
            // Asegurarse de que el audio se mantenga sincronizado
            if (Math.abs(video.currentTime - audio.currentTime) > 0.5) {
                audio.currentTime = video.currentTime;
            }
        }
    };
    
    // Event listeners para la sincronización
    if (video && audio) {
        video.addEventListener('play', () => audio.play());
        video.addEventListener('pause', () => audio.pause());
        video.addEventListener('seeked', syncPlayback);
        return () => {
            video.removeEventListener('play', () => audio.play());
            video.removeEventListener('pause', () => audio.pause());
            video.removeEventListener('seeked', syncPlayback);
        }
    }
  }, [selectedAudioSrc, showVideoModal]);


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
      // Check localStorage first
      const storedImages = localStorage.getItem('carouselImages')
      if (storedImages) {
        const parsedImages = JSON.parse(storedImages)
        setImages(parsedImages)
      } else {
        // Create images with default properties
        const allImages = [
          {
            id: "i1",
            url: weddingImg,
            name: "Foto de Boda",
            dimensions: "1920 x 1080 px",
            size: "245 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i2",
            url: portraitImg,
            name: "Retrato de Caballos",
            dimensions: "1920 x 1080 px",
            size: "312 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i3",
            url: landscapeImg,
            name: "Paisaje con Montañas",
            dimensions: "1920 x 1080 px",
            size: "278 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i4",
            url: eventsImg,
            name: "Evento Corporativo",
            dimensions: "1920 x 1080 px",
            size: "256 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i5",
            url: fashionImg,
            name: "Fotografía de Moda",
            dimensions: "1920 x 1080 px",
            size: "289 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i6",
            url: familyImg,
            name: "Fotografía Familiar",
            dimensions: "1920 x 1080 px",
            size: "267 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i7",
            url: climbImg,
            name: "Escalada de Aventura",
            dimensions: "1920 x 1080 px",
            size: "301 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i8",
            url: landscapeWaterImg,
            name: "Paisaje con Agua",
            dimensions: "1920 x 1080 px",
            size: "294 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i9",
            url: mountainClimbingImg,
            name: "Escalada en Montaña",
            dimensions: "1920 x 1080 px",
            size: "315 KB",
            format: "WEBP",
            active: true,
          },
          {
            id: "i10",
            url: veneciaImg,
            name: "Canales de Venecia",
            dimensions: "1920 x 1080 px",
            size: "302 KB",
            format: "WEBP",
            active: true,
          },
        ]

        setImages(allImages)
        localStorage.setItem('carouselImages', JSON.stringify(allImages))
      }

      // Fast video loading with static thumbnails
      const fastVideos = STATIC_VIDEOS.map(video => ({
        ...video,
        thumbnail: "https://placehold.co/300x200/374151/white?text=Video",
        dimensions: "1920 x 1080 px",
        size: "2.5 MB",
        format: "MP4",
        views: Math.floor(Math.random() * 5000),
        uniqueViews: Math.floor(Math.random() * 2000),
      }));

      setVideos(fastVideos);

      // Load video carousel settings
      const storedVideoSettings = localStorage.getItem('carouselVideos')
      if (storedVideoSettings) {
        setVideoCarouselSettings(JSON.parse(storedVideoSettings))
      } else {
        const defaultSettings = STATIC_VIDEOS.map(video => ({
          id: video.id,
          name: video.name,
          url: video.url,
          active: true
        }))
        setVideoCarouselSettings(defaultSettings)
        localStorage.setItem('carouselVideos', JSON.stringify(defaultSettings))
      }

      setLoading(false);
    };

    processMedia();
  }, []);

  const validateAudioDuration = async (audioUrl, videoDuration) => {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.src = audioUrl;
        audio.onloadedmetadata = () => {
            if (audio.duration < videoDuration) {
                alert("La pista de audio es más corta que el vídeo. La reproducción se detendrá cuando el audio termine.");
            }
            resolve();
        };
        audio.onerror = () => {
            resolve(); // Continuar incluso si hay un error
        };
    });
  };
  
  const handleAudioChange = async (e) => {
    const newAudioSrc = e.target.value;
    setSelectedAudioSrc(newAudioSrc);
    
    if (videoPlayerRef.current) {
        const video = videoPlayerRef.current;
        const audio = audioPlayerRef.current;
        
        const videoDuration = videoDurationRef.current;

        if (newAudioSrc === selectedVideo.url) {
            // Se seleccionó el audio original del video
            setIsOriginalAudioMuted(false);
            if (audio) {
                audio.pause();
                audio.src = '';
            }
        } else {
            // Se seleccionó una nueva pista de audio
            setIsOriginalAudioMuted(true);
            if (audio) {
                await validateAudioDuration(newAudioSrc, videoDuration);
                audio.src = newAudioSrc;
                if (!video.paused) {
                    audio.play();
                }
            }
        }
    }
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setSelectedAudioSrc(video.url); // Por defecto, el src del video es el audio original
    setIsOriginalAudioMuted(false);
    
    // Guardamos la duración del vídeo para la validación
    const tempVideo = document.createElement("video");
    tempVideo.src = video.url;
    tempVideo.onloadedmetadata = () => {
      videoDurationRef.current = tempVideo.duration;
    };
    
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
    setShowEditSubtitlesModal(false); // Cierra el nuevo modal
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

  // Función para manejar tanto la subida inicial como la edición
  const handleVideoUpload = (newVideo) => {
    setVideos(prevVideos => {
      const existingIndex = prevVideos.findIndex(v => v.id === newVideo.id);
      if (existingIndex !== -1) {
        // Actualizar vídeo existente
        const updatedVideos = [...prevVideos];
        updatedVideos[existingIndex] = newVideo;
        return updatedVideos;
      } else {
        // Añadir nuevo vídeo
        return [newVideo, ...prevVideos];
      }
    });
  };

  // Funciones para el nuevo modal de edición
  const openEditSubtitlesModal = (video) => {
    setVideoToEdit(video);
    setShowEditSubtitlesModal(true);
  };

  const handleSaveSubtitles = (videoId, newSubtitles) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId ? { ...video, subtitles: newSubtitles } : video
      )
    );
    setSuccess("Subtítulos actualizados correctamente.");
  };

  const toggleImageActive = (imageId) => {
    setImages(prevImages => {
      const updatedImages = prevImages.map(image =>
        image.id === imageId ? { ...image, active: !image.active } : image
      );
      // Save to localStorage
      localStorage.setItem('carouselImages', JSON.stringify(updatedImages));
      return updatedImages;
    });
  };

  const toggleVideoActive = (videoId) => {
    setVideoCarouselSettings(prevSettings => {
      const updatedSettings = prevSettings.map(video =>
        video.id === videoId ? { ...video, active: !video.active } : video
      );
      // Save to localStorage
      localStorage.setItem('carouselVideos', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  // Función para cargar miniaturas de video de forma lazy
  const loadVideoThumbnail = async (videoId, videoUrl) => {
    if (loadedThumbnails.has(videoId) || loadingThumbnails.has(videoId)) return;

    setLoadingThumbnails(prev => new Set([...prev, videoId]));

    try {
      const thumbnail = await generateVideoThumbnail(videoUrl);
      setVideos(prevVideos =>
        prevVideos.map(video =>
          video.id === videoId ? { ...video, thumbnail } : video
        )
      );
      setLoadedThumbnails(prev => new Set([...prev, videoId]));
    } catch (error) {
      console.error(`Error loading thumbnail for video ${videoId}:`, error);
    } finally {
      setLoadingThumbnails(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    }
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
            <button
              onClick={() => setActiveTab("video-carousel")}
              className={`${activeTab === "video-carousel" ? "border-stone-700 text-stone-900" : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"} whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200`}
            >
              Carrusel Videos
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
                  <div
                    key={item.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden border border-stone-200 transition-transform duration-200 hover:scale-105"
                    onMouseEnter={() => loadVideoThumbnail(item.id, item.url)}
                  >
                    <div className="relative group">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      {loadingThumbnails.has(item.id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-stone-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => openVideoModal(item)}
                          className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => openEditSubtitlesModal(item)}
                          className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          Editar Subtítulos
                        </button>
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
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-stone-600">Activa en carrusel:</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.active}
                            onChange={() => toggleImageActive(item.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-stone-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-600"></div>
                        </label>
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

        {activeTab === "video-carousel" && (
          <>
            <h2 className="text-2xl font-bold text-stone-800 mb-4 mt-12">Gestión del Carrusel de Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videoCarouselSettings.length > 0 ? (
                videoCarouselSettings.map((video) => (
                  <div key={video.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 border border-stone-200">
                    <div className="relative group">
                      <img
                        className="w-full h-48 object-cover"
                        src="https://placehold.co/300x200/374151/white?text=Video"
                        alt={video.name}
                      />
                      <div className="absolute inset-0 bg-stone-900 bg-opacity-50 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-stone-800 truncate">{video.name}</h3>
                      <div className="text-sm text-stone-600 mt-2">
                        <p>ID: <span className="font-medium text-stone-700">{video.id}</span></p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-stone-600">Activo en carrusel:</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={video.active}
                            onChange={() => toggleVideoActive(video.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-stone-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stone-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="md:col-span-4 text-center py-10 text-stone-500">
                  <p>No se encontraron videos para el carrusel.</p>
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

        {showEditSubtitlesModal && videoToEdit && (
          <EditSubtitlesModal
            video={videoToEdit}
            onSave={handleSaveSubtitles}
            onClose={closeAllModals}
          />
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
                 {/* Selector de Pista de Audio */}
                {selectedVideo.audioTracks && selectedVideo.audioTracks.length > 1 && (
                    <div className="mb-4">
                        <label htmlFor="audio-track-select" className="block text-sm font-medium text-stone-700 mb-1">Pista de Audio:</label>
                        <select
                            id="audio-track-select"
                            value={selectedAudioSrc}
                            onChange={handleAudioChange}
                            className="w-full p-2 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500"
                        >
                            {selectedVideo.audioTracks.map((track, index) => (
                                <option key={track.id} value={track.src}>
                                    {track.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                
                <video
                  ref={videoPlayerRef}
                  src={selectedVideo.url}
                  className="w-full rounded-lg"
                  controls
                  autoPlay
                  muted={isOriginalAudioMuted}
                >
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
                 {/* Reproductor de audio oculto para las pistas adicionales */}
                <audio ref={audioPlayerRef} />
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