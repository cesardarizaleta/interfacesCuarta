import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfigHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6 pb-4 ">
      <button
        onClick={() => navigate('/config')}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver
      </button>
      <h1 className="text-6xl font-bold text-gray-800">{title}</h1>
      {/* Elemento vacío para ocupar el espacio y centrar el título */}
      <div className="w-12"></div> 
    </div>
  );
};

export default ConfigHeader;