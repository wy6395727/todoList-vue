<template>
	<div class="list-todos">
		<a class="list-todo activeListClass list" v-for="item in todoList"> <!--单个菜单容器-->
			<span class="icon-lock" v-if="item.locked"></span>  <!--锁的图标-->
			<span class="count-list" v-if="item.count">{{item.count}}</span><!--数字-->
			{{item.title}}<!--菜单内容-->
		</a>
		<a class=" link-list-new" > <!--新增菜单-->
			<span class="icon-plus"></span>新增
		</a>
	</div>
</template>

<script type="text/ecmascript-6">

    export default {
        data(){
            return {
            	todoList:[
					{
						title:"星期一",
						locked:true,
						count:0
					},
					{
						title:"星期二",
						locked:false,
						count:1
					},
					{
						title:"星期傘",
						locked:true,
						count:2
					},
				]
			}
        },
    }

</script>

<style lang="less" rel="stylesheet/less">
	@import "../common/style/menu";
</style>
