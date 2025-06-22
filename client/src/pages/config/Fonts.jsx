import { Link } from "react-router-dom"

const Fonts = () => {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/config" className="mr-4 text-stone-600 hover:text-stone-800 transition-colors">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-3xl font-bold text-stone-800">Configuración de Fuentes</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-stone-600">Tralalero tralala</p>
        </div>
      </div>
    </div>
  )
}

export default Fonts
