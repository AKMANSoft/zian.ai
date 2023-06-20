import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  // development
  if (command === 'serve') {
    return {
      plugins: [react()],
      build: {
        outDir: "build",
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          "react": "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
          "react/jsx-runtime": "preact/jsx-runtime"
        }
      }
    }
  // production
  } else {
    return {
      plugins: [react()],
      build: {
        outDir: "build",
      },
      base: '/static/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          "react": "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
          "react/jsx-runtime": "preact/jsx-runtime"
        }
      }
    }
  }
})
