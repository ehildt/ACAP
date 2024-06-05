import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';


export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const productionConfig = isProduction
    ? {
      cssMinify: true,
      minify: true,
    }
    : {
      cssMinify: false,
      minify: false,
    };

  return {
    plugins: [tsConfigPaths(), react()],
    envDir: './env',
    resolve: {
      alias: { '@styles': path.resolve(__dirname, './src/scss') }
    },
    build: {
      ...productionConfig,
      emptyOutDir: true,
      rollupOptions: {
        treeshake: true,
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase' as any,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './test-setup.ts',
      coverage: {
        reporter: 'json',
      },
      css: {
        modules: {
          classNameStrategy: 'stable',
        },
      },
    },
  };
});
