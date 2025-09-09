import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UsersList from "../components/admin/UsersList"
import UserDetails from "../components/admin/UserDetails"
import UserProfile from "../components/user/UserProfile"

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [showViewSelection, setShowViewSelection] = useState(true)
  const [selectedView, setSelectedView] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Usuario simulado para pruebas
    const simulatedUser = {
      id: 1,
      firstName: "Admin",
      lastName: "Usuario",
      email: "admin@test.com",
      role: "admin", // Cambia a "user" para probar la vista de usuario normal
    }
    setCurrentUser(simulatedUser)

    // Check if view selection was previously made
    const storedView = localStorage.getItem('dashboardView')
    if (storedView) {
      setSelectedView(storedView)
      setShowViewSelection(false)
    }
  }, [])

  const handleViewSelection = (view) => {
    setSelectedView(view)
    setShowViewSelection(false)
    localStorage.setItem('dashboardView', view)
  }

  const handleChangeView = () => {
    setShowViewSelection(true)
    setSelectedView(null)
    localStorage.removeItem('dashboardView')
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show view selection modal
  if (showViewSelection) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Seleccionar Vista del Dashboard
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            ¿Qué vista del dashboard deseas ver?
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleViewSelection('administrator')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              Vista de Administrador
            </button>
            <button
              onClick={() => handleViewSelection('user')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Vista de Usuario
            </button>
          </div>
        </div>
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
              {selectedView === "administrator" ? "Panel de Administrador" : "Mi Perfil"}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {currentUser.firstName} {currentUser.lastName}
              </span>
              <div className="flex space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedView === "administrator" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedView === "administrator" ? "Administrador" : "Usuario"}
                </span>
                <button
                  onClick={handleChangeView}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cambiar Vista
                </button>
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
        {selectedView === "administrator" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de usuarios */}
            <div className="lg:col-span-2">
              <UsersList onSelectUser={setSelectedUser} />
            </div>

            {/* Panel de detalles */}
            <div className="lg:col-span-1">
              <UserDetails user={selectedUser} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <UserProfile userId={currentUser.id} />
          </div>
        )}
      </main>
    </div>
  )
}
