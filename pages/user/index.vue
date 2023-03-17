<template>
	<view>
		<DFab :left="0" :right="80" :bottom="100" bgColor="#5677fc" :btnList="btnList" @click="onClick"></DFab>
	</view>
</template>

<script>
	import DFab from "@/components/extension/d-fab/d-fab.vue"
	export default {
		components: { DFab },
		data() {
			return {
				btnList: [
					{
						bgColor: "#16C2C2",
						//图标/图片地址
						imgUrl: "/static/img/default/default_empty.png",
						//图片高度 rpx
						imgHeight: 64,
						//图片宽度 rpx
						imgWidth: 64,
						//名称
						text: "组件",
						//字体大小
						fontSize: 34,
						//字体颜色
						color: "#fff"
					}, {
						bgColor: "#64B532",
						//图标/图片地址
						imgUrl: "/static/img/default/default_empty.png",
						//图片高度 rpx
						imgHeight: 64,
						//图片宽度 rpx
						imgWidth: 64,
						//名称
						text: "方法",
						//字体大小
						fontSize: 34,
						//字体颜色
						color: "#fff"
					}, {
						bgColor: "#FFA000",
						//图标/图片地址
						imgUrl: "/static/img/default/default_empty.png",
						//图片高度 rpx
						imgHeight: 64,
						//图片宽度 rpx
						imgWidth: 64,
						//名称
						text: "模板",
						//字体大小
						fontSize: 34,
						//字体颜色
						color: "#fff"
					}
				],
			}
		},
		onLoad() {
			
		},
		methods: {
			onClick(e) {
				let index = e.index
				switch (index) {
					case -1:
						console.log(-1)
						break;
					case 0:
						this.$routes.to('/pages/modes/components/index');
						break;
					case 1:
						console.log(1)
						break;
					case 2:
						console.log(2)
						break;
					default:
						break;
				}
			}
		},
	}
</script>

<style>
</style>