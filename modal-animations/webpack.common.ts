import webpack from 'webpack';
import path from 'path';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const appDirectory = path.resolve(__dirname);

// Add every react-native package that needs compiling
const compileNodeModules = [
  'react-native-animatable',
  'react-native-vector-icons',
  'react-native-walkthrough-tooltip',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const compileExternalModifiedLibraries = [

].map(moduleName => path.resolve(appDirectory, `externalLibraries/modified/${moduleName}`));

const compileExternalRawLibraries = [

].map(moduleName => path.resolve(appDirectory, `externalLibraries/raw/${moduleName}`));

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.tsx'), // Entry to your application
    path.resolve(appDirectory, 'App.tsx'), // Change this to your main App file
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules,
    ...compileExternalModifiedLibraries,
    ...compileExternalRawLibraries,
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['react-native-web', 'lodash'],
      presets: ['module:metro-react-native-babel-preset', ['@babel/env', { 'targets': { 'node': 6 } }]],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|mp4|svg|webp)$/,
  type: 'asset/resource',
  generator: {
    filename: 'static/imagesAndVideos/[name].[contenthash][ext][query]',
  },
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  type: 'asset/resource',
  include: path.resolve(__dirname, 'node_modules/react-native-vector-icons/Fonts'),
  generator: {
    filename: 'static/fonts/[name].[contenthash][ext][query]',
  },
};

const cssLoaderConfiguration = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  include: [
    path.resolve(__dirname, 'src/css'),
  ],
};

const commonConfig: webpack.Configuration = {
  entry: {
    app: path.join(__dirname, 'index.web.tsx'),
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    publicPath: '/',
    filename: 'eksperience.[contenthash].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    },
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      ttfLoaderConfiguration,
      cssLoaderConfiguration,
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin({ shorthands: true }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
    }),

    new FaviconsWebpackPlugin({
      logo: 'src/resources/images/favicon.png',
      cache: true,
      prefix: 'favicons/',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  externals: {
    // react-native-calendars has moment as an optional dependency but compilation will fail
    // when it tries to optionally retrieve it. This helps to prevent the crash.
    'moment': "require('moment')",
  },
};

export default commonConfig;
