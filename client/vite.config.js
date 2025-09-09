import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '5173-rodriiit-interfacessegu-697hk6yncij.ws-us120.gitpod.io',
      '.gitpod.io'
    ]
  }
})
