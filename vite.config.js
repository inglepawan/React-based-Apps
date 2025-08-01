import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['antd', '@ant-design/icons'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
          calendar: ['@fullcalendar/react', '@fullcalendar/core', '@fullcalendar/daygrid', '@fullcalendar/timegrid', '@fullcalendar/interaction', '@fullcalendar/list'],
          charts: ['chart.js', 'react-chartjs-2', 'recharts'],
          firebase: ['firebase', '@firebase/auth', '@firebase/firestore'],
          forms: ['formik', 'yup'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          utils: ['axios', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
