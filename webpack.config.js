var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  devtool: "source-map",
	devServer: {
	    inline: true,
	    port: 4444,
	    contentBase: "./dist"
	},
    eslint:{
        configFile: '.eslintrc'
    },
  module: {
        preLoaders: [
            // {
            //     test: /\.js$/,
            //     exclude: [/node_modules/],
            //     loader: "eslint-loader"
            // }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
    ]
}
