const path=require('path');
let config;
config={
    target: "web",
    entry: path.join(__dirname,'../src/client-entry.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path: path.join(__dirname,'../dist'),
        publicPath:"http://localhost:8080/"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhiteSpace:true,
                    extractCSS:false
                }
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options: {
                        limit:1024,
                        name:'resources/[name]-[hash:8].[ext]'
                    }
                }]
            }
        ]
    }
};


module.exports=config;