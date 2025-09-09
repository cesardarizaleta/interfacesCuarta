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

        // Simulate adding a user role. In a real app, this would come from your auth system.
        // For testing, let's make user ID 1 an admin, others customers.
        const role = userData.id === 1 ? 'admin' : 'customer';
        localStorage.setItem('userRole', role); // Store role for ProtectedRoute and Navbar
        localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`); // Store name for Navbar

        setUser({ ...userData, role }) // Add role to user object
      } catch (error) {
        console.error("Error fetching user profile:", error)
        setUser(null) // Ensure user is null on error
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

  // Calculate profile completion percentage including all new fields
  const calculateCompletion = (userData) => {
    if (!userData) return 0;
    let completedFields = 0;
    let totalFields = 0;

    // Personal Info
    totalFields += 10; // firstName, lastName, maidenName, age, gender, email, phone, username, birthDate, image, bloodGroup, height, weight, eyeColor, hair.color, hair.type
    if (userData.firstName) completedFields++;
    if (userData.lastName) completedFields++;
    if (userData.maidenName) completedFields++;
    if (userData.age) completedFields++;
    if (userData.gender) completedFields++;
    if (userData.email) completedFields++;
    if (userData.phone) completedFields++;
    if (userData.username) completedFields++;
    if (userData.birthDate) completedFields++;
    if (userData.image) completedFields++;
    if (userData.bloodGroup) completedFields++;
    if (userData.height) completedFields++;
    if (userData.weight) completedFields++;
    if (userData.eyeColor) completedFields++;
    if (userData.hair?.color) completedFields++;
    if (userData.hair?.type) completedFields++;


    // Professional Info
    totalFields += 7; // university, company.name, company.department, company.title, company.address, ein, ssn
    if (userData.university) completedFields++;
    if (userData.company?.name) completedFields++;
    if (userData.company?.department) completedFields++;
    if (userData.company?.title) completedFields++;
    if (userData.company?.address?.address) completedFields++;
    if (userData.ein) completedFields++;
    if (userData.ssn) completedFields++;

    // Location Info
    totalFields += 6; // address, city, state, postalCode, country, coordinates.lat, coordinates.lng
    if (userData.address?.address) completedFields++;
    if (userData.address?.city) completedFields++;
    if (userData.address?.state) completedFields++;
    if (userData.address?.postalCode) completedFields++;
    if (userData.address?.country) completedFields++;
    if (userData.address?.coordinates?.lat && userData.address?.coordinates?.lng) completedFields++;

    // Banking Info
    totalFields += 5; // bank.cardNumber, bank.cardType, bank.cardExpire, bank.currency, bank.iban
    if (userData.bank?.cardNumber) completedFields++;
    if (userData.bank?.cardType) completedFields++;
    if (userData.bank?.cardExpire) completedFields++;
    if (userData.bank?.currency) completedFields++;
    if (userData.bank?.iban) completedFields++;

    // User Agent Info
    totalFields += 2; // ip, userAgent
    if (userData.ip) completedFields++;
    if (userData.userAgent) completedFields++;

    // Crypto Info (part of Security for this display)
    totalFields += 3; // crypto.coin, crypto.wallet, crypto.network
    if (userData.crypto?.coin) completedFields++;
    if (userData.crypto?.wallet) completedFields++;
    if (userData.crypto?.network) completedFields++;

    return Math.min(100, Math.round((completedFields / totalFields) * 100));
  };


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

  const profileCompletion = calculateCompletion(user);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header del perfil */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    {user.role && (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                         Rol: {user.role}
                       </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium shadow-md"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>

          {/* Navegación de secciones */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 px-4 sm:px-6 py-2">
              <button
                onClick={() => setActiveSection("personal")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeSection === "personal"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Información Personal
              </button>
              <button
                onClick={() => setActiveSection("professional")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeSection === "professional"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Información Profesional
              </button>
              <button
                onClick={() => setActiveSection("location")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeSection === "location"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Ubicación
              </button>
              <button
                onClick={() => setActiveSection("banking")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeSection === "banking"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Información Bancaria
              </button>
              <button
                onClick={() => setActiveSection("userAgent")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeSection === "userAgent"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Agente de Usuario
              </button>
              <button
                onClick={() => setActiveSection("security")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeSection === "security"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Seguridad
              </button>
            </nav>
          </div>

          {/* Contenido de las secciones */}
          <div className="p-6 bg-white">
            {activeSection === "personal" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Datos Básicos</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                    <p className="mt-1 text-sm text-gray-900">{user.username || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre de Soltera</label>
                    <p className="mt-1 text-sm text-gray-900">{user.maidenName || "No especificado"}</p>
                  </div>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Datos Físicos</h3>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Cabello</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{user.hair?.type || "No especificado"}</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "professional" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información Académica</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Universidad</label>
                    <p className="mt-1 text-sm text-gray-900">{user.university || "No especificado"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información Laboral</h3>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección de la Empresa</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.company?.address?.address || "No especificado"}
                      {user.company?.address?.city && user.company?.address?.state && (
                        <>
                          <br />
                          {user.company.address.city}, {user.company.address.state}
                        </>
                      )}
                      {user.company?.address?.postalCode && (
                        <>
                          <br />
                          CP: {user.company.address.postalCode}
                        </>
                      )}
                       {user.company?.address?.country && (
                        <>
                          <br />
                          País: {user.company.address.country}
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">EIN (Número de Identificación del Empleador)</label>
                    <p className="mt-1 text-sm text-gray-900">{user.ein || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SSN (Número de Seguro Social)</label>
                    <p className="mt-1 text-sm text-gray-900">{user.ssn || "No especificado"}</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "location" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Dirección de Residencia</h3>
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
                        {user.address?.country && (
                          <>
                            <br />
                            País: {user.address.country}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Coordenadas GPS</h3>
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
                  <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm h-80">
                    <UserMap
                      latitude={user.address.coordinates.lat}
                      longitude={user.address.coordinates.lng}
                      userName={`${user.firstName} ${user.lastName}`}
                    />
                  </div>
                )}
              </div>
            )}

            {activeSection === "banking" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información Bancaria</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                    <p className="mt-1 text-sm text-gray-900">{user.bank?.cardNumber || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo de Tarjeta</label>
                    <p className="mt-1 text-sm text-gray-900">{user.bank?.cardType || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
                    <p className="mt-1 text-sm text-gray-900">{user.bank?.cardExpire || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Moneda</label>
                    <p className="mt-1 text-sm text-gray-900">{user.bank?.currency || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IBAN</label>
                    <p className="mt-1 text-sm text-gray-900">{user.bank?.iban || "No especificado"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Cripto</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Moneda Cripto</label>
                    <p className="mt-1 text-sm text-gray-900">{user.crypto?.coin || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección de Billetera</label>
                    <p className="mt-1 text-sm text-gray-900 break-words">{user.crypto?.wallet || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Red</label>
                    <p className="mt-1 text-sm text-gray-900">{user.crypto?.network || "No especificado"}</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "userAgent" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Detalles del Agente de Usuario</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IP del Último Acceso</label>
                  <p className="mt-1 text-sm text-gray-900">{user.ip || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección MAC</label>
                  <p className="mt-1 text-sm text-gray-900">{user.macAddress || "No especificado"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Agente de Usuario</label>
                  <p className="mt-1 text-sm text-gray-900 break-words">{user.userAgent || "No especificado"}</p>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Configuración de Seguridad</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <p className="mt-1 text-sm text-gray-900">********</p>
                    <button className="mt-2 text-blue-600 hover:underline text-sm">Cambiar Contraseña</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Autenticación de Dos Factores</label>
                      <p className="text-sm text-gray-500">Asegura tu cuenta con una capa extra de seguridad.</p>
                    </div>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 transition-colors">
                      Habilitar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas del perfil */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estadísticas del Perfil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{profileCompletion}%</div>
              <div className="text-sm text-gray-600">Perfil Completado</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{new Date().toLocaleDateString()}</div>
              <div className="text-sm text-gray-600">Última Actualización</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{user.active ? "Activo" : "Inactivo"}</div>
              <div className="text-sm text-gray-600">Estado del Perfil</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}