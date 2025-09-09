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

### 🎬 Loader de Tangram
- Animación 3D con figuras geométricas
- 7 piezas con colores vibrantes
- Movimientos coreografiados
- Responsive y moderno

### 🎯 Funcionalidades de la App
- **Edición de Subtítulos:** En videos del carousel
- **Dashboard Dual:** Vista Administrador/Usuario
- **Perfil Editable:** Con upload de foto
- **Interfaz Moderna:** Con Tailwind CSS

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