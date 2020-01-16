const path=require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require('webpack');
const isDev=process.env.NODE_ENV==='development';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config;

config={
    target: "web",
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options: {
                        limit:1024,
                        name:'[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?"'development'":"'production'"
            }
        }),
    ]
};

if(isDev){
    config.devtool='#cheap-eval-source-map';
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    });
    config.devServer={
        port:'8080',
        overlay:{
            errors:true
        }
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin,
    )
}else {
    config.output.filename='[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.styl(us)?$/,
        use:ExtractTextPlugin.extract({
            fallback: "style-loader",
            use:[
                "css-loader",
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.plugins.push(
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin ()
    );
    config.optimization={
        runtimeChunk: {
            "name": "manifest"
        },
        splitChunks: {
            chunks: 'all'
        }
    }
}

module.exports=config;