import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileIcon from "../assets/user.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); 
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate(); // Para redirigir al cerrar sesión
  const profileRef = useRef(null); // Para detectar clics fuera del dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token del localStorage
    localStorage.removeItem("userName"); // Elimina el nombre del usuario del localStorage
    setIsLoggedIn(false);
    setUserName(""); 
    setShowProfileDropdown(false); 
    navigate("/login"); 
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      const storedUserName = localStorage.getItem("userName");
      setIsLoggedIn(!!token);
      setUserName(storedUserName || "");
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);


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

            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors"
              >
                Login
              </Link>
            ) : (
              <div className="relative flex items-center space-x-2" ref={profileRef}> {/* Añade flex y space-x-2 */}
                {/* Muestra el nombre del usuario antes del icono */}
                {userName && (
                  <span className="text-stone-700 font-medium text-sm">
                    Hola, {userName.split(' ')[0]} {/* Muestra solo el primer nombre */}
                  </span>
                )}

                <button
                  onClick={toggleProfileDropdown}
                  className="p-2 rounded-full text-stone-700 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
                  aria-haspopup="true"
                  aria-expanded={showProfileDropdown ? "true" : "false"}
                >
                  <img
                    src={UserProfileIcon}
                    alt="User Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userName && (
                      <div className="px-4 py-2 text-sm text-stone-800 font-semibold border-b border-stone-100 mb-1">
                        {userName}
                      </div>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      Ver Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
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
            {/* Renderizado condicional para móvil */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="block bg-stone-700 text-white px-4 py-2 rounded hover:bg-stone-800 transition-colors w-fit"
                onClick={closeMenu}
              >
                Login
              </Link>
            ) : (
              //movil profile dropdown
              <div className="flex flex-col space-y-2">
                 <Link
                    to="/profile"
                    className="block text-stone-700 hover:text-stone-900 font-medium"
                    onClick={closeMenu}
                  >
                    Ver Perfil
                  </Link>
                  <button
                    onClick={() => { handleLogout(); closeMenu(); }}
                    className="block w-full text-left text-red-600 hover:text-red-800 font-medium"
                  >
                    Cerrar Sesión
                  </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;