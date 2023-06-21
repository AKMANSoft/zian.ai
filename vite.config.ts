import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  // development
  if (command === 'serve') {
    return {
      plugins: [react()],
      // plugins: [react({ fastRefresh: false })],
      worker: {
        plugins: [react()],
      },
      // base: '/static/',
      // server: {
      //   host: 'localhost',
      //   port: 3000,
      //   open: false,
      //   watch: {
      //     usePolling: true,
      //     disableGlobbing: false,
      //   },
      // },
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
        },
      }
    }
  // production
  } else {
    return {
      plugins: [react()],
      // plugins: [react({ fastRefresh: false })],
      base: '/static/',
      build: {
        outDir: "build",
        // manifest: true,
        // rollupOptions: {
        //   input: {
        //     main: 'src/App.tsx',
        //   },
        // },
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
  }
})
