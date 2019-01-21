// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
//import axioIn from '../src/store/axioIn';
//var pah=axioIn.baseURL;

module.exports = {
    build: {
        //pah: 'http://192.168.31.85:8000:8000',
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        //pah: 'http://localhost:8080/',
        // host: 'http://192.168.31.58',
        env: require('./dev.env'),
        port: 8080 || 8081,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        host:'0.0.0.0',
        proxyTable: {//http://192.168.40.42:8000/-----http://192.168.40.42:8000/----http://192.168.40.42:8000/——http://192.168.40.42:8000/
            '/backend': {//http://192.168.30.109/  http://192.168.30.109/
                target: 'http://192.168.30.109/',
                changeOrigin: true,
                pathRewrite: {
                    '^/backend': '/backend'
                }
            },
            '/product': {
                target: 'http://192.168.30.109/',
                changeOrigin: true,
                pathRewrite: {
                    '^/product': '/product'
                }
            },
            '/permission': {
                target: 'http://192.168.30.109/',
                changeOrigin: true,
                pathRewrite: {
                    '^/permission': '/permission'
                }
            },
            '/api': {
                target: 'http://192.168.30.109/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/operlog': {
                target: 'http://192.168.30.109/',
                changeOrigin: true,
                pathRewrite: {
                    '^/operlog': '/operlog'
                }
            },
            '/setup': {
                target: 'http://192.168.30.109/',
                changeOrigin: true,
                pathRewrite: {
                    '^/setup': '/setup'
                }
            },
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
};
