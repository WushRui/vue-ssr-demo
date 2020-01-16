const Koa=require('koa');
const send=require('koa-send');
const path=require('path');

const staticRouter=require('./routers/static');

const app=new Koa();

const isDev=process.env.NODE_ENV==='development';
let pageRouter;

app.use(async (ctx,next)=>{
    try {
        console.log('request path '+ ctx.path);
        await next()
    }catch (e) {
        console.log(e);
        ctx.status=500;
        if(isDev)
            ctx.body=e;
        else
            ctx.body='please wait moment'

    }
});

app.use(staticRouter.routes()).use(staticRouter.allowedMethods());

if(isDev){
    pageRouter=require('./routers/dev-ssr');
}else {
    pageRouter=require('./routers/ssr')
}

app.use(async (ctx,next)=>{
    if(ctx.path==='/favicon.ico'){
        await send(ctx,'./favicon.ico',{root:path.join(__dirname,'../')})
    }
    await next();
});

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

app.listen(8000,function () {
    console.log('the server has begin')
});