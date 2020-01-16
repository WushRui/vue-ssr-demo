<template>
    <li :class="{active}" class="tab" @click="handleClick">
       <span>{{this.label}}</span>
    </li>
</template>

<script>
    export default {
        name: "tab",
        data(){
            return{

            }
        },
        props:{
            index:{
                required:true,
                type:[Number,String]
            },
            label:{
                type: String,
                default:'tab'
            }
        },
        computed:{
            active(){
                return this.$parent.value===this.index
            }
        },
        methods:{
            handleClick(){
                this.$parent.onChange(this.index);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .tab{
        padding 5px
        margin-right 30px
        position relative
        cursor pointer
        float left
        &.active{
            color red
            border 1px solid red
        }
        &:last-child{
            margin-right 0
        }
    }
</style>