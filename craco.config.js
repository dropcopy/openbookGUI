const CracoLessPlugin = require('craco-less');
const webpack = require("webpack");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#2abdd2' },
            javascriptEnabled: true,
          },
        },
      },
    }, {plugin: new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
    })},
  ],
  webpack: {
    configure: {
          resolve: {
            fallback: {
              process: require.resolve("process/browser"),
              zlib: require.resolve("browserify-zlib"),
              stream: false,
              util: require.resolve("util"),
              assert: require.resolve("assert"), 
              "http": require.resolve("stream-http"), 
              "crypto": require.resolve("crypto-browserify"), 
              "stream": require.resolve("stream-browserify"),  
              "https": require.resolve("https-browserify"),   
              "process": require.resolve("process"), 
              "os": false,
              "fs": false,
              "path": false,
            }
         }
    }
  }
};
