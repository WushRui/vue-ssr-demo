const KoaRouter=require('koa-router');
const send=require('koa-send');

const staticRouter=new KoaRouter({prefix:'/dist'});

staticRouter.get('*',async ctx=>{
    await send(ctx,ctx.path)
});

module.exports=staticRouter;
