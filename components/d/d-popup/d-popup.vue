<template>
	<view>
		<uPopop ref='popup' @change='popupChange' @maskClick="maskClick" :mask-click='isMaskClick'
			style='position: relative;'>
			<view class="relative"
				:style="{ 
					'height': height + 'rpx', 
					'width': width + '%',
					'borderTopLeftRadius': radius + 'rpx',
					'borderTopRightRadius': radius + 'rpx',
					'backgroundColor': bgColor
				}">
				<view>
					<view class="text-center padding-t-sm" v-if='!hideTitle'>{{ title }}</view>
					<view class="closeBtn text-word-spacing-1" v-if='closeBtn' @tap='closePopup'> 关闭 </view>
				</view>
				<slot />
			</view>
		</uPopop>
	</view>
</template>

<script>
	/*
	* 组件名称：popup弹框
	* props：
	* value: 显隐控制
	* type：弹出方向，top，left，right，bottom, center
	* isMaskClick：是否点击遮罩关闭
	* height：弹框高度，默认单位rpx
	* width：弹框宽度，默认单位rpx
	* title：弹框标题文本
	* hideTitle：是否隐藏标题
	* closeBtn：是否显示关闭按钮
	* bgColor：背景颜色
	* radius：弹框圆角值
	*/
	import uPopop from "@/components/uni/uni-popup/popup.js"
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			type: {
				type: String,
				default: 'bottom'
			},
			isMaskClick: {
				type: Boolean,
				default: true
			},
			height: {
				type: [ String, Number ],
				default: 200
			},
			width: {
				type: [ String, Number ],
				default: 100
			},
			title: {
				type: String,
				default: '标题'
			},
			hideTitle: {
				type: Boolean,
				default: false
			},
			closeBtn: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			radius: {
				type: [ String, Number ],
				default: 30
			}
		},
		watch: {
			value(val){
				if(val){
					this.popupShow = val;
					this.openPopup(this.type);
				}
			},
		},
		components: {
			uPopop
		},
		data() {
			return {
				popupShow: false
			}
		},
		methods: {
			openPopup(type) {
				this.$refs.popup.open(type)
			},
			closePopup(){
				this.popupShow = false;
				this.$emit('input', this.popupShow)
				this.$refs.popup.close();
			},
			popupChange(e){
				this.$emit('change', e)
			},
			maskClick(){
				this.$emit('maskClick');
			},
		},
	}
</script>

<style scoped>
	.closeBtn{
		position: absolute;
		right: 25rpx;
		top: 25rpx;
		font-size: 28rpx;
		color: #666;
	}
</style>