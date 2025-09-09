import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Importar las paletas desde el archivo JSON
import palettesData from '../../../palettes.json'

const ColorContext = createContext()

export const useColors = () => {
  const context = useContext(ColorContext)
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider')
  }
  return context
}

export const ColorProvider = ({ children }) => {
  const [palettes, setPalettes] = useState([])
  const [activePaletteId, setActivePaletteId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Función para aplicar variables CSS al documento
  const applyCSSVariables = useCallback((palette) => {
    if (!palette) return

    const root = document.documentElement
    const colors = palette.colors

    // Aplicar variables CSS
    root.style.setProperty('--primary-color', colors.primary)
    root.style.setProperty('--secondary-color', colors.secondary)
    root.style.setProperty('--accent-color', colors.accent)
    root.style.setProperty('--text-color', colors.text)
    root.style.setProperty('--neutral-color', colors.neutral)

    // Aplicar variables adicionales para fondos
    root.style.setProperty('--bg-primary', colors.secondary || '#f5f5f4')
    root.style.setProperty('--bg-secondary', colors.secondary || '#ffffff')
    root.style.setProperty('--bg-accent', colors.neutral || '#e7e5e4')

    // Aplicar variables para bordes
    root.style.setProperty('--border-primary', colors.neutral || '#d6d3d1')
    root.style.setProperty('--border-secondary', colors.neutral || '#e7e5e4')

    // Aplicar variables para sombras
    root.style.setProperty('--shadow-primary', 'rgba(0, 0, 0, 0.1)')
    root.style.setProperty('--shadow-secondary', 'rgba(0, 0, 0, 0.05)')

    console.log('CSS Variables applied:', {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      text: colors.text,
      neutral: colors.neutral
    })

    // Colores adicionales calculados
    root.style.setProperty('--primary-hover', adjustColor(colors.primary, -10))
    root.style.setProperty('--primary-light', adjustColor(colors.primary, 20))
    root.style.setProperty('--secondary-hover', adjustColor(colors.secondary, -5))
    root.style.setProperty('--accent-hover', adjustColor(colors.accent, -10))
    root.style.setProperty('--text-muted', adjustColor(colors.text, 30))
    root.style.setProperty('--neutral-hover', adjustColor(colors.neutral, -5))
  }, [])

  // Función para ajustar el brillo de un color
  const adjustColor = (color, amount) => {
    const usePound = color[0] === '#'
    const col = usePound ? color.slice(1) : color

    const num = parseInt(col, 16)
    let r = (num >> 16) + amount
    let g = (num >> 8 & 0x00FF) + amount
    let b = (num & 0x0000FF) + amount

    r = r > 255 ? 255 : r < 0 ? 0 : r
    g = g > 255 ? 255 : g < 0 ? 0 : g
    b = b > 255 ? 255 : b < 0 ? 0 : b

    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0')
  }

  // Función para validar contraste de colores
  const validateColorContrast = (palette) => {
    const colors = palette.colors
    const warnings = []

    // Validar contraste entre texto y fondo
    const textLuminance = getLuminance(colors.text)
    const secondaryLuminance = getLuminance(colors.secondary)
    const contrastRatio = getContrastRatio(textLuminance, secondaryLuminance)

    if (contrastRatio < 4.5) {
      warnings.push('El contraste entre el color de texto y el fondo secundario es bajo')
    }

    // Validar contraste entre texto y fondo neutro
    const neutralLuminance = getLuminance(colors.neutral)
    const neutralContrast = getContrastRatio(textLuminance, neutralLuminance)

    if (neutralContrast < 4.5) {
      warnings.push('El contraste entre el color de texto y el fondo neutro es bajo')
    }

    return warnings
  }

  // Función auxiliar para calcular luminancia
  const getLuminance = (color) => {
    const rgb = hexToRgb(color)
    if (!rgb) return 0

    const { r, g, b } = rgb
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  // Función auxiliar para calcular ratio de contraste
  const getContrastRatio = (l1, l2) => {
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  }

  // Función auxiliar para convertir hex a RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Inicializar paletas y cargar desde localStorage
  useEffect(() => {
    const initializeColors = async () => {
      try {
        // Cargar paletas desde el archivo JSON
        let loadedPalettes = [...palettesData.palettes]

        // Cargar paletas personalizadas desde localStorage
        const storedPalettes = localStorage.getItem('customPalettes')
        if (storedPalettes) {
          const customPalettes = JSON.parse(storedPalettes)
          loadedPalettes = [...loadedPalettes, ...customPalettes]
        }

        setPalettes(loadedPalettes)

        // Cargar paleta activa desde localStorage o usar la predeterminada
        const storedActiveId = localStorage.getItem('activePaletteId')
        const activeId = storedActiveId || palettesData.activePaletteId

        setActivePaletteId(activeId)

        // Aplicar la paleta activa
        const activePalette = loadedPalettes.find(p => p.id === activeId)
        if (activePalette) {
          applyCSSVariables(activePalette)
        }

      } catch (error) {
        console.error('Error initializing colors:', error)
        // Fallback a paletas por defecto
        setPalettes(palettesData.palettes)
        setActivePaletteId(palettesData.activePaletteId)
      } finally {
        setIsLoading(false)
      }
    }

    initializeColors()
  }, [applyCSSVariables])

  // Aplicar variables CSS cuando cambia la paleta activa
  useEffect(() => {
    if (activePaletteId && palettes.length > 0) {
      const activePalette = palettes.find(p => p.id === activePaletteId)
      if (activePalette) {
        applyCSSVariables(activePalette)
        localStorage.setItem('activePaletteId', activePaletteId)

        // Forzar una recarga visual agregando/removiendo una clase temporal
        document.body.classList.add('color-update')
        setTimeout(() => {
          document.body.classList.remove('color-update')
        }, 10)
      }
    }
  }, [activePaletteId, palettes, applyCSSVariables])

  // Función para cambiar la paleta activa
  const setActivePalette = (paletteId) => {
    const palette = palettes.find(p => p.id === paletteId)
    if (palette) {
      setActivePaletteId(paletteId)
    }
  }

  // Función para guardar una nueva paleta
  const savePalette = (name, colors) => {
    const newPalette = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      colors,
      isDefault: false,
      createdAt: new Date().toISOString()
    }

    const updatedPalettes = [...palettes, newPalette]
    setPalettes(updatedPalettes)

    // Guardar paletas personalizadas en localStorage
    const customPalettes = updatedPalettes.filter(p => !p.isDefault)
    localStorage.setItem('customPalettes', JSON.stringify(customPalettes))

    return newPalette
  }

  // Función para eliminar una paleta
  const deletePalette = (paletteId) => {
    const palette = palettes.find(p => p.id === paletteId)
    if (palette && !palette.isDefault) {
      const updatedPalettes = palettes.filter(p => p.id !== paletteId)
      setPalettes(updatedPalettes)

      // Si la paleta eliminada era la activa, cambiar a la predeterminada
      if (activePaletteId === paletteId) {
        setActivePaletteId(palettesData.activePaletteId)
      }

      // Actualizar localStorage
      const customPalettes = updatedPalettes.filter(p => !p.isDefault)
      localStorage.setItem('customPalettes', JSON.stringify(customPalettes))
    }
  }

  // Función para actualizar una paleta existente
  const updatePalette = (paletteId, updates) => {
    const updatedPalettes = palettes.map(p =>
      p.id === paletteId ? { ...p, ...updates } : p
    )
    setPalettes(updatedPalettes)

    // Actualizar localStorage para paletas personalizadas
    const customPalettes = updatedPalettes.filter(p => !p.isDefault)
    localStorage.setItem('customPalettes', JSON.stringify(customPalettes))
  }

  // Obtener la paleta activa
  const activePalette = palettes.find(p => p.id === activePaletteId)

  const value = {
    palettes,
    activePalette,
    activePaletteId,
    isLoading,
    setActivePalette,
    savePalette,
    deletePalette,
    updatePalette,
    validateColorContrast,
    applyCSSVariables
  }

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  )
}

export default ColorContext