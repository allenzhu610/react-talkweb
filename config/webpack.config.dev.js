'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const address = require('address');

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

// --------------------------
// 根据npm参数决定入口文件 npm run dev --dingding
let entry = [];
const dingding = process.env.npm_config_dingding || undefined;
console.log('dev time:', new Date());
if (dingding !== undefined) {
  entry = [
    'babel-polyfill',
    'whatwg-fetch',
    paths.dingtalk,
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appDingDingJs
  ];
} else {
  entry = [
    'babel-polyfill',
    'raf/polyfill',
    'whatwg-fetch',
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs
  ];
}
// --------------------------

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: entry,
  output: {
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@module': paths.appNodeModules,
      '@components': paths.components,
      '@utils': paths.utils,
      'react-native': 'react-native-web',
    },
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [{
      test: /\.(js|jsx|mjs)$/,
      enforce: 'pre',
      use: [{
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),

        },
        loader: require.resolve('eslint-loader'),
      },],
      include: paths.appSrc,
    },
      {
        oneOf: [{
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              // issue https://github.com/ant-design/babel-plugin-import/issues/249
              plugins: [
                ["import", {
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: true
                }, "antd"], // `style: true` 会加载 less 文件
                ["import", {
                  libraryName: "antd-mobile",
                  libraryDirectory: "es",
                  style: true
                }, "antd-mobile"],
              ]
            },
          },
          // --------------------------------------------
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              }
            ],
          },
          // --------------------------------------------
          {
            test: /\.less$/,
            include: [/node_modules/, /styles/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  javascriptEnabled: true,
                  modifyVars: {
                    "@icon-url": '"/iconfont/iconfont"'
                  }
                }
              }
            ],
          },
          {
            test: /\.less$/,
            exclude: [/node_modules/, /styles/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true, // 新增对css modules的支持
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  javascriptEnabled: true
                }
              }
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: {
    hints: false,
  },
  externals: {
    clientHost: (function() {
      let lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          return `"${lanUrlForConfig}"`
        } else {
          return "''"
        }
      } else {
        return "''"
      }
    })()
  }
};
