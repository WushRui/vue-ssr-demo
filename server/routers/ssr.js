const koaRouter=require('koa-router');
const VueServerRenderer= require('vue-server-renderer');
const path=require('path');
const fs=require('fs');

const serverRender=require('./server-render');
const clientManifest=require('../../dist/vue-ssr-client-manifest.json');

const render=VueServerRenderer.createBundleRenderer(path.join(__dirname,'../../server-build/vue-ssr-server-bundle.json'),{
    inject:false,
    clientManifest
});
const template=fs.readFileSync(path.join(__dirname,'../index-server.html'),'utf-8');

const pageRouter=new koaRouter();

pageRouter.get('*',async (ctx)=>{
    await serverRender(ctx,template,render)
});

module.exports=pageRouter;
