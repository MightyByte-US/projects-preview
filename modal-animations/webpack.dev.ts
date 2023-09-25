import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import 'webpack-dev-server';

const devConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      // Needed because React Native always defines __DEV__ but webpack uses process.env.NODE_ENV.
      __DEV__: true,
    }),
  ],
});

export default devConfig;
