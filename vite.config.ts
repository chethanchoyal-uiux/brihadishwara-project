import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/public.zip', '**/*.zip', '**/_doc_compare_tmp/**'],
    },
  },
})
