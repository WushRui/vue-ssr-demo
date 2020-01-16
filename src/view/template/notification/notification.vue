<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
            <span class="content">{{content}}</span>
            <a class="btn" @click.prevent="closeNotify">{{ btn || '关闭'}}</a>
        </div>
    </transition>
</template>

<script>
    export default {
        name:"notification",
        props:{
            content:{
                type:String,
                required:true
            },
            btn:{
                type:String,
                default:'关闭'
            }
        },
        data(){
          return{
              visible:false
          }
        },
        computed:{
            style(){
                return{}
            }
        },
        methods:{
            closeNotify(){
                this.$emit('closeNotify')
            },
            afterLeave(){
                this.$emit('close')
            },
            afterEnter(){},

        }
    }
</script>

<style scoped lang="stylus">
    .notification{
        display flex
        background #303030
        color rgb(255,255,255)
        align-items center
        flex-wrap wrap
        position fixed
        padding 30px
        min-width 280px
        transition all 0.3s
        box-shadow 0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.5)
        z-index 999
        .content{
            padding 0
        }
        .btn{
            color #ff4081
            padding-left 24px
            margin-left auto
            cursor pointer
        }

    }
</style>