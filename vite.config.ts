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
    // Deploying under a custom domain requires assets to be served from the root
    // rather than a repository subdirectory. Setting base to "/" ensures the
    // build outputs correct absolute URLs for scripts and assets.
    base: '/',
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
      // Globalne wskazanie ścieżki bazowej używanej przez komponenty
      // podczas budowania na GitHub Pages z własną domeną
      'process.env.PUBLIC_URL': JSON.stringify('/'),
      // Dla kompatybilności z Vite możemy też dodać:
      'import.meta.env.PUBLIC_URL': JSON.stringify('/')
    }
  }
});
