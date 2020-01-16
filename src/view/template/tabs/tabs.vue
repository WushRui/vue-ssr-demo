<template>
    <div class="tabs">
        <ul class="tabs-header">
          <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "tabs",
        props:{
            value:{
                type:[String,Number],
                required:true
            }
        },
        methods:{
            onChange(index){
                this.$emit('change',index)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .tabs{
        padding: 5px 0;
    }
</style>