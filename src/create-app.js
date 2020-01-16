import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createRouter from './router'
import createStore from './store/store'
import Notification from './view/template/notification/notification'
import Tabs from './view/template/tabs/tabs'

import './static/css/reset.css'
import './static/css/global.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Meta);
Vue.use(Notification);
Vue.use(Tabs);

export default ()=>{
    const router=createRouter();
    const store=createStore();

    const app=new Vue({
        el:'#app',
        router,
        store,
        render:(h)=>h(App)
    });

    return{app,router,store}
}
