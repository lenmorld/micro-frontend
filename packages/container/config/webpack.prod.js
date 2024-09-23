const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

console.log("CONTAINER PROD domain: ", domain)

// test change 3
const prodConfig = {
    mode: 'production', // js minified, optimized
    output: {
        filename: '[name].[contenthash].js',
        // HTMLWebpackPlugin will prepend the files with this path
        // this matches the path we have in S3
        // e.g. /container/latest/main.1234.js
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)