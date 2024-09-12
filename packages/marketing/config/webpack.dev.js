const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const packageJson = require('../package.json')

const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing', //name of sub-project, becomes a global var when script loads up in container
            filename: 'remoteEntry.js',
            // files we want to expose to Container
            exposes: {
                './MarketingApp': './src/bootstrap' // when Marketing is requested, serve bootstrap 
            },
            // shared
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]
}

// merge common and devConfig
module.exports = merge(commonConfig, devConfig)
