import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Config from "./pages/config/Index"
import Colors from "./pages/config/Colors"
import Fonts from "./pages/config/Fonts"
import ProtectedRoute from './components/ProtectedRoute'
import AccessDenied from './pages/AccessDenied'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/config" element={<Config />} />
          <Route path="/config/colors" element={<Colors />} />
          <Route path="/config/fonts" element={<Fonts />} />
        </Route>

        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
  )
}