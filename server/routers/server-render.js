const ejs=require('ejs');

module.exports=async (ctx,template,renderer)=>{
    ctx.headers['Content-Type']='text/html';

    const context = { url: ctx.path };
    
    try {
        const appString=await renderer.renderToString(context);
        const {title}=context.meta.inject();

        const html=ejs.render(template,{
            appString,
            style:context.renderStyles(),
            scripts:context.renderScripts(),
            title:title.text()
        });
        ctx.body=html
    }catch (e) {
        console.log('render err: '+e);
        throw e
    }
};

