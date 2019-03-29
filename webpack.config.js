const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const config = require("./config");
const isProd = process.env.NODE_ENV === "production";

let pathsToClean = [];
const webpackConfig = {
  entry: {
    antd: [ //build the mostly used components into a independent chunk,avoid of total package over size.
      'antd/lib/input',
      'antd/lib/form',
      'antd/lib/date-picker',
      'antd/lib/pagination',
      'antd/lib/breadcrumb',
      'antd/lib/carousel',
      'antd/lib/button',
      'antd/lib/select',
      'antd/lib/checkbox',
      'antd/lib/radio',
      'antd/lib/message',
      'antd/lib/notification',
      'antd/lib/icon',
      'antd/lib/input-number',
      'antd/lib/upload',
      'antd/lib/modal',
    ],
    "app.bundle": "./src/app.jsx",
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "../"),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'react-router-redux': 'ReactRouterRedux',
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
    // clearn dist 先不删除
    // new CleanWebpackPlugin(pathsToClean),
    // 热加载
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Ignore all locale files of moment.js https://blog.csdn.net/qq_31061615/article/details/80745538
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Webpack3 新功能: Scope Hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['antd'],
      minChunks: Infinity
    })

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
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
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
    proxy: {
      '/api': {
        target: 'http://shourun.test01.qcw100.com',
        pathRewrite: { '^/api': '' },
        changeOrigin: true     // target是域名的话，跨域需要这个参数，
      },
    },
    port: config.port,
    progress: true,
    open: true,
    hot: true
  },
  devtool: "source-map"
};

const ProdAddPlugins = [new BundleAnalyzerPlugin(), // 生产环境，压缩混淆并移除console
//  FIXME:不能关闭 sourceMap
new webpack.optimize.UglifyJsPlugin({
  output: {
    comments: false // remove all comments
  },
  compress: {
    warnings: false,
    drop_console: true,
    pure_funcs: ['console.log']
  },
  sourceMap: true
})
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
