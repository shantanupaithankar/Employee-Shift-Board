import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        // Enable SPA fallback for client-side routing
        // This fixes 404 errors when refreshing pages like /admin or /dashboard
        open: true,
        strictPort: false,
    },
    preview: {
        port: 3000,
    },
})
