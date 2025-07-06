import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    root: 'src/components/popup', // Postaviš root na public folder, gde se nalaze tvoji HTML fajlovi
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, './src/components/popup/popup.html'),
                nested: resolve(__dirname, './src/components/options/options.html'),
            },
    },
        outDir: '/dist', // izlazni direktorijum može biti iznad public
        emptyOutDir: true,
    },
    // Preporučljivo je koristiti `server` opciju ako želiš da testiraš
    server: {
        open: true, // Automatski otvara browser
    }
});