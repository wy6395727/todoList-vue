<template>
	<transition name="fade">
		<div class="page lists-show"><!--最外层容器-->
			<nav><!--容器上半部分-->
				<div class="nav-group"> <!--移动端的菜单图标-->
					<a class="nav-item">
						<span class="icon-list-unordered"></span>
					</a>
				</div>
				<h1 class="title-page" v-if="!updatetitle" @click="updatetitle=true">
					<span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
					<span class="count-list">{{todo.count}}</span><!-- 数目-->
				</h1>
				<div class="title-page" v-else>
					<input class="title-input" type="text" v-model="todo.title" @keyup.enter="changeTitle" autofocus>
				</div>

				<div class="nav-group right"><!-- 右边的删除，锁定图标容器-->
					<div class="options-web">
						<a class=" nav-item" @click="lockAction"> <!-- 锁定图标-->
							<span class="icon-lock" v-if="todo.locked"></span>
							<span class="icon-unlock" v-else>
            </span>
						</a>
						<a class="nav-item" @click="deleteTodo"><!-- 删除图标-->
							<span class="icon-trash"></span>
						</a>
					</div>
				</div>

				<div class=" form todo-new input-symbol">
					<!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
					<input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked"/>
					<span class="icon-add"></span>
				</div>
			</nav>
			<div class="content-scrollable list-items">
				<!--容器下半部分-->
				<item v-for="(item,index) in items" :item="item" :key="index" :index="index" :locked="todo.locked" @update-todo="updateTodo"></item>
			</div>
		</div>
	</transition>
</template>
<script>
	import item from './item.vue'
	import {getTodo, addTodoItem, changelock, getTodoList, deleteTodo,changetitle} from '../api/api'
	export default {
		data() {
			return {
				updatetitle:false,
				todo: { //详情内容
					id: '',
					title: "",
					count: null,
					locked: false
				},
				items: [ //代办单项列表
				],
				text: '' //新增代办单项绑定的值
			}
		},
		computed: {},
		methods: {
			fetchTodo(){
				this.$store.commit("CHANGID", this.$route.params.id)
				this.text="";
				getTodo({id: this.$route.params.id}).then((res)=> {
					this.todo = res.data.todo
					let {
						id,
						title,
						locked,
						record
					}=res.data.todo
					this.items = record
					let count = record.filter((item)=> {
						if (item.checked) return false
						return true
					}).length
					this.todo = {
						id,
						title,
						count,
						locked
					}
				})
			},
			onAdd() {
				addTodoItem(this.todo.id, this.text).then((res)=> {
					this.items.push({
						checked: false, text: this.text, isDelete: false
					});
					this.text = '';
					this.todo.count++;

					this.$store.dispatch("getTodos")
				})
			},
			lockAction(){
				changelock(this.todo.id).then(()=> {
					this.todo.locked = !this.todo.locked
					this.$store.dispatch("getTodos")
				})
			},
			deleteTodo(){
				deleteTodo(this.todo.id).then(()=> {
					this.$store.dispatch("getTodos").then((todolist)=> {
						this.$router.push({
							name: 'todo',
							params: {id: todolist[0].id}
						})
					})
				})
			},
			updateTodo(id){
				this.fetchTodo()
				this.$store.dispatch("getTodos")
			},
			changeTitle(){
				changetitle(this.todo.id,this.todo.title).then(()=>{
					this.$store.dispatch("getTodos")
				})
				this.updatetitle=false;
			},
		},
		watch: {
			'$route.params.id': 'fetchTodo',
		},
		created () {
			this.fetchTodo()
		},
		components: {
			item
		}
	}
</script>
<style lang="less">
	@import '../common/style/nav.less';
	@import '../common/style/form.less';
	@import '../common/style/todo.less';

	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
