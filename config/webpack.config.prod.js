'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const address = require('address');

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

const cssFilename = 'static/css/[name].[contenthash:8].css';

const extractTextPluginOptions = shouldUseRelativeAssetPaths ? // Making sure that the publicPath goes back to to build folder.
  {
    publicPath: Array(cssFilename.split('/').length).join('../')
  } : {};

// --------------------------
// 根据npm参数决定入口文件 npm run dev --dingding
let entry = [];
const dingding = process.env.npm_config_dingding || undefined;
console.log('build time:', new Date());
if (dingding !== undefined) {
  entry = [
    'babel-polyfill',
    'whatwg-fetch',
    paths.dingtalk,
    paths.appDingDingJs
  ];
} else {
  entry = [
    'babel-polyfill',
    'raf/polyfill',
    'whatwg-fetch',
    paths.appIndexJs
  ];
}
// --------------------------

module.exports = {
  bail: true,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: entry,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    devtoolModuleFilenameTemplate: info => path
      .relative(paths.appSrc, info.absoluteResourcePath)
      .replace(/\\/g, '/'),
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
              compact: true,
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
          // --------------------------------------------------------
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign({
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: false,
                  },
                },
                use: [{
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap,
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
                extractTextPluginOptions
              )
            ),
          },
          // --------------------------------------------------------
          {
            test: /\.less$/,
            include: [/node_modules/, /styles/],
            loader: ExtractTextPlugin.extract(
              Object.assign({
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: false,
                  },
                },
                use: [{
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap
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
                extractTextPluginOptions
              )
            ),
          },
          {
            test: /\.less$/,
            exclude: [/node_modules/, /styles/],
            loader: ExtractTextPlugin.extract(
              Object.assign({
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: false,
                  },
                },
                use: [{
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap,
                    modules: true,
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
                extractTextPluginOptions
              )
            ),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new CSSSplitWebpackPlugin({
      size: 4000,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
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
