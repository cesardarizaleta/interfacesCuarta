import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Config from "./pages/config/Index"
import Colors from "./pages/config/Colors"
import Fonts from "./pages/config/Fonts"
import Multimedia from "./pages/config/Multimedia"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/config" element={<Config />} />
      <Route path="/config/colors" element={<Colors />} />
      <Route path="/config/fonts" element={<Fonts />} />
      <Route path="/config/multimedia" element={<Multimedia />} />
    </Routes>
  )
}
