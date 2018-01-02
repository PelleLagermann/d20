var Webpack = require('webpack');
var Path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: {
        app: "./src/scripts/index.js"
    },    
    output: {
        path: Path.join(__dirname, 'dist'),
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
                use: ['style-loader', 'css-loader'],                
                test: /\.css$/
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
        }),
        new CopyWebpackPlugin([   
            {
                context: "src",
                from: "*.png"
            },
            {
                context: "src",
                from: "browserconfig.xml"
            },
            {
                context: "src",
                from: "favicon.ico"
            },
            {
                context: "src",
                from: "manifest.json"
            },
            {
                context: "src",
                from: "*.svg"
            },
            {
                context: "src",
                from: "sw.js"
            }
        ])
    ]
};

module.exports = [config];