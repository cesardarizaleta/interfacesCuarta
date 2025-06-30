import { useState } from "react"
import UserIcon from "../../assets/icons/user1.svg"
import HealthIcon from "../../assets/icons/run1.svg"
import WorkIcon from "../../assets/icons/work1.svg"
import LocationIcon from "../../assets/icons/location.svg"
import BankIcon from "../../assets/icons/bank.png"
import TechIcon from "../../assets/icons/tech.png"
import CryptoIcon from "../../assets/icons/wallet.png"

export default function ProfileWizardExpanded({ user, onSave, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Información Personal
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    maidenName: user?.maidenName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    username: user?.username || "",
    password: user?.password || "",
    birthDate: user?.birthDate || "",
    age: user?.age || "",
    gender: user?.gender || "",
    image: user?.image || "",

    // Información Física
    height: user?.height || "",
    weight: user?.weight || "",
    bloodGroup: user?.bloodGroup || "",
    eyeColor: user?.eyeColor || "",
    hairColor: user?.hair?.color || "",
    hairType: user?.hair?.type || "",

    // Información Académica/Profesional
    university: user?.university || "",
    company: user?.company?.name || "",
    department: user?.company?.department || "",
    title: user?.company?.title || "",

    // Dirección Personal
    address: user?.address?.address || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    stateCode: user?.address?.stateCode || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
    coordinates: {
      lat: user?.address?.coordinates?.lat || "",
      lng: user?.address?.coordinates?.lng || "",
    },

    // Dirección de la Empresa
    companyAddress: user?.company?.address?.address || "",
    companyCity: user?.company?.address?.city || "",
    companyState: user?.company?.address?.state || "",
    companyStateCode: user?.company?.address?.stateCode || "",
    companyPostalCode: user?.company?.address?.postalCode || "",
    companyCountry: user?.company?.address?.country || "",
    companyCoordinates: {
      lat: user?.company?.address?.coordinates?.lat || "",
      lng: user?.company?.address?.coordinates?.lng || "",
    },

    // Información Bancaria
    cardExpire: user?.bank?.cardExpire || "",
    cardNumber: user?.bank?.cardNumber || "",
    cardType: user?.bank?.cardType || "",
    currency: user?.bank?.currency || "",
    iban: user?.bank?.iban || "",

    // Información Legal/Fiscal
    ein: user?.ein || "",
    ssn: user?.ssn || "",

    // Información Técnica
    ip: user?.ip || "",
    macAddress: user?.macAddress || "",
    userAgent: user?.userAgent || "",

    // Criptomonedas
    cryptoCoin: user?.crypto?.coin || "",
    cryptoWallet: user?.crypto?.wallet || "",
    cryptoNetwork: user?.crypto?.network || "",

    // Sistema
    role: user?.role || "",
  })

  const [errors, setErrors] = useState({})
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const steps = [
    {
      id: 1,
      title: "Información Personal",
      description: "Datos básicos y contacto",
      icon: UserIcon,
    },
    {
      id: 2,
      title: "Información Física",
      description: "Datos físicos y características",
      icon: HealthIcon,
    },
    {
      id: 3,
      title: "Información Profesional",
      description: "Universidad y trabajo",
      icon: WorkIcon,
    },
    {
      id: 4,
      title: "Dirección Personal",
      description: "Ubicación de residencia",
      icon: LocationIcon,
    },
    {
      id: 5,
      title: "Información Bancaria",
      description: "Datos financieros",
      icon: BankIcon,
    },
    {
      id: 6,
      title: "Información Técnica",
      description: "Datos técnicos y legales",
      icon: TechIcon,
    },
    {
      id: 7,
      title: "Criptomonedas y Sistema",
      description: "Crypto y configuración",
      icon: CryptoIcon,
    },
  ]

  // Función para calcular edad automáticamente
  const calculateAge = (birthDate) => {
    if (!birthDate) return ""
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }

      // Calcular edad automáticamente cuando cambia la fecha de nacimiento
      if (field === "birthDate") {
        newData.age = calculateAge(value)
      }

      return newData
    })

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu apellido"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido de Soltera</label>
              <input
                type="text"
                value={formData.maidenName}
                onChange={(e) => handleInputChange("maidenName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Apellido de soltera (opcional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Usuario</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Edad (Calculada)</label>
                <input
                  type="number"
                  value={formData.age}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  placeholder="Se calcula automáticamente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL de la imagen"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Altura (cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="170"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Peso (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Sangre</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color de Ojos</label>
                <select
                  value={formData.eyeColor}
                  onChange={(e) => handleInputChange("eyeColor", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Brown">Café</option>
                  <option value="Blue">Azul</option>
                  <option value="Green">Verde</option>
                  <option value="Hazel">Avellana</option>
                  <option value="Gray">Gris</option>
                  <option value="Amber">Ámbar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color de Cabello</label>
                <select
                  value={formData.hairColor}
                  onChange={(e) => handleInputChange("hairColor", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Black">Negro</option>
                  <option value="Brown">Café</option>
                  <option value="Blonde">Rubio</option>
                  <option value="Red">Pelirrojo</option>
                  <option value="Gray">Gris</option>
                  <option value="White">Blanco</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Cabello</label>
                <select
                  value={formData.hairType}
                  onChange={(e) => handleInputChange("hairType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Straight">Liso</option>
                  <option value="Wavy">Ondulado</option>
                  <option value="Curly">Rizado</option>
                  <option value="Kinky">Muy Rizado</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Universidad <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => handleInputChange("university", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.university ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Nombre de la universidad"
              />
              {errors.university && <p className="text-red-500 text-sm mt-1">{errors.university}</p>}
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Información Laboral</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Desarrollo, Marketing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título de Trabajo</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Desarrollador Senior"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dirección Personal</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Calle y número"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ciudad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Estado"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código de Estado</label>
                <input
                  type="text"
                  value={formData.stateCode}
                  onChange={(e) => handleInputChange("stateCode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: CA, TX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código Postal</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="País"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitud</label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lat}
                  onChange={(e) => handleInputChange("coordinates", { ...formData.coordinates, lat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="19.4326"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitud</label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates.lng}
                  onChange={(e) => handleInputChange("coordinates", { ...formData.coordinates, lng: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="-99.1332"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Bancaria</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de Tarjeta</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Expiración</label>
                <input
                  type="text"
                  value={formData.cardExpire}
                  onChange={(e) => handleInputChange("cardExpire", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Tarjeta</label>
                <select
                  value={formData.cardType}
                  onChange={(e) => handleInputChange("cardType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                  <option value="Elo">Elo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="USD, EUR, CNY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IBAN</label>
                <input
                  type="text"
                  value={formData.iban}
                  onChange={(e) => handleInputChange("iban", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="IBAN"
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Técnica y Legal</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección IP</label>
                <input
                  type="text"
                  value={formData.ip}
                  onChange={(e) => handleInputChange("ip", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="192.168.1.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección MAC</label>
                <input
                  type="text"
                  value={formData.macAddress}
                  onChange={(e) => handleInputChange("macAddress", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00:1B:44:11:3A:B7"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SSN</label>
                <input
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123-45-6789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">EIN</label>
                <input
                  type="text"
                  value={formData.ein}
                  onChange={(e) => handleInputChange("ein", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12-3456789"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User Agent</label>
              <textarea
                value={formData.userAgent}
                onChange={(e) => handleInputChange("userAgent", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Criptomonedas y Sistema</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Criptomoneda</label>
                <select
                  value={formData.cryptoCoin}
                  onChange={(e) => handleInputChange("cryptoCoin", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Litecoin">Litecoin</option>
                  <option value="Dogecoin">Dogecoin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wallet</label>
                <input
                  type="text"
                  value={formData.cryptoWallet}
                  onChange={(e) => handleInputChange("cryptoWallet", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Red</label>
                <select
                  value={formData.cryptoNetwork}
                  onChange={(e) => handleInputChange("cryptoNetwork", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum (ERC20)">Ethereum (ERC20)</option>
                  <option value="Binance Smart Chain">Binance Smart Chain</option>
                  <option value="Polygon">Polygon</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rol del Usuario</label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar</option>
                <option value="admin">Administrador</option>
                <option value="moderator">Moderador</option>
                <option value="user">Usuario</option>
              </select>
            </div>
          </div>
        )

      default:
        return <div>Paso {currentStep} en desarrollo...</div>
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido"
        if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
        if (!formData.email.trim()) newErrors.email = "El email es requerido"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
        if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
        break

      case 2:
        if (!formData.birthDate) newErrors.birthDate = "La fecha de nacimiento es requerida"
        if (!formData.gender) newErrors.gender = "El género es requerido"
        if (!formData.height || formData.height < 100 || formData.height > 250)
          newErrors.height = "La altura debe estar entre 100 y 250 cm"
        if (!formData.weight || formData.weight < 30 || formData.weight > 300)
          newErrors.weight = "El peso debe estar entre 30 y 300 kg"
        break

      case 3:
        if (!formData.university) newErrors.university = "La universidad es requerida"
        break

      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Estructurar los datos como en dummyjson
      const updatedUser = {
        ...user,
        ...formData,
        address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          stateCode: formData.stateCode,
          postalCode: formData.postalCode,
          country: formData.country,
          coordinates: {
            lat: Number.parseFloat(formData.coordinates.lat) || 0,
            lng: Number.parseFloat(formData.coordinates.lng) || 0,
          },
        },
        company: {
          name: formData.company,
          department: formData.department,
          title: formData.title,
          address: {
            address: formData.companyAddress,
            city: formData.companyCity,
            state: formData.companyState,
            stateCode: formData.companyStateCode,
            postalCode: formData.companyPostalCode,
            country: formData.companyCountry,
            coordinates: {
              lat: Number.parseFloat(formData.companyCoordinates.lat) || 0,
              lng: Number.parseFloat(formData.companyCoordinates.lng) || 0,
            },
          },
        },
        hair: {
          color: formData.hairColor,
          type: formData.hairType,
        },
        bank: {
          cardExpire: formData.cardExpire,
          cardNumber: formData.cardNumber,
          cardType: formData.cardType,
          currency: formData.currency,
          iban: formData.iban,
        },
        crypto: {
          coin: formData.cryptoCoin,
          wallet: formData.cryptoWallet,
          network: formData.cryptoNetwork,
        },
      }
      onSave(updatedUser)
    }
  }

  // Agregar antes del return statement, después de renderStepContent

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header del wizard */}
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Editar Perfil Completo</h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step.id <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id <= currentStep ? (
                      step.id < currentStep ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        step.id
                      )
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        step.id < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">{steps[currentStep - 1].title}</h3>
              <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
            </div>
          </div>
        </div>

        {/* Contenido del paso actual */}
        <div className="px-6 py-8">{renderStepContent()}</div>

        {/* Botones de navegación */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between sticky bottom-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Siguiente
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Guardar Perfil
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
