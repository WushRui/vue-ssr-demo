<template>
    <div class="helper">
        <span class="left">{{ unFinishedTodoLength }} item left</span>
        <span class="clear" @click="clearAll"> clear all completed</span>
    </div>
</template>

<script>
    export default {
        computed:{
            unFinishedTodoLength(){
                return this.todo.filter(t=>!t.completed).length
            }
        },
        props:['filter','todo'],
        methods:{
            clearAll(){
                this.$emit('clearCompleted')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .helper{
        font-weight 100
        display flex
        justify-content space-between
        padding 5px 0
        line-height 30px
        background-color #fff
        font-size 14px
        font-smoothing: antialiased
    }
    .left, .clear, .tabs{
        padding 0 15px
        box-sizing border-box
    }
    .left, .clear{
        width 150px
    }
    .left{
        text-align left
    }
    .clear{
        text-align right
        cursor pointer
    }
</style>