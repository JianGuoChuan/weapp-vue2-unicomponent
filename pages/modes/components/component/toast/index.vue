<template>
	<view class="padding-lg">
		
		<button class="default-btn" hover-class="default-btn-hover" @tap="showToast(0)">一般提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showToast(1)">成功提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showToast(2)">错误提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showToast(3)">多行文本</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showToast(4)">自定义显示时间</button>
		
		<d-toast ref="toast"></d-toast>
		
	</view>
</template>

<script>
	export default {
		methods: {
			showToast(index) {
				switch(index){
					case 0: this.$refs.toast.show({title: "提交完成"});break;
					case 1: this.$refs.toast.show({title: "操作成功",type: 'success'});break;
					case 2: this.$refs.toast.show({title: "操作失败",type: 'fail'});break;
					case 3: this.$refs.toast.show({title: "操作失败",content: '请检查输入是否正确'});break;
					case 4: this.$refs.toast.show({title: "4s后消失",duration: 4000, icon: false});break;
					default: this.$refs.toast.show({title: "提交完成"});
				}
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped>
	.default-btn{
		border-radius: 50rpx;
		border: 1px solid #eee;
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.default-btn-hover{
		background-color: #eee;
	}
	/deep/ button::after{
		border: none;
	}
</style>