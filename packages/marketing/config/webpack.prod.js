const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const prodConfig = {
    mode: 'production', // js minified, optimized
    output: {
        filename: '[name].[contenthash].js',
        // prepend URLs inside remoteEntry with this path
        // this matches the path we have in S3
        // e.g. /marketing/latest/main.1234.js
        publicPath: '/marketing/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap' // when Marketing is requested, serve bootstrap 
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)