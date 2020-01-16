const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge=require('webpack-merge');
const baseConfig=require('./webpack.config.base');

const VueSSRClientPlugin=require('vue-server-renderer/client-plugin');

const isDev=process.env.NODE_ENV==='development';
let config;
let devServer={
    port:'8080',
    overlay:{
        errors:true
    },
    historyApiFallback:{
        index:'/index.html'
    },
    headers:{"Access-Control-Allow-Origin":'*'}
};
const defaultPlugin=[
    new HtmlWebpackPlugin({
        template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:isDev?"'development'":"'production'"
        }
    }),
    new VueLoaderPlugin(),
    new VueSSRClientPlugin()
];

if(isDev){
    config=merge(baseConfig,{
        devtool:'#cheap-eval-source-map',
        module:{
            rules:[
                {
                    test: /\.styl(us)?$/,
                    use:[
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true,
                                //extractCSS:true
                            }
                        },
                        'stylus-loader'
                    ]
                },{
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins:defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin,
        ])
    });

}else {
    config = merge(baseConfig, {
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath:'/dist'
        },
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
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugin.concat([
            new ExtractTextPlugin("style-[hash:8].css"),
            new CleanWebpackPlugin()
        ]),
        optimization: {
            runtimeChunk: {
                "name": "manifest"
            },
            splitChunks: {
                chunks: 'all'
            }
        }
    });
}


module.exports=config;