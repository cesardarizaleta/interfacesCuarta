# 🌟 Interfaces Cuarta - Con Loader de Tangram

## 🎬 Descripción

Aplicación React completa con loader animado de Tangram hecho con HTML, CSS y JavaScript puro.

## 🚀 Cómo Ejecutar (Flujo Simplificado)

### Windows:
```bash
./run-with-loader.bat
```

### Linux/Mac:
```bash
./run-with-loader.sh
```

## 🎯 Flujo de Ejecución

1. **Script ejecuta:** `npm run dev` automáticamente
2. **Abre loader:** `client/src/components/common/index.html`
3. **Animación:** Tangram 3D durante ~15 segundos
4. **Redirección:** Automática al enlace externo
5. **App lista:** Todas las funcionalidades disponibles

## 🔗 Redirección Automática

Cuando termine la animación del Tangram, redirigirá automáticamente a:
```
https://5173-cesardariza-interfacesc-dg3uerxa0yc.ws-us121.gitpod.io/
```

## ✨ Características Implementadas

### 🎨 Sistema de Colores Dinámico
- **Variables CSS Personalizadas:** Sistema completo de variables CSS para colores
- **Paletas de Colores:** 7 paletas predefinidas + capacidad para crear personalizadas
- **Persistencia:** localStorage + archivo JSON para guardar paletas
- **Aplicación Global:** Los colores se aplican dinámicamente a toda la aplicación
- **Validación de Contraste:** Verificación automática de accesibilidad
- **Colores Personalizados:**
  - Color Primario: #57534E
  - Color Secundario: #FFFFFF
  - Color de Acento: #44403C
  - Color de Texto: #78716C
  - Fondo Neutro: #E7E5E4

### � Loader de Tangram
- Animación 3D con figuras geométricas
- 7 piezas con colores vibrantes
- Movimientos coreografiados
- Responsive y moderno

### 🎯 Funcionalidades de la App
- **Edición de Subtítulos:** En videos del carousel
- **Dashboard Dual:** Vista Administrador/Usuario
- **Perfil Editable:** Con upload de foto
- **Interfaz Moderna:** Con Tailwind CSS

## 🎨 Sistema de Colores - Documentación Técnica

### Variables CSS Disponibles
```css
:root {
  /* Colores Primarios */
  --primary-color: #57534E;      /* Color principal */
  --primary-hover: #4a4541;      /* Hover del color principal */
  --primary-light: #6b6762;      /* Variante clara */

  /* Colores Secundarios */
  --secondary-color: #FFFFFF;    /* Color secundario */
  --secondary-hover: #f8f8f8;   /* Hover del color secundario */

  /* Colores de Acento */
  --accent-color: #44403C;       /* Color de acento */
  --accent-hover: #3a3531;       /* Hover del color de acento */

  /* Colores de Texto */
  --text-color: #78716C;         /* Color de texto principal */
  --text-muted: #9a938e;         /* Color de texto secundario */

  /* Colores Neutros */
  --neutral-color: #E7E5E4;      /* Color neutro */

  /* Fondos */
  --bg-primary: #f5f5f4;         /* Fondo primario */
  --bg-secondary: #ffffff;       /* Fondo secundario */
  --bg-accent: #e7e5e4;          /* Fondo de acento */

  /* Bordes */
  --border-primary: #d6d3d1;     /* Borde primario */
  --border-secondary: #e7e5e4;   /* Borde secundario */

  /* Sombras */
  --shadow-primary: rgba(0, 0, 0, 0.1);
  --shadow-secondary: rgba(0, 0, 0, 0.05);
}
```

### Componentes Actualizados
Los siguientes componentes usan el sistema de variables CSS:
- ✅ **Navbar** - Fondo, texto, botones, menú móvil
- ✅ **MainSection** - Títulos, texto, botones, enlaces sociales
- ✅ **AboutSection** - Títulos, texto, enlaces, círculos decorativos
- ✅ **ImageCarousel** - Títulos, badges, modales, navegación
- ✅ **VideoCarousel** - Títulos, overlays, modales, navegación
- ✅ **ServicesSection** - Títulos, texto, círculos decorativos
- ✅ **PortfolioSection** - Títulos, texto, enlaces, círculos decorativos
- ✅ **ContactSection** - Títulos, formulario, botones, círculos decorativos

### Módulo de Colores (NO MODIFICADO)
- ✅ Mantiene sus estilos originales
- ✅ Funcionalidad completa intacta
- ✅ Solo afecta a componentes de la página principal

## 📁 Estructura del Proyecto

```
interfacesCuarta/
├── client/                    # App React
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Loader HTML/CSS/JS
│   │   │   │   ├── index.html
│   │   │   │   ├── styles.css
│   │   │   │   └── script.js
│   │   │   └── VideoCarousel.jsx
│   │   └── pages/
│   │       └── Dashboard.jsx
│   └── package.json
├── run-with-loader.bat        # Script Windows
├── run-with-loader.sh         # Script Linux/Mac
└── README.md
```

## 🎨 Tecnologías

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Loader:** HTML5 Canvas + JavaScript
- **Animaciones:** CSS + JavaScript puro

## 📝 Notas

- El loader se ejecuta solo la primera vez
- Para resetear: `localStorage.clear()` en consola
- Redirección automática al enlace externo de Gitpod

¡Disfruta tu aplicación con el espectacular loader de Tangram! 🎨✨