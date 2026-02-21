import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  output: {
    distPath: path.resolve(__dirname, 'dist'),
    filename: {
      js: isProduction ? '[name].[contenthash].js' : '[name].js',
    },
    cleanDistPath: true,
    assetPrefix: '/',
    sourceMap: {
      js: isProduction ? 'source-map' : 'eval-source-map',
    },
    minify: isProduction,
    copy: [
      {
        from: path.resolve(__dirname, 'azure/staticwebapp.config.json'),
        to: path.resolve(__dirname, 'dist/staticwebapp.config.json'),
      },
    ],
  },
  html: {
    template: './public/index.html',
    favicon: './public/favicon.ico',
  },
  plugins: [pluginReact()],
  performance: {
    chunkSplit: {
      strategy: 'custom',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          app: {
            name: 'app',
            chunks: 'all',
            enforce: true,
            priority: 40,
            reuseExistingChunk: true,
            test: /src[\\/]/,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10,
            reuseExistingChunk: true,
          },
          kendo: {
            test: /node_modules[\\/](kendo|@progress)[\\/]/,
            name: 'kendo',
            chunks: 'all',
            priority: 30,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
  server: {
    publicDir: {
      name: 'public',
      copyOnBuild: true,
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
});
