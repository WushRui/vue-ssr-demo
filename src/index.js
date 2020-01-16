import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createRouter from './router'
import createStore from './store/store'
import './static/css/reset.css'
import './static/css/global.css'

Vue.use(VueRouter);
Vue.use(Vuex);

const router=createRouter();
const store=createStore();

new Vue({
    el:'#app',
    router,
    store,
    render:(h)=>h(App)
});