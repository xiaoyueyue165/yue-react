const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const config = require("./config");
const isProd = process.env.NODE_ENV === "production";

let pathsToClean = ["dist"];
const webpackConfig = {
  entry: {
    "app.bundle": "./src/app.jsx",
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[hash].js'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'moment': 'moment',
    'antd': 'antd',
    'lodash': '_'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",

      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    // 已在 .babelrc 中配置
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // }),
    // clearn dist
    new CleanWebpackPlugin(pathsToClean),
    // 热加载
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Ignore all locale files of moment.js https://blog.csdn.net/qq_31061615/article/details/80745538
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Webpack3 新功能: Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

  ],
  module: {
    rules: [
      // TODO:第一个是图片加载器，不随便移动位置，prod有更新
      {
        test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/images/"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },

      // 下面几行才是 html-loader 的配置内容
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   loader: 'eslint-loader',
      // },
    ]
  },
  devServer: {
    port: config.port,
    open: true,
    hot: true
  },
  devtool: "source-map"
};

const ProdAddPlugins = [new BundleAnalyzerPlugin() // 生产环境，压缩混淆并移除console
  //  FIXME: ERROR in bundle.js from UglifyJs
  // TypeError: Cannot read property 'sections' of null
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //     drop_console: true,
  //     pure_funcs: ['console.log']
  //   },
  //   sourceMap: false
  // })
]

isProd ?
  function () {
    ProdAddPlugins.forEach(plugin => {
      webpackConfig.plugins.push(plugin)
      // 压缩图片
      webpackConfig.module.rules[0].use.push(
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          }
        }
      )
    })
  }()
  : '';
module.exports = webpackConfig;
