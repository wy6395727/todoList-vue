<template>
	<div class="list-todos">
		<router-link :to="{name:'todo',params:{id:item.id}}" class="list-todo activeListClass list" v-for="item in todoList" :key="item.id" :class="{'active':item.id==activeId}">
			<!--单个菜单容器-->
			<span class="icon-lock" v-if="item.locked"></span>  <!--锁的图标-->
			<span class="count-list" v-if="item.count">{{item.count}}</span><!--数字-->
			{{item.title}}<!--菜单内容-->
		</router-link>
		<a class=" link-list-new" @click="addTodoItem"> <!--新增菜单-->
			<span class="icon-plus"></span>新增
		</a>
	</div>
</template>

<script type="text/ecmascript-6">

	import {getTodoList, addTodo} from '../api/api'
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
			}
		},
		computed:{
			...mapState({
				todoList:state=>state.todoList,
				activeId:'activeId'   //state=>state.activeId
			})
		},
		created () {
			this.$store.dispatch('getTodos').then(()=>{
				this.$store.commit('CHANGID',this.todoList[0].id)
				this.$router.push({
					name:'todo',
					params:{id:this.todoList[0].id}
				})
			})
		},
		methods: {
			addTodoItem (){
				addTodo().then(statas=> {
					this.$store.dispatch('getTodos').then(data=>{
						this.activeId = this.todoList[this.todoList.length-1].id;
						this.$router.push({name:'todo',params:{id:this.todoList[this.todoList.length-1].id}})
					})
				})
			}
		}
	}

</script>

<style lang="less" rel="stylesheet/less" scoped>
	@import "../common/style/menu";
</style>
