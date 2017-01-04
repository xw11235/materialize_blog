const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'src/www');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    //Entry point to the project
    entry: [
        'webpack/hot/dev-server',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '/src/app/app.jsx'),
    ],
    //Webpack config options on how to obtain modules
    resolve: {
        //When requiring, you don't need to add these extensions
        extensions: ['', '.js', '.jsx'],

        //Modules will be searched for in these directories
        modulesDirectories: [
            // We need /docs/node_modules to be resolved before /node_modules
            path.resolve(__dirname, 'node_modules'),
            'node_modules',
            path.resolve(__dirname, '../src'),
        ],
    },
    //Configuration for dev server
    devServer: {
        contentBase: 'src/www',
        devtool: 'eval', hot: true,
        inline: true, port: 3000,
    },
    devtool: 'eval',
    //Output file config
    output: {
        path: buildPath, //Path of output file
        filename: 'app.js', //Name of output file
    },
    plugins: [
        //Used to include index.html in build folder
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join(__dirname, '/src/www/index.html'),
        }),
        //Allows for sync with browser while developing (like BorwserSync)
        new webpack.HotModuleReplacementPlugin(),
        //Allows error warninggs but does not stop compiling. Will remove when eslint is added
        new webpack.NoErrorsPlugin(),
    ],
    externals: {
        fs: 'js', // To remove once https://github.com/benjamn/recast/pull/238 is released
    },
    module: {
        //Allow loading of non-es
        loaders: [{
            test: /\.jsx$/,
            loaders: [
                'babel-loader',
            ],
            exclude: /node_modules/,
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, ],
    }
};

module.exports = config;
