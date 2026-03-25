import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // HTTP only by default. Open http://<this-machine-LAN-IP>:3000 from other devices.
    proxy: {
      // Same-origin /api in dev; proxy targets API on this machine (works for LAN clients too).
      '/api': {
        target: 'http://127.0.0.1:5043',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true,
  },
});
