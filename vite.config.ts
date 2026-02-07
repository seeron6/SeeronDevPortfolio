import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Modern ESM way to get __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Required for GitHub Pages
  base: './', 
  
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // This maps the @ symbol to your src folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})