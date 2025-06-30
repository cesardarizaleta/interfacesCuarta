import { useState, useEffect, useRef } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import * as XLSX from "xlsx" // ¡Importa la librería XLSX aquí!

export default function UsersList({ onSelectUser }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const [usersPerPage, setUsersPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const tableRef = useRef(null) // Correcto

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://dummyjson.com/users")
      const data = await response.json()

      const usersWithStatus = data.users.map((user) => ({
        ...user,
        isActive: Math.random() > 0.2,
      }))

      setUsers(usersWithStatus)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleUserStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)),
    )
  }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const usersToDisplay =
    usersPerPage === -1
      ? filteredUsers
      : filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)

  const totalPages = usersPerPage === -1 ? 1 : Math.ceil(filteredUsers.length / filteredUsers.length)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleUsersPerPageChange = (e) => {
    const value = Number(e.target.value)
    setUsersPerPage(value)
    setCurrentPage(1)
  }

  const handleExportPdf = async () => {
    if (!tableRef.current) return

    const input = tableRef.current
    const originalDisplay = []
    input.querySelectorAll('label.relative').forEach(el => {
        originalDisplay.push({ el, display: el.style.display });
        el.style.display = 'none';
    });
    input.querySelectorAll('button').forEach(el => {
      if (el.textContent === 'Ver detalles') {
        originalDisplay.push({ el, display: el.style.display });
        el.style.display = 'none';
      }
    });

    try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("usuarios_vista_actual.pdf");
    } catch (error) {
        console.error("Error al generar PDF:", error);
    } finally {
        originalDisplay.forEach(({ el, display }) => {
            el.style.display = display;
        });
    }
  }

  // --- Lógica de exportación a Excel (XLSX) ---
  const handleExportExcel = () => {
    const dataToExport = usersPerPage === -1 ? filteredUsers : usersToDisplay

    if (dataToExport.length === 0) {
      alert("No hay usuarios para exportar.")
      return
    }

    // Mapea los datos a un formato que XLSX pueda entender, seleccionando solo las columnas deseadas
    const worksheetData = dataToExport.map((user) => ({
      ID: user.id,
      Nombre: user.firstName,
      Apellido: user.lastName,
      Email: user.email,
      Estado: user.isActive ? "Activo" : "Inactivo",
    }))

    // Crea una nueva hoja de cálculo a partir de los datos JSON
    const ws = XLSX.utils.json_to_sheet(worksheetData)

    // Crea un nuevo libro de trabajo y añade la hoja
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios") // "Usuarios" es el nombre de la pestaña en Excel

    // Escribe el archivo Excel y lo descarga
    XLSX.writeFile(wb, "usuarios_vista_actual.xlsx")
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {" "}
      {/* Este es el elemento padre raíz */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total de usuarios: <span className="font-medium">{filteredUsers.length}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportPdf}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Exportar PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Exportar Excel
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-2/3">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="usersPerPage" className="text-sm text-gray-600">
              Mostrar:
            </label>
            <select
              id="usersPerPage"
              value={usersPerPage}
              onChange={handleUsersPerPageChange}
              className="py-2 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={-1}>Todos</option>
            </select>
          </div>
        </div>
      </div>

      {/* La ref para la tabla está en este div, que contiene la tabla completa */}
      <div ref={tableRef}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersToDisplay.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.image || "/placeholder.svg?height=32&width=32"}
                      alt={user.firstName}
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer mr-3">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => handleToggleUserStatus(user.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => onSelectUser && onSelectUser(user)}
                    className="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron usuarios</p>
        </div>
      )}

      {usersPerPage !== -1 && totalPages > 1 && (
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700 mb-2 sm:mb-0">
            Mostrando {((currentPage - 1) * usersPerPage) + 1} a {Math.min(currentPage * usersPerPage, filteredUsers.length)} de{" "}
            {filteredUsers.length} usuarios
          </div>
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Anterior
            </button>
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}