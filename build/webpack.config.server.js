const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack=require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractTextPluginCSS = require("extract-text-webpack-plugin");
const merge=require('webpack-merge');
const VueServerPlugin=require('vue-server-renderer/server-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path=require('path');
const baseConfig=require('./webpack.config.base');


let config=merge(baseConfig, {
    target: 'node',
    entry: path.join(__dirname, '../src/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2',
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.styl(us)?$/,
                use: ExtractTextPlugin.extract({
                    fallback: "vue-style-loader",
                    use: [
                        "css-loader",
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                })
            },{
                test: /\.css$/,
                use:  [
                    'vue-style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style-[hash:8].css"),
        new  ExtractTextPluginCSS("common-[hash:8].css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV':"'server'"
        }),
        new VueLoaderPlugin(),
        new VueServerPlugin(),
        new CleanWebpackPlugin()
    ]
});



module.exports=config;