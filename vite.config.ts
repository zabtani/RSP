import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePluginFonts } from 'vite-plugin-fonts';
import { ghPages } from 'vite-plugin-gh-pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    eslintPlugin({ failOnError: true }),
    react(),
    svgrPlugin({ svgrOptions: { configFile: '.svgrrc.json' } }),
    VitePluginFonts({ google: { families: ['Roboto'] } }),
    ghPages(),
  ],
});
