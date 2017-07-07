<template>
	<section class="container">
		<section class="menu">
			<!--左边的容器-->
			<menus></menus>
		</section>
		<section class="content-container">
			<!--右边的容器-->
			<todo></todo>
		</section>
	</section>
</template>

<script type="text/ecmascript-6">
	import menus from './menus.vue';
	import todo from './todo.vue';
    export default {
        components: {
        	menus,
			todo
        }
    }

</script>

<style lang="less" rel="stylesheet/less">
	@import "../common/style/layouts";
</style>
