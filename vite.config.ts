import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                background: "./src/background.ts",
                popup: "./src/components/popup.ts",
                options: "./src/components/options.ts"
            },
            output: {
                entryFileNames: `src/[name].js`,
            },
        }
    },
});