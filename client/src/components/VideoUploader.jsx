import React, { useState } from 'react';

const ALLOWED_MIME_TYPES = [
  "video/mpeg", "video/avi", "video/x-ms-wmv", "video/quicktime",
  "video/vnd.rn-realvideo", "video/x-flv", "application/x-shockwave-flash",
  "video/ogg", "video/webm", "video/mp4",
];

const ALLOWED_SUBTITLE_EXTENSIONS = ['.vtt', '.srt'];

const VideoUploader = ({ onVideoUpload, onClose }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [subtitles, setSubtitles] = useState([
    { id: 1, file: null, srclang: '' },
    { id: 2, file: null, srclang: '' },
  ]);

  const validateSubtitleFile = (file) => {
    if (!file) return false;
    const extension = file.name.slice(file.name.lastIndexOf('.'));
    return ALLOWED_SUBTITLE_EXTENSIONS.includes(extension.toLowerCase());
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (ALLOWED_MIME_TYPES.includes(file.type)) {
        setError("");
        setVideoFile(file);
        const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
        setVideoName(nameWithoutExtension);
      } else {
        setError("Formato de vídeo no válido. Por favor, sube un archivo con formato MPEG, AVI, WMV, MOV, RM, FLV, OGG, WebM o MP4.");
        setVideoFile(null);
        setVideoName("");
      }
    }
  };

  const handleSubtitleFileChange = (e, id) => {
    const file = e.target.files[0];
    const newSubtitles = subtitles.map(sub => {
      if (sub.id === id) {
        if (file && !validateSubtitleFile(file)) {
          setError(`Formato de subtítulo no válido para Subtítulo ${id}. Por favor, sube un archivo .vtt o .srt.`);
          return { ...sub, file: null };
        }
        setError("");
        return { ...sub, file: file };
      }
      return sub;
    });
    setSubtitles(newSubtitles);
  };
  
  const handleSubtitleLangChange = (e, id) => {
    const newSubtitles = subtitles.map(sub => 
      sub.id === id ? { ...sub, srclang: e.target.value } : sub
    );
    setSubtitles(newSubtitles);
  };

  const handleAddSubtitle = () => {
    if (subtitles.length >= 15) {
      setError("Se ha alcanzado el número máximo de 15 subtítulos.");
      return;
    }
    const newId = subtitles.length > 0 ? Math.max(...subtitles.map(s => s.id)) + 1 : 1;
    setSubtitles([...subtitles, { id: newId, file: null, srclang: '' }]);
  };

  const handleRemoveSubtitle = (id) => {
    if (subtitles.length <= 2) {
      setError("Debe haber al menos 2 subtítulos.");
      return;
    }
    setSubtitles(subtitles.filter(sub => sub.id !== id));
  };
  
  // Función para generar una miniatura de un vídeo
  const generateVideoThumbnail = (file) => {
    return new Promise((resolve) => {
      const videoUrl = URL.createObjectURL(file);
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 1; // Poner el vídeo en el segundo 1
      };

      video.onseeked = () => {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL("image/jpeg");
        URL.revokeObjectURL(videoUrl); // Revocar la URL temporal del vídeo aquí
        resolve(thumbnailDataUrl);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(videoUrl);
        resolve("https://placehold.co/300x200?text=Error");
      };
    });
  };

  const handleUpload = async () => {
    if (!videoFile) {
        setError("Por favor, selecciona un archivo de vídeo para subir.");
        return;
    }

    if (subtitles.length < 2) {
        setError("Debes subir al menos dos archivos de subtítulos.");
        return;
    }

    const invalidSubtitles = subtitles.filter(sub => !sub.file || !sub.srclang);
    if (invalidSubtitles.length > 0) {
        setError("Cada subtítulo debe tener un archivo y un código de idioma.");
        return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const finalVideoName = videoName.trim() === "" ? videoFile.name : videoName;
      
      const videoUrl = URL.createObjectURL(videoFile);
      
      const video = document.createElement('video');
      video.src = videoUrl;
      await new Promise(resolve => video.addEventListener('loadedmetadata', resolve));
      
      const videoDimensions = `${video.videoWidth} x ${video.videoHeight} px`;
      const videoSize = `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB`;
      const videoFormat = videoFile.type.split('/')[1]?.toUpperCase() || 'N/A';
      
      const thumbnail = await generateVideoThumbnail(videoFile);

      const processedSubtitles = subtitles.map(sub => ({
        src: URL.createObjectURL(sub.file),
        srclang: sub.srclang,
        label: `${sub.srclang.toUpperCase()} Subtitles`,
      }));

      const newVideo = {
        id: `v-${Date.now()}`,
        url: videoUrl,
        thumbnail: thumbnail,
        name: finalVideoName,
        views: 0,
        uniqueViews: 0,
        dimensions: videoDimensions,
        size: videoSize,
        format: videoFormat,
        subtitles: processedSubtitles
      };
      
      onVideoUpload(newVideo);
      onClose();

    } catch (err) {
      setError("Ocurrió un error al procesar el vídeo o los subtítulos. Por favor, inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900 bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-stone-700">
            Subir Nuevo Vídeo
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800 transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {isProcessing && (
          <div className="text-stone-500 mb-4">Generando miniatura y procesando...</div>
        )}

        <div className="mb-4">
          <label htmlFor="videoUpload" className="block text-sm font-medium text-stone-700 mb-1">
            Archivo de Vídeo (obligatorio)
          </label>
          <input
            type="file"
            id="videoUpload"
            accept="video/*"
            onChange={handleVideoFileChange}
            className="p-2 w-full border border-stone-300 rounded-lg text-stone-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="videoName" className="block text-sm font-medium text-stone-700 mb-1">
            Nombre del Vídeo
          </label>
          <input
            type="text"
            id="videoName"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            className="w-full p-2 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-opacity-75"
            placeholder="Escribe el nombre del vídeo"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-stone-700">
              Subtítulos (mínimo 2, máximo 15)
            </label>
            <button
              onClick={handleAddSubtitle}
              className={`text-blue-500 hover:text-blue-700 text-sm font-medium ${subtitles.length >= 15 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={subtitles.length >= 15}
            >
              + Añadir subtítulo
            </button>
          </div>
          
          <div className="max-h-40 overflow-y-auto pr-2">
            {subtitles.map((sub, index) => (
              <div key={sub.id} className="flex items-center gap-2 mb-2">
                <input
                  type="file"
                  id={`subtitles-${sub.id}`}
                  accept=".vtt,.srt"
                  onChange={(e) => handleSubtitleFileChange(e, sub.id)}
                  className="p-2 w-full border border-stone-300 rounded-lg text-stone-700"
                />
                <input
                  type="text"
                  placeholder="ej. es, en"
                  value={sub.srclang}
                  onChange={(e) => handleSubtitleLangChange(e, sub.id)}
                  className="w-24 p-2 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
                {subtitles.length > 2 && (
                  <button onClick={() => handleRemoveSubtitle(sub.id)} className="text-red-500 hover:text-red-700">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpload}
            className="bg-stone-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
            disabled={!videoFile || isProcessing || subtitles.some(sub => !sub.file || !sub.srclang)}
          >
            Subir Vídeo a Galería
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;