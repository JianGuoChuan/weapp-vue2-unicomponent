<template>
	<view class="d-toast" :class="[visible ? 'd-toast-show' : '' , content ? 'd-toast-padding' : '' ]" 
		:style="{width: getWidth(content), zIndex: zIndex }">
		<text class="icon-ecrt icon-ecrt-toast text-white d-fontIcon" v-if="type == 'default'"></text>
		<text class="icon-ecrt icon-ecrt-success text-white d-fontIcon" v-if="type == 'success'"></text>
		<text class="icon-ecrt icon-ecrt-fail text-white d-fontIcon" v-if="type == 'fail'"></text>
		<view class="d-toast-text" :class="[icon?'':'d-unicon']">{{title}}</view>
		<view class="d-toast-text d-content-ptop" v-if="content">{{content}}</view>
	</view>
</template>

<script>
	export default {
		name: "dToast",
		props: {
			zIndex:{
				type:Number,
				default:99999
			}
		},
		data() {
			return {
				timer: null,
				visible: false,
				title: "操作成功",
				content: "",
				type: '',
			};
		},
		methods: {
			show: function(options) {
				let { duration = 2000, type = 'default', icon = true } = options;
				clearTimeout(this.timer);
				this.visible = true;
				this.title = options.title || "";
				this.content = options.content || "";
				this.type= icon ? type : '';
				this.timer = setTimeout(() => {
					this.visible = false;
					clearTimeout(this.timer);
					this.timer = null;
				}, duration);
			},
			getWidth( content ) {
				const width = content ? '420rpx' : '360rpx'
				return width
			}
		}
	}
</script>

<style scoped>
	.d-toast {
		background-color: rgba(0, 0, 0, 0.75);
		border-radius: 10rpx;
		position: fixed;
		visibility: hidden;
		opacity: 0;
		left: 50%;
		top: 48%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		transition:  0.3s ease-in-out;
		transition-property:opacity,visibility;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 60rpx 20rpx 54rpx 20rpx;
		box-sizing: border-box;
	}

	.d-toast-padding {
		padding-top: 50rpx !important;
		padding-bottom: 50rpx !important;
	}
	.d-unicon-padding {
		padding: 24rpx 40rpx !important;
		word-break: break-all;
	}

	.d-toast-show {
		visibility: visible;
		opacity: 1;
	}

	.d-fontIcon{
		font-size: 75rpx;
		margin-bottom: 25rpx;
	}
	
	.d-toast-img {
		width: 120rpx;
		height: 120rpx;
		display: block;
		margin-bottom: 28rpx;
	}

	.d-toast-text {
		font-size: 30rpx;
		line-height: 30rpx;
		font-weight: 400;
		color: #fff;
		text-align: center;
	}
	.d-unicon{
		line-height: 40rpx !important;
		font-size: 32rpx !important;
	}
	.d-content-ptop {
		padding-top: 10rpx;
		font-size: 26rpx !important;
	}
</style>
