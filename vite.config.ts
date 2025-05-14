import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ładujemy zmienne środowiskowe
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/cheerful-baker-web/',
    server: {
      host: "localhost",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Dodajemy globalną zmienną PUBLIC_URL dostępną w całej aplikacji
      'process.env.PUBLIC_URL': JSON.stringify('/cheerful-baker-web/'),
      // Dla kompatybilności z Vite możemy też dodać:
      'import.meta.env.PUBLIC_URL': JSON.stringify('/cheerful-baker-web/')
    }
  }
});
