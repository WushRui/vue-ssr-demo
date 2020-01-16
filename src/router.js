import VueRouter from 'vue-router'

import todo from './view/todo.vue'
import login from './view/login.vue'


export default ()=>{
    return new VueRouter({
        mode:'history',
        fallback:true,
        routes :[
            {path:'/',redirect:'/app'},
            {path:'/app',component:todo},
            {path:'/login',component:login}
        ],
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        }
    })
}