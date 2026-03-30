import 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

import type { Configuration } from 'webpack';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
      {
        test: /\.s?css$/i,
        oneOf: [
          {
            include: /node_modules/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: isDevelopment,
                },
              },
              'sass-loader',
            ],
          },
          {
            include: /src/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: isDevelopment,
                },
              },
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  hoistUseStatements: true,
                  resources: ['./src/stylesheets/includes/**/*.scss'],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Pre POC MCP Server GPT App',
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  },
};

export default config;
