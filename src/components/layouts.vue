<template>
	<section class="container">
		<section class="menu">
			<!--左边的容器-->
			<menus></menus>
		</section>
		<section class="content-container">
			<!--右边的容器-->
			<router-view></router-view>
		</section>
	</section>
</template>

<script type="text/ecmascript-6">
	import menus from './menus.vue';
    export default {
        components: {
        	menus
        },
    }

</script>

<style lang="less" rel="stylesheet/less">
	@import "../common/style/layouts";
	@import "../common/style/icon";
</style>
