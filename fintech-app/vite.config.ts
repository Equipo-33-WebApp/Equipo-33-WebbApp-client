import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc"; // Usamos -swc según tu package.json
import path from "path"; // Necesitas importar 'path'
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Define el alias @/ para que apunte a la carpeta src/
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
