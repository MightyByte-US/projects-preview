import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

const progressHandler = (percentage: number, message: string, ...args: string[]) => {
  console.info('\x1b[33m', `${Math.floor(percentage * 100)}%`, '\x1b[0m', message, ...args);
};

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      // Needed because React Native always defines __DEV__ but webpack uses process.env.NODE_ENV.
      __DEV__: false,
    }),
    new webpack.ProgressPlugin(progressHandler),
  ],
});

export default prodConfig;
