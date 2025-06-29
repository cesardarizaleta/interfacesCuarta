import { useState, useEffect } from "react"
import ProfileWizard from "./ProfileWizard"
import UserMap from "../common/UserMap"

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        // Simular carga del perfil del usuario
        const response = await fetch(`https://dummyjson.com/users/${userId}`)
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user profile:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [userId])

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser)
    setIsEditing(false)
  }

  if (isEditing) {
    return <ProfileWizard user={user} onSave={handleProfileUpdate} onCancel={() => setIsEditing(false)} />
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 font-medium">Error al cargar el perfil del usuario</p>
          <p className="text-gray-500 text-sm mt-1">Por favor, intenta nuevamente</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header del perfil */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={user.image || "/placeholder.svg?height=80&width=80"}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Perfil Activo
                  </span>
                  <span className="text-xs text-gray-500">ID: {user.id}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Navegación de secciones */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveSection("personal")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === "personal"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveSection("professional")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === "professional"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Información Profesional
            </button>
            <button
              onClick={() => setActiveSection("location")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSection === "location"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Ubicación
            </button>
          </nav>
        </div>

        {/* Contenido de las secciones */}
        <div className="p-6">
          {activeSection === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Datos Básicos</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <p className="mt-1 text-sm text-gray-900">{user.birthDate || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Género</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{user.gender || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Edad</label>
                  <p className="mt-1 text-sm text-gray-900">{user.age || "No especificado"} años</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Sangre</label>
                  <p className="mt-1 text-sm text-gray-900">{user.bloodGroup || "No especificado"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Datos Físicos</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Altura</label>
                  <p className="mt-1 text-sm text-gray-900">{user.height || "No especificado"} cm</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Peso</label>
                  <p className="mt-1 text-sm text-gray-900">{user.weight || "No especificado"} kg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color de Ojos</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{user.eyeColor || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Color de Cabello</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{user.hair?.color || "No especificado"}</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "professional" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información Académica</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Universidad</label>
                  <p className="mt-1 text-sm text-gray-900">{user.university || "No especificado"}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Empresa</label>
                  <p className="mt-1 text-sm text-gray-900">{user.company?.name || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Departamento</label>
                  <p className="mt-1 text-sm text-gray-900">{user.company?.department || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título de Trabajo</label>
                  <p className="mt-1 text-sm text-gray-900">{user.company?.title || "No especificado"}</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "location" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dirección</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección Completa</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.address?.address || "No especificado"}
                      {user.address?.city && user.address?.state && (
                        <>
                          <br />
                          {user.address.city}, {user.address.state}
                        </>
                      )}
                      {user.address?.postalCode && (
                        <>
                          <br />
                          CP: {user.address.postalCode}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Coordenadas GPS</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.address?.coordinates?.lat && user.address?.coordinates?.lng ? (
                        <>
                          Latitud: {user.address.coordinates.lat}
                          <br />
                          Longitud: {user.address.coordinates.lng}
                        </>
                      ) : (
                        "No especificado"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapa interactivo */}
              {user.address?.coordinates?.lat && user.address?.coordinates?.lng && (
                <div className="mt-6">
                  <UserMap
                    latitude={user.address.coordinates.lat}
                    longitude={user.address.coordinates.lng}
                    userName={`${user.firstName} ${user.lastName}`}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas del perfil */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas del Perfil</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600">Perfil Completado</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{new Date().toLocaleDateString()}</div>
            <div className="text-sm text-gray-600">Última Actualización</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">Activo</div>
            <div className="text-sm text-gray-600">Estado del Perfil</div>
          </div>
        </div>
      </div>
    </div>
  )
}
