<template>
	<view @touchmove.stop.prevent>
		<view class="d-fab-box" :class="{ 'd-fab-right': !left || (left && right) }"
			:style="{ left:getLeft(), right:getRight(), bottom: bottom+'rpx' }">
			<view class="d-fab-btn" :class="{'d-visible':isOpen,'d-fab-hidden':isHidden}">
				<view class="d-fab-item-box" :class="{'d-fab-item-left':left && !right && item.imgUrl}"
					v-for="(item,index) in btnList" :key="index" @tap.stop="handleClick(index)">
					<view :class="[left && !right?'d-text-left':'d-text-right']" v-if="item.imgUrl"
						:style="{fontSize:item.fontSize+'rpx',color:item.color}">{{item.text || ""}}</view>
					<view class="d-fab-item"
						:style="{width:width+'rpx',height:height+'rpx',background:item.bgColor || bgColor,borderRadius:radius}">
						<view class="d-fab-title" v-if="!item.imgUrl"
							:style="{fontSize:item.fontSize+'rpx',color:item.color}">{{item.text || ""}}</view>
						<image :src="item.imgUrl" class="d-fab-img" v-else
							:style="{width:item.imgWidth+'rpx',height:item.imgHeight+'rpx'}"></image>
					</view>
				</view>
			</view>
			<!-- 默认按钮 -->
			<view class="d-fab-item" :class="{ 'd-active': isOpen }"
				:style="{ width: width+'rpx', height:height+'rpx', borderRadius:radius, background:bgColor, color:color }"
				@tap.stop="handleClick(-1)">
				<text class="icon-ecrt icon-ecrt-CrossArrow" v-if="!custom"></text>
				<slot></slot>
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="d-fab-mask" :class="{ 'd-visible': isOpen }" @tap="handleClickCancel"></view>
	</view>
</template>

<script>
	/*
	* 组件名称：fab 悬浮按钮，建议不多于六个，与便捷使用场景不符合
	* props
	* left：距离左侧距离，0为auto，单位rpx，Number类型
	* right：距离右侧距离，0时且left不为0，值为auto，单位rpx，Number类型
	* bottom：距离底部距离，单位rpx，Number类型
	* width：按钮宽度，单位rpx
	* height: 按钮高度，单位rpx
	* radius：圆角，单位rpx
	* bgColor： 初始按钮背景颜色
	* custom: 是否启用自定义默认按钮内容，默认为+号，启用后，直接在组件标签中间定义内容
	* btnList：扩展按钮，格式见下方示例
	* maskClosable：遮罩是否支持关闭
	*/
	
	// btnList格式示例
	// [{
	// 	bgColor: "#16C2C2",	背景颜色
	// 	imgUrl: "/static/img/default/default_empty.png", 图标/图片地址
	// 	imgHeight: 64,	图片高度 rpx
	// 	imgWidth: 64,	图片宽度 rpx
	// 	text: "关于",	文本
	// 	fontSize: 34,	字体大小
	// 	color: "#fff"	字体颜色
	// }]
	
	export default {
		name: "dFab",
		emits: ['click'],
		props: {
			left: {
				type: Number,
				default: 0
			},
			right: {
				type: Number,
				default: 80
			},
			bottom: {
				type: Number,
				default: 100
			},
			width: {
				type: Number,
				default: 108
			},
			height: {
				type: Number,
				default: 108
			},
			radius: {
				type: String,
				default: "50%"
			},
			custom: {
				type: Boolean,
				default: false
			},
			bgColor: {
				type: String,
				default: "#5677fc"
			},
			color: {
				type: String,
				default: "#fff"
			},
			btnList: {
				type: Array,
				default () {
					return []
				}
			},
			maskClosable: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isOpen: false,
				isHidden: true,
				timer: null
			};
		},
		methods: {
			getLeft() {
				let val = "auto"
				if (this.left && !this.right) {
					val = this.left + 'rpx'
				}
				return val
			},
			getRight() {
				let val = this.right + 'rpx'
				if (this.left && !this.right) {
					val = "auto"
				}
				return val
			},
			handleClick: function(index) {
				this.isHidden = false
				clearTimeout(this.timer)
				if (index == -1 && this.btnList.length) {
					this.isOpen = !this.isOpen
				} else {
					this.$emit("click", {
						index: index
					})
					this.isOpen = false
				}
				if (!this.isOpen) {
					this.timer = setTimeout(() => {
						this.isHidden = true;
						clearTimeout(this.timer);
					}, 200)
				}
			},
			handleClickCancel: function() {
				if (!this.maskClosable) return;
				this.isOpen = false
			}
		},
		destroyed() {
			clearTimeout(this.timer);
		}
	}
</script>

<style scoped>
	.d-fab-box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: fixed;
		z-index: 99997;
	}
	.d-fab-right {
		align-items: flex-end;
	}
	.d-fab-btn {
		transform: scale(0);
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.d-fab-hidden {
		height: 0;
		width: 0;
	}
	.d-fab-item-box {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-bottom: 40rpx;
	}
	.d-fab-item-left {
		flex-flow: row-reverse;
	}
	.d-fab-title {
		width: 90%;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.d-text-left {
		padding-left: 28rpx;
	}
	.d-text-right {
		padding-right: 28rpx;
	}
	.d-fab-img {
		display: block;
	}
	.icon-ecrt{
		font-size: 36rpx;
	}
	.d-fab-item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
		transition: all 0.2s linear;
	}
	.d-active {
		transform: rotate(135deg);
	}
	/* 遮罩层 */
	.d-fab-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.75);
		z-index: 99996;
		transition: all 0.2s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}
	.d-visible {
		visibility: visible;
		opacity: 1;
		transform: scale(1);
	}
</style>
