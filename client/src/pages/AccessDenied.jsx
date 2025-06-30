import React from 'react'
import { Link } from 'react-router-dom'

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-800">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Acceso Denegado</h1>
        <p className="text-lg mb-6">No tienes permiso para acceder a esta página.</p>
        <Link
          to="/"
          className="bg-stone-700 text-white px-6 py-3 rounded-lg hover:bg-stone-800 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;