import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex flex-col">
            <span className="text-sm font-bold tracking-wider text-stone-800">LANDING</span>
            <span className="text-xs font-light tracking-wider text-stone-600">PHOTOGRAPHY</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-stone-700 hover:text-stone-900 font-medium">
              Home
            </Link>
            <a href="#about" className="text-stone-700 hover:text-stone-900 font-medium">
              About
            </a>
            <a href="#portfolio" className="text-stone-700 hover:text-stone-900 font-medium">
              Portfolio
            </a>
            <Link
              to="#contact-us"
              className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors"
            >
              Contact us
            </Link>
            <Link
              to="/login"
              className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-stone-700 hover:text-stone-900">
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              Home
            </Link>
            <a href="#about" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              About
            </a>
            <a href="#portfolio" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              Portfolio
            </a>
            <a href="#contact" className="block text-stone-700 hover:text-stone-900 font-medium" onClick={closeMenu}>
              Contact
            </a>
            <Link
              to="/login"
              className="block bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors w-fit"
              onClick={closeMenu}
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
