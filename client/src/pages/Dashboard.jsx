import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Usuario simulado para pruebas
    const simulatedUser = {
      id: 1,
      firstName: "Admin",
      lastName: "Usuario",
      email: "admin@test.com",
      role: "user", // Cambia a "user" para probar la vista de usuario normal
    }
    setCurrentUser(simulatedUser)
  }, [])

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentUser.role === "admin" ? "Panel de Administrador" : "Mi Perfil"}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {currentUser.firstName} {currentUser.lastName}
              </span>
              <div className="flex space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentUser.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {currentUser.role === "admin" ? "Administrador" : "Usuario"}
                </span>
                <button
                  onClick={() => navigate("/")}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentUser.role === "admin" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de usuarios - Se agregará en el siguiente commit */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Lista de Usuarios</h2>
                <p className="text-gray-600">La tabla de usuarios se agregará en el siguiente commit...</p>
              </div>
            </div>

            {/* Panel de detalles - Se agregará en commits posteriores */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Usuario</h3>
                <p className="text-gray-600">Selecciona un usuario para ver sus detalles...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Mi Perfil</h2>
              <p className="text-gray-600">El perfil de usuario se agregará en commits posteriores...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
