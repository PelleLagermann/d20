const Webpack = require('webpack');
const Path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css", //.[contenthash]
    disable: process.env.NODE_ENV === "development"
});

const nodeEnv = JSON.stringify(process.env.NODE_ENV) || "";
const hrefPath = nodeEnv.includes("production") ? "/d20/" : null;
console.log("hrefPath", hrefPath, nodeEnv);
console.log("hrefPath", hrefPath, nodeEnv);
console.log("hrefPath", hrefPath, nodeEnv);
console.log("hrefPath", hrefPath, nodeEnv);
console.log("hrefPath", hrefPath, nodeEnv);
console.log("hrefPath", hrefPath, nodeEnv);

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
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: 'postcss-loader'                        
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
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
        new BaseHrefWebpackPlugin({ baseHref: hrefPath }),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),        
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        extractSass
    ]
};

module.exports = [config];