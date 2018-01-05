var Webpack = require('webpack');
var Path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        app: "./src/scripts/index.js"
    },    
    output: {
        path: __dirname,
        filename: '[name].js' //.[chunkhash]
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [        
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = [config];