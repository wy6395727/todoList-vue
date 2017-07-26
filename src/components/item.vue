<template>
	<transition name="myaction">
		<div class="list-item editingClass editing"> <!-- 最外层容器-->
			<label class="checkbox"> <!--自定义的多选框-->
				<input type="checkbox" v-model="item.checked" @change="changeitem" :disabled="locked"> <!--item.checked-->
				<span class="checkbox-custom"></span>
			</label>
			<input type="text" v-model="item.text" placeholder='写点什么。。。' @blur="changeitem" :disabled="item.checked || locked">  <!--绑定item.text-->
			<a class="delete-item" @click="deleteItem"> <!--删除图标-->
				<span class="icon-trash"></span>
			</a>
		</div>
	</transition>
</template>
<script>
	import {deleteTodoItem,changeItem} from '../api/api'
	export default {
		data(){
			return {
			}
		},
		props: ['item', 'index','locked'],
		methods: {
			deleteItem(){
				if(this.locked) return;
				deleteTodoItem(this.$route.params.id, this.index).then(()=> {
						this.$store.dispatch('getTodos');
						this.$emit('update-todo',this.$route.params.id);
					}
				)
			},
			changeitem(){
				changeItem(this.$route.params.id,this.index,this.item).then(()=>{
					this.$emit('update-todo',this.$route.params.id);
				})
			}
		},
	};
</script>
<style lang="less">
	@import '../common/style/list-items.less';
	.myaction-enter-active,.myaction-leave-active{
		transition: all 1s;
	}
	.myaction-enter,.myaction-leave-to{
		opacity: 0;
		transform: scale(0.2,0.2);
	}
	.myaction-enter-to,.myaction-leave{
		transform: scale(1.1,1.1);
	}
</style>
