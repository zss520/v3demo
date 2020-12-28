const httpUrls = require('./src/api/httpUrl')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|jpg|png)(\?.*)?$/i
require('babel-polyfill')

module.exports = {
    publicPath: './', // 公共路径
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            sass: {
                // 这里的选项会传递给 sass-loader
                loader: 'sass-loader'
            },
            less: {
                // 这里的选项会传递给 less-loader
                loader: 'less-loader'
            },
            scss: {
                // 这里的选项会传递给 scss-loader
                loader: 'scss-loader',
                prependData: '@import "~@/assets/share.module.scss";'
            }
        }
    },
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: false
        },
        open: false,
        host: '0.0.0.0',
        port: 4000,
        https: false,
        hotOnly: true,
        proxy: {
            '/tokenApi': {
                target: httpUrls.httpUrls.apiUrl,
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    '/tokenApi' : '/'
                }
            }
        }
    },
    configureWebpack: {

    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
                .use(new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: true
                }))
        }
    }
}
