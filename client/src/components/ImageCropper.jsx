import React, { useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ onImageCrop, onClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [originalMimeType, setOriginalMimeType] = useState(""); // Nuevo estado para el tipo de archivo

  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFileName(file.name);
      setOriginalMimeType(file.type); // Guardamos el tipo de archivo original
      const reader = new FileReader();
      reader.onload = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas();
      if (croppedCanvas) {
        // Determinamos el formato de salida basándonos en el tipo original
        const outputMimeType = originalMimeType;
        let format = "PNG";
        if (outputMimeType.startsWith("image/")) {
          const extension = outputMimeType.split('/')[1].toUpperCase();
          format = extension;
        }

        const croppedDataUrl = croppedCanvas.toDataURL(outputMimeType);
        const imageDataSize = (croppedDataUrl.length * (3 / 4) - 2) / 1024;

        const croppedData = {
          url: croppedDataUrl,
          name: `recortada_${uploadedFileName}`,
          dimensions: `${croppedCanvas.width} x ${croppedCanvas.height} px`,
          size: `${imageDataSize.toFixed(2)} KB`,
          format: format,
        };

        onImageCrop(croppedData);
        onClose();
      } else {
        alert("No se pudo obtener la imagen recortada.");
      }
    } else {
      alert("Por favor, sube una imagen primero.");
    }
  };

  useEffect(() => {
    if (imageFile && imageRef.current) {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        autoCropArea: 0.8,
      });
    }
  }, [imageFile]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">
            Recortar Imagen
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
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

        <input
          type="file"
          id="imageUpload"
          onChange={handleFileChange}
          className="mb-4 p-2 w-full border border-gray-300 rounded-lg text-gray-700"
        />

        <div className="flex-grow flex justify-center items-center min-h-[300px] overflow-hidden bg-gray-100 rounded-xl border border-gray-200">
          {imageFile && (
            <img
              ref={imageRef}
              src={imageFile}
              alt="Previsualización de imagen"
              className="max-w-full h-auto block"
            />
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleCrop}
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!imageFile}
          >
            Recortar y Agregar a Galería
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;