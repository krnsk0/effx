import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({include: ['lib']})],
  build: {
    lib: {
      entry: path.resolve(__dirname, '/lib/effx.ts'),
      name: 'effx',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    }
  },
})
