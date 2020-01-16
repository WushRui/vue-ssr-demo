<template>
    <div class="real-app">

        <input type="text" class="add-input" autofocus="autofocus" placeholder="what would you do next"
               @keydown.enter="addTodo">

        <div class="tab-container">
            <tabs :value="filter" @change="changeTab">
                <tab :index="state" :label='state' v-for="state in states" :key="state"></tab>
            </tabs>
        </div>

        <item :todo="todo" v-for="todo in filterTodo" :key="todo.id" @del="delTodo"></item>
        <BottomTabs :filter="filter" :todo="thing" @toggle="thingFilter" @clearCompleted='clearCompleted'></BottomTabs>
    </div>
</template>

<script>
    import Item from './template/item.vue'
    import BottomTabs from './template/tabs.vue'

    let id=0;
    export default {
        data(){
          return{
              thing:[],
              filter:'all',
              states: ['all', 'active', 'completed']
          }
        },
        components:{
            Item,
            BottomTabs
        },
        computed:{
            filterTodo(){
                if(this.filter==='all'){
                    return this.thing
                }
                const completed = this.filter === 'completed';
                return this.thing.filter(todo=>completed===todo.completed)
            }
        },
        methods:{
            addTodo(e){
                this.thing.unshift({
                    id:id++,
                    content:e.target.value.trim(),
                    completed:false
                });
                e.target.value='';
            },
            delTodo(id){
                this.thing.splice(this.thing.findIndex(todo=>todo.id===id),1)
            },
            thingFilter(state){
                this.filter=state;
            },
            clearCompleted(){
                this.thing=this.thing.filter(t=>!t.completed)
            },
            changeTab(value){
                this.filter=value
            }
        }
    }
</script>

<style scoped lang="stylus">
    .real-app{
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
        .tab-container{
            background-color  #fff
            padding 0 15px
            height 44px
        }
        .add-input{
            position relative
            margin 0
            width 100%
            font-size 24px
            line-height 1.4em
            padding 16px 16px 16px 60px
            border 1px solid #999
            box-sizing border-box
            box-shadow 0 1px 0 0 #000
        }
    }

</style>