import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // esbuild: {
  //   loader: 'jsx', // Ensures JSX syntax is parsed correctly
  //   include: /src\/.*\.js$/, // Apply to all .js files in src
  // }
})
