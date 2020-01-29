const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

switch (process.env.NODE_ENV) {
  case 'production': {
    module.exports = merge(common, {
      mode: 'production',
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              name: 'commons',
              minChunks: 2
            }
          }
        }
      }
    });

    break;
  }

  default: {
    module.exports = merge(common, {
      mode: 'development',
      devServer: {
        open: true,
        port: 2408
      }
    });
  }
};
