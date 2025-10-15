import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace '<your-repo-name>' with the name of your GitHub repository.
  // For example, if your repository URL is https://github.com/user/my-app,
  // the base should be '/my-app/'.
  base: '/insight-quest/',
  define: {
    // This makes the environment variable available in your client-side code
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
