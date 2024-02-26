module.exports = function override(config, env) {
    config.resolve.fallback = {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "path": require.resolve("path-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "querystring": require.resolve("querystring-es3"),
        "zlib": require.resolve("browserify-zlib"),
        // ...다른 폴리필 설정들...
    };
    return config;
};