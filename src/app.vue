<template>
    <div class="cover">
        <webTitle></webTitle>
        <router-link to="/login">登录</router-link>
        <router-link to="/">app</router-link>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <button @click="showNotify">show notify</button>
        <Footer></Footer>
    </div>
</template>

<script>
    import webTitle from './view/layout/webHeader.vue'
    import Footer from './view/layout/webFooter.vue'

    export default {
        metaInfo:{
          title:"TODO-APP"
        },
        components:{
            webTitle,
            Footer,
        },
        mounted() {
            this.$notify({
                content:"test",
                btn:"close"
            })
        },
        methods:{
            showNotify(){
                this.$notify({
                    content:"test",
                    btn:"close"
                })
            }
        }
    }
</script>

<style scoped>
    .cover{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 10;
    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter ,.fade-leave-to{
        opacity: 0;
    }
</style>