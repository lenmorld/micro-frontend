const { merge } = require('webpack-merge')

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const packageJson = require('../package.json')

const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8079,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        // Container as Host, which want to make use of remote projects 
        new ModuleFederationPlugin({
            name: 'container', // doesn't get used for anythhing, just convention
            // key value pairs of remote projects to import
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

// merge common and devConfig
module.exports = merge(commonConfig, devConfig)
