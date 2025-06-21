import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Config from './pages/config/Index'
import Colors from './pages/config/Colors'
import Fonts from './pages/config/Fonts'
import { ThemeProvider } from './context/ThemeContext'


export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/config" element={<Config />} />
        <Route path="/config/colors" element={<Colors />} />
        <Route path="/config/fonts" element={<Fonts />} />
      </Routes>
    </ThemeProvider>
  )
}
