import React, { useState, useEffect } from 'react';

const ALLOWED_SUBTITLE_EXTENSIONS = ['.vtt', '.srt'];

const EditSubtitlesModal = ({ video, onSave, onClose }) => {
  const [subtitles, setSubtitles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Inicializar el estado con los subtítulos existentes del vídeo
    const initialSubtitles = video.subtitles.map((sub, index) => ({
      id: index + 1,
      file: null, // No hay un archivo nuevo cargado
      isNew: false, // Este subtítulo ya existía
      srclang: sub.srclang,
      label: sub.label,
      src: sub.src,
    }));
    setSubtitles(initialSubtitles);
  }, [video]);

  const validateSubtitleFile = (file) => {
    if (!file) return false;
    const extension = file.name.slice(file.name.lastIndexOf('.'));
    return ALLOWED_SUBTITLE_EXTENSIONS.includes(extension.toLowerCase());
  };

  const handleSubtitleFileChange = (e, id) => {
    const file = e.target.files[0];
    const newSubtitles = subtitles.map(sub => {
      if (sub.id === id) {
        if (file && !validateSubtitleFile(file)) {
          setError(`Formato de subtítulo no válido. Por favor, sube un archivo .vtt o .srt.`);
          return { ...sub, file: null };
        }
        setError("");
        // CORRECCIÓN: Quitamos la actualización del label aquí.
        // El label se actualizará al guardar, basándose en el srclang.
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
    setSubtitles([...subtitles, { id: newId, file: null, isNew: true, srclang: '', label: 'Nuevo subtítulo' }]);
  };

  const handleRemoveSubtitle = (id) => {
    if (subtitles.length <= 2) {
      setError("Debe haber al menos 2 subtítulos.");
      return;
    }
    setSubtitles(subtitles.filter(sub => sub.id !== id));
  };
  
  const handleSave = () => {
    if (subtitles.length < 2) {
      setError("Debes tener al menos dos subtítulos.");
      return;
    }

    const newSubtitlesWithoutFile = subtitles.filter(sub => sub.isNew && !sub.file);
    if (newSubtitlesWithoutFile.length > 0) {
        setError("Por favor, selecciona un archivo para cada subtítulo nuevo.");
        return;
    }
    
    const invalidSubtitles = subtitles.filter(sub => !sub.srclang);
    if (invalidSubtitles.length > 0) {
        setError("Cada subtítulo debe tener un código de idioma.");
        return;
    }

    const updatedSubtitles = subtitles.map(sub => ({
      src: sub.isNew ? URL.createObjectURL(sub.file) : sub.src,
      srclang: sub.srclang,
      // CORRECCIÓN: El label se genera aquí, tomando el srclang como referencia.
      label: sub.srclang ? `${sub.srclang.toUpperCase()} Subtitles` : sub.label,
    }));

    onSave(video.id, updatedSubtitles);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900 bg-opacity-70 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-stone-700">
            Editar subtítulos de "{video.name}"
          </h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-800 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
          
          <div className="max-h-60 overflow-y-auto pr-2">
            {subtitles.map((sub, index) => (
              <div key={sub.id} className="flex items-center gap-2 mb-2">
                {sub.isNew ? (
                  // Si es un subtítulo nuevo, se muestra el input de archivo
                  <input
                    type="file"
                    id={`subtitles-${sub.id}`}
                    accept=".vtt,.srt"
                    onChange={(e) => handleSubtitleFileChange(e, sub.id)}
                    className="p-2 w-full border border-stone-300 rounded-lg text-stone-700"
                  />
                ) : (
                  // Si es un subtítulo existente, se muestra un mensaje sin campo de archivo
                  <div className="p-2 w-full border border-stone-300 rounded-lg text-stone-500 bg-stone-100">
                      Archivo original: {sub.label}
                  </div>
                )}

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
            onClick={handleSave}
            className="bg-stone-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
            disabled={subtitles.length < 2 || subtitles.some(sub => !sub.srclang)}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubtitlesModal;