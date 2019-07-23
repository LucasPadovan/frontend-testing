const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');

const clientConfig = {
    entry: './client/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        {
            test: /\.(css|scss)$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/main.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'ds'), 'node_modules'],
        extensions: ['*', '.js', '.jsx'],
        alias: {
            ds: path.resolve(__dirname, 'ds'),
        },
    },
    externals: [
        meteorExternals(),
    ],
    devServer: {
        hot: true,
    },
};

const serverConfig = {
    entry: [
        './server/main.js',
    ],
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }],
    },
    target: 'node',
    devServer: {
        hot: true,
    },
    externals: [
        meteorExternals(),
    ],
};

module.exports = [clientConfig, serverConfig];
