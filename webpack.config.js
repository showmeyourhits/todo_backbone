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
  module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /typings/],
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
}
