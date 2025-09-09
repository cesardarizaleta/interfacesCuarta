import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useColors } from "../contexts/ColorContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { activePaletteId, activePalette } = useColors()
  const [forceUpdate, setForceUpdate] = useState(0)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Forzar actualización cuando cambia la paleta
  useEffect(() => {
    if (activePaletteId) {
      // Pequeño delay para asegurar que las variables CSS se apliquen
      setTimeout(() => {
        setForceUpdate(prev => prev + 1)
      }, 50)
    }
  }, [activePaletteId])

  return (
    <nav
      key={`navbar-${forceUpdate}`}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: activePalette?.colors?.secondary || '#ffffff',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${activePalette?.colors?.neutral || '#d6d3d1'}`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex flex-col">
            <span className="text-sm font-bold tracking-wider" style={{ color: 'var(--accent-color)' }}>LANDING</span>
            <span className="text-xs font-light tracking-wider" style={{ color: 'var(--primary-color)' }}>PHOTOGRAPHY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium transition-colors" style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Home
            </Link>
            <a href="#about" className="font-medium transition-colors" style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              About
            </a>
            <a href="#portfolio" className="font-medium transition-colors" style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Portfolio
            </a>
            <Link to="/dashboard" className="font-medium transition-colors" style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Dashboard
            </Link>
            <Link to="/config" className="font-medium transition-colors" style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Configuración
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded transition-colors"
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)', ':hover': { backgroundColor: 'var(--primary-hover)' } }}
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md transition-colors" style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden py-4 space-y-4"
            style={{
              backgroundColor: activePalette?.colors?.secondary || '#ffffff',
              borderTop: `1px solid ${activePalette?.colors?.neutral || '#d6d3d1'}`
            }}
          >
            <Link to="/config" className="block font-medium transition-colors" onClick={closeMenu} style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Home
            </Link>
            <Link to="/dashboard" className="block font-medium transition-colors" onClick={closeMenu} style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Dashboard
            </Link>
            <a href="#about" className="block font-medium transition-colors" onClick={closeMenu} style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              About
            </a>
            <a href="#portfolio" className="block font-medium transition-colors" onClick={closeMenu} style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Portfolio
            </a>
            <a href="#contact" className="block font-medium transition-colors" onClick={closeMenu} style={{ color: 'var(--text-color)', ':hover': { color: 'var(--accent-color)' } }}>
              Contact
            </a>
            <Link
              to="/login"
              className="block px-4 py-2 rounded transition-colors w-fit"
              onClick={closeMenu}
              style={{ backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)', ':hover': { backgroundColor: 'var(--primary-hover)' } }}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
