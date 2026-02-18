import { rspack } from '@rspack/core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
      publicPath: '/',
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new rspack.HtmlRspackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        minify: isProduction,
      }),
      new rspack.CopyRspackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/robots.txt'),
            to: path.resolve(__dirname, 'dist/robots.txt'),
          },
          {
            from: path.resolve(__dirname, 'azure/staticwebapp.config.json'),
            to: path.resolve(__dirname, 'dist/staticwebapp.config.json'),
          },
        ],
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new rspack.SwcJsMinimizerRspackPlugin({
          extractComments: false,
          minimizerOptions: {
            format: {
              comments: false,
            },
            minify: isProduction,
          },
        }),
        new rspack.LightningCssMinimizerRspackPlugin({
          minimizerOptions: {
            errorRecovery: false,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Separate vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
      usedExports: isProduction,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
  };
};
