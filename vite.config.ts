import { defineConfig } from 'vite'
import { configDefaults as vitestConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [
      ...vitestConfigDefaults.exclude,      
      '**/*.helper.test.ts' // allows test utils files that don't have their own test suits
    ],
  },
})
