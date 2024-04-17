module.exports = {
    // 기존의 웹팩 설정들...
    resolve: {
        fallback: {
            "util": require.resolve("util/"),
            "url": require.resolve("url/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "buffer": require.resolve("buffer/"),
        },
        alias: { '@components': path.resolve(__dirname, 'src/components') },
        extensions: ['.ts', '.js'],
        optimization: { splitChunks: { chunks: 'all' } }
    },
    module: {
        rules: [
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: [
                'thread-loader',
                {
                    loader: 'babel-loader',
                    options: {
                        // cacheDirectory: true
                        workers: require('os').cpus().length - 1
                    }
                }
              ],
            }
          ]
    },
};