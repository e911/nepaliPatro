import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` uses relative asset paths, so the build works whether it's
// served from a GitHub Pages project site (username.github.io/repo-name/)
// or a root/user site (username.github.io) -- no need to hardcode the repo
// name here. This app has no client-side routing, so relative paths are
// safe with no caveats.
export default defineConfig({
  plugins: [react()],
  base: './',
});
