const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",

      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    // clearn dist
    new CleanWebpackPlugin(pathsToClean),
    // 热加载
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
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

isProd ? webpackConfig.plugins.push(new BundleAnalyzerPlugin()) : "";
// 分析
module.exports = webpackConfig;
