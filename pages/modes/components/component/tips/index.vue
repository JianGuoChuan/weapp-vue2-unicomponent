<template>
	<view class="padding-lg">
		<view style="border: 1px solid #2879ff;border-radius: 10rpx;" class="over-hidden flex margin-b-lgx">
			<view :class="[ 'flex-8 default border-r', active == 1 ? 'active' : '' ]" @tap="changePositon(1)">顶部</view>
			<view :class="[ 'flex-8 default border-r', active == 2 ? 'active' : '' ]" @tap="changePositon(2)">中部</view>
			<view :class="[ 'flex-8 default', active == 3 ? 'active' : '' ]" @tap="changePositon(3)">底部</view>
		</view>
		
		<d-tips ref="tips" :backgroundColor="backgroundColor" v-if="active == 1"></d-tips>
		<d-tips ref="tips" :backgroundColor="backgroundColor" position="center" v-if="active == 2"></d-tips>
		<d-tips ref="tips" :backgroundColor="backgroundColor" position="bottom" v-if="active == 3"></d-tips>
		
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(0)">一般提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(1)">成功提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(2)">警告提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(3)">错误提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(4)">其他提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(5)">长文字消息提示</button>
		<button class="default-btn" hover-class="default-btn-hover" @tap="showTips(6)">自定义时间消息提示</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 1,
				backgroundColor: 'rgba(0, 0, 0, 0.9)'
			}
		},
		methods: {
			showTips(index) {
				let options = {};
				switch(index){
					case 0 : options = {msg: '*默认提醒*',duration: 2000};this.backgroundColor= 'rgba(0, 0, 0, 0.9)';break;
					case 1 : options = {msg: '*成功提醒*',duration: 2000};this.backgroundColor= '#19be6b';break;
					case 2 : options = {msg: '*警告提醒*',duration: 2000};this.backgroundColor= '#ff7900';break;
					case 3 : options = {msg: '*错误提醒*',duration: 2000};this.backgroundColor= '#EB0909';break;
					case 4 : options = {msg: '*一般提醒*',duration: 2000};this.backgroundColor= '#5677fc';break;
					case 5 : options = {msg: '在提醒文字内容过长的展示效果如此，请结合业务适当调整',duration: 2000};break;
					case 6 : options = {msg: '*4S后关闭*',duration: 4000};break;
					default: options = {msg: '*默认提醒*',duration: 2000};this.backgroundColor= 'rgba(0, 0, 0, 0.9)';break;
				}
				
				this.$refs.tips.showTips(options);
			},
			changePositon(key){
				this.active = key;
			},
		},
		onLoad() {
			
		}
	}
</script>

<style scoped>
	.active{
		background-color: #2879ff!important;
		color: #fff!important;
	}
	.border-r{
		border-right: 1px solid #2879ff;
	}
	.default{
		background-color: #fff;
		color: #2879ff;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		text-align: center;
	}
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