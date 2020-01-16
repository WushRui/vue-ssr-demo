const Router =require('koa-router');
const axios=require('axios');
const MemoryFS=require('memory-fs');
const fs=require('fs');
const webpack=require('webpack');
const {createBundleRenderer} = require('vue-server-renderer');
const path=require('path');
const serverRender=require('./server-render');

const serverConfig=require('../../build/webpack.config.server');

let webpackCompiler=webpack(serverConfig);//编译webpack config
const mfs=new MemoryFS();

webpackCompiler.outputFileSystem=mfs;

let bundle;

webpackCompiler.watch({},(err, states)=>{

    if(err) throw err;

    states=states.toJson();
    states.errors.forEach(err=>console.log(err));
    states.warnings.forEach(warn=>console.log(warn));

    const bundlePath=path.join(serverConfig.output.path,'vue-ssr-server-bundle.json');

    bundle=JSON.parse(mfs.readFileSync(bundlePath,'utf-8'));
    console.log('the bundle is create')

});

const handleSSR=async (ctx)=>{
    if (!bundle){
        ctx.body='waite moment';
        return
    }

    const c=await axios.get('http://localhost:8080/vue-ssr-client-manifest.json');
    const  clientManifest=c.data;

    const template=fs.readFileSync(path.join(__dirname,'../index-server.html'),'utf-8');

    const renderer = createBundleRenderer(bundle,{
        inject:false,
        clientManifest
    });

    await serverRender(ctx,template,renderer);

};

const router=new Router();
router.get('*',handleSSR);

module.exports=router;


