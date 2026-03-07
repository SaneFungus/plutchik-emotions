import path from "path"
import { fileURLToPath } from "url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  // base: './' jest kluczowe dla GitHub Pages, aby ścieżki do plików były poprawne
  base: "./",
  plugins: [
    react(),
    tailwindcss(),
    // Ponieważ używasz viteSingleFile, base: './' zapewni, że wszystko zadziała bezbłędnie
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Upewniamy się, że folder wyjściowy to 'dist' (standard dla większości akcji)
    outDir: "dist",
  },
})
