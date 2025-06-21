import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [color, setColor] = useState('#000000')
  const [font, setFont] = useState('sans-serif')

  const changeColor = (newColor) => setColor(newColor)
  const changeFont = (newFont) => setFont(newFont)

  return (
    <ThemeContext.Provider value={{ color, font, changeColor, changeFont }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
