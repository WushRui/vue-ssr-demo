import Vue from 'vue'
import notification from './notification.vue'

const component={
    extends:notification,
    computed:{
        style(){
            return{
                right:"20px",
                bottom:this.offset+'px'
            }
        }
    },
    data() {
        return{
            offset:0,
            autoClose:3000,
            height:0,
        }
    },
    mounted() {
        this.createTimer()
    },
    methods:{
        createTimer(){
            if (this.autoClose){
                this.t=setTimeout(()=>{
                    this.visible=false;
                },this.autoClose)
            }
        },
        clearTimer(){
            if(this.t){
                clearTimeout(this.t)
            }
        },
        afterEnter(){
            this.height=this.$el.offsetHeight
        }
    },
    beforeDestroy() {
        this.clearTimer()
    }
};

const instances=[];
let seed=1;

let remove=(instance)=>{
    if(!instance) return;

    const len=instances.length;
    const index=instances.findIndex(item=>instance.id===item.id);

    instances.splice(index,1);

    if(len<=1) return;

    const removeHeight=instance.vm.height;
    for (let i=index;i<len-1;i++){
        instances[i].offset=parseInt(instances[i].offset)-removeHeight-16;
    }

};

const NotificationConstructor=Vue.extend(component);

const notify=(opts)=>{
    if(Vue.prototype.$isServer) return;

    let instance=new NotificationConstructor({
        propsData:opts
    });
    let id='notification_'+seed++;
    instance.id=id;
    instance.vm=instance.$mount();
    instance.vm.visible=true;

    document.body.appendChild(instance.vm.$el);

    let offset=0;
    instances.forEach(item=>{
        offset+=item.$el.offsetHeight+16
    });
    offset+=16;
    instance.offset=offset;
    instances.push(instance);

    instance.vm.$on('close',()=>{
        remove(instance);
        document.body.removeChild(instance.vm.$el);
        instance.vm.$destroy()
    });

    instance.vm.$on('closeNotify',()=>{
        instance.vm.visible=false;
    });

    return instance.vm
};

export default notify