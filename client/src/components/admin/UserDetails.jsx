import { useState } from "react"

export default function UserDetails({ user }) {
  const [activeTab, setActiveTab] = useState("info")

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del Usuario</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Selecciona un usuario para ver sus detalles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header del usuario */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={user.image || "/placeholder.svg?height=64&width=64"}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {user.isActive ? "Activo" : "Inactivo"}
              </span>
              <span className="text-xs text-gray-500">ID: {user.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "info"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Información Personal
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "contact"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Contacto
          </button>
          <button
            onClick={() => setActiveTab("location")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "location"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Ubicación
          </button>
        </nav>
      </div>

      {/* Contenido de tabs */}
      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
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
                <label className="block text-sm font-medium text-gray-700">Altura</label>
                <p className="mt-1 text-sm text-gray-900">{user.height || "No especificado"} cm</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Peso</label>
                <p className="mt-1 text-sm text-gray-900">{user.weight || "No especificado"} kg</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Sangre</label>
                <p className="mt-1 text-sm text-gray-900">{user.bloodGroup || "No especificado"}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="mt-1 text-sm text-gray-900">{user.phone || "No especificado"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Universidad</label>
                <p className="mt-1 text-sm text-gray-900">{user.university || "No especificado"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Empresa</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.company?.name || "No especificado"}
                  {user.company?.department && <span className="text-gray-600"> - {user.company.department}</span>}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Título de Trabajo</label>
                <p className="mt-1 text-sm text-gray-900">{user.company?.title || "No especificado"}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección Completa</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.address?.address || "No especificado"}
                  <br />
                  {user.address?.city && user.address?.state && (
                    <>
                      {user.address.city}, {user.address.state}
                    </>
                  )}
                  <br />
                  {user.address?.postalCode && <>CP: {user.address.postalCode}</>}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Coordenadas GPS</label>
                <p className="mt-1 text-sm text-gray-900">
                  {user.address?.coordinates?.lat && user.address?.coordinates?.lng ? (
                    <>
                      Lat: {user.address.coordinates.lat}
                      <br />
                      Lng: {user.address.coordinates.lng}
                    </>
                  ) : (
                    "No especificado"
                  )}
                </p>
              </div>
              {user.address?.coordinates?.lat && user.address?.coordinates?.lng && (
                <div className="mt-4">
                  <div className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">
                      Mapa interactivo disponible en el commit 5
                      <br />
                      <span className="text-xs">
                        Ubicación: {user.firstName} {user.lastName}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">Usuario registrado: {new Date().toLocaleDateString()}</div>
          <div className="flex space-x-2">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Enviar mensaje</button>
            <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">Ver historial</button>
          </div>
        </div>
      </div>
    </div>
  )
}
