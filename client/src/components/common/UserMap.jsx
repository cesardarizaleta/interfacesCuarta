import { useEffect, useRef, useState } from "react"

export default function UserMap({ latitude, longitude, userName }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const containerIdRef = useRef(`map-${Math.random().toString(36).substr(2, 9)}`)
  const [mapError, setMapError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Coordenadas por defecto (Ciudad de México) si las proporcionadas no son válidas
  const defaultLat = 19.4326
  const defaultLng = -99.1332

  // Validar y usar coordenadas por defecto si es necesario
  const validLat = latitude && !isNaN(latitude) && latitude !== 0 ? latitude : defaultLat
  const validLng = longitude && !isNaN(longitude) && longitude !== 0 ? longitude : defaultLng
  const isUsingDefault = latitude === 0 || longitude === 0 || !latitude || !longitude

  useEffect(() => {
    let isMounted = true

    const loadLeaflet = async () => {
      try {
        setIsLoading(true)
        setMapError(null)

        if (typeof window !== "undefined" && !window.L) {
          // Cargar CSS de Leaflet
          if (!document.querySelector('link[href*="leaflet.css"]')) {
            const link = document.createElement("link")
            link.rel = "stylesheet"
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            document.head.appendChild(link)
          }

          // Cargar JS de Leaflet
          if (!document.querySelector('script[src*="leaflet.js"]')) {
            const script = document.createElement("script")
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            script.onload = () => {
              if (isMounted) {
                setTimeout(() => initializeMap(), 100)
              }
            }
            script.onerror = () => {
              if (isMounted) {
                setMapError("Error al cargar Leaflet")
                setIsLoading(false)
              }
            }
            document.head.appendChild(script)
          } else {
            setTimeout(() => initializeMap(), 100)
          }
        } else if (window.L) {
          setTimeout(() => initializeMap(), 100)
        }
      } catch {
        if (isMounted) {
          setMapError("Error al inicializar el mapa")
          setIsLoading(false)
        }
      }
    }

    const initializeMap = () => {
      try {
        if (!isMounted || !mapRef.current || !window.L) return

        // Limpiar instancia anterior si existe
        if (mapInstanceRef.current) {
          try {
            mapInstanceRef.current.remove()
          } catch (e) {
            console.warn("Error al limpiar mapa anterior:", e)
          }
          mapInstanceRef.current = null
        }

        // Limpiar el contenedor
        if (mapRef.current) {
          mapRef.current.innerHTML = ""
          mapRef.current._leaflet_id = null
        }

        // Crear nuevo mapa
        const map = window.L.map(mapRef.current, {
          center: [validLat, validLng],
          zoom: isUsingDefault ? 10 : 13,
          zoomControl: true,
          scrollWheelZoom: true,
        })

        // Agregar tiles
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 18,
        }).addTo(map)

        // Crear marcador personalizado
        const customIcon = window.L.divIcon({
          className: "custom-div-icon",
          html: `<div style="
            background-color: ${isUsingDefault ? "#f59e0b" : "#ef4444"}; 
            width: 24px; 
            height: 24px; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px; 
              height: 8px; 
              background-color: white; 
              border-radius: 50%;
            "></div>
          </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        // Agregar marcador
        const marker = window.L.marker([validLat, validLng], { icon: customIcon }).addTo(map)

        const popupContent = isUsingDefault
          ? `<div style="text-align: center; padding: 8px;">
              <strong style="color: #1f2937; font-size: 14px;">${userName}</strong><br>
              <span style="color: #f59e0b; font-size: 12px;">📍 Ubicación por defecto</span><br>
              <span style="color: #9ca3af; font-size: 11px;">
                Ciudad de México<br>
                ${validLat.toFixed(4)}, ${validLng.toFixed(4)}
              </span>
            </div>`
          : `<div style="text-align: center; padding: 8px;">
              <strong style="color: #1f2937; font-size: 14px;">${userName}</strong><br>
              <span style="color: #6b7280; font-size: 12px;">📍 Ubicación del usuario</span><br>
              <span style="color: #9ca3af; font-size: 11px;">
                ${validLat.toFixed(4)}, ${validLng.toFixed(4)}
              </span>
            </div>`

        marker.bindPopup(popupContent).openPopup()

        mapInstanceRef.current = map

        // Ajustar el mapa después de un delay
        setTimeout(() => {
          if (mapInstanceRef.current && isMounted) {
            mapInstanceRef.current.invalidateSize()
          }
        }, 200)

        setIsLoading(false)
      } catch (error) {
        console.error("Error al inicializar mapa:", error)
        if (isMounted) {
          setMapError("Error al crear el mapa")
          setIsLoading(false)
        }
      }
    }

    loadLeaflet()

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
        } catch (e) {
          console.warn("Error al limpiar mapa en cleanup:", e)
        }
        mapInstanceRef.current = null
      }
    }
  }, [validLat, validLng, userName, isUsingDefault])

  if (mapError) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-gray-900">Ubicación en el Mapa</h4>
          <div className="flex items-center space-x-2 text-sm text-red-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error al cargar mapa</span>
          </div>
        </div>

        <div className="w-full h-64 rounded-lg border border-red-300 bg-red-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 font-medium">No se pudo cargar el mapa</p>
            <p className="text-red-500 text-sm">{mapError}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Usuario:</span>
              <p className="text-gray-900">{userName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Latitud:</span>
              <p className="text-gray-900">{validLat.toFixed(6)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Longitud:</span>
              <p className="text-gray-900">{validLng.toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-gray-900">Ubicación en el Mapa</h4>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{isLoading ? "Cargando..." : "Mapa Interactivo"}</span>
        </div>
      </div>

      {isUsingDefault && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-amber-800 text-sm">
              <strong>Ubicación por defecto:</strong> No se encontraron coordenadas válidas para este usuario, mostrando
              Ciudad de México.
            </p>
          </div>
        </div>
      )}

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Cargando mapa...</p>
            </div>
          </div>
        )}

        <div
          ref={mapRef}
          id={containerIdRef.current}
          className="w-full h-64 rounded-lg border border-gray-300 shadow-sm"
          style={{ minHeight: "256px" }}
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Usuario:</span>
            <p className="text-gray-900">{userName}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Latitud:</span>
            <p className="text-gray-900">{validLat.toFixed(6)}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Longitud:</span>
            <p className="text-gray-900">{validLng.toFixed(6)}</p>
          </div>
        </div>
        {isUsingDefault && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              💡 Las coordenadas originales eran: {latitude || "N/A"}, {longitude || "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
