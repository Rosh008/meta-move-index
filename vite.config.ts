import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'
// @ts-ignore
import { copy } from 'vite-plugin-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copy({
    targets: [
      {
        src: 'public/_redirects',
        dest: './dist',
      },
    ],
    hook: "writeBundle", // Ensure it runs at the correct time
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
