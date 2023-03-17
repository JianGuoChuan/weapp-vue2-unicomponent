<template>
	<view v-if="value">
		<view class="empty":style="{
				'width': width + 'rpx',
				'height': height + 'rpx',
				'marginTop': top + 'rpx'
			}">
			<image :src='emptyIcon || emptyDefaultIconUrl' class="width-all height-all"/>
		</view>
		<view class="text-center font-s">
			<text :style="{
				'color': textColor,
				'fontSize': textSize
			}">{{ text }}</text>
		</view>
	</view>
</template>

<script>
	/*
	* 组件名称：缺省
	* props：
	* value: 显隐控制
	* emptyIcon：替换的缺省图标/图标路径
	* text：自定义文本
	* top：距离父容器顶部距离，默认单位rpx
	* width：图标宽度，默认单位rpx
	* height：图标高度，默认单位rpx
	* textColor：文本颜色
	* textSize：文本尺寸，无默认单位，需自带单位
	*/
	export default {
		props: {
			value: {
				type: Boolean,
				default: true
			},
			emptyIcon: {
				type: String,
			},
			text: {
				type: String,
				default: '暂无数据'
			},
			top: {
				type: [ String, Number ],
				default: 50
			},
			width: {
				type: [ String, Number ],
				default: 180
			},
			height: {
				type: [ String, Number ],
				default: 180
			},
			textColor: {
				type: String,
				default: '#666'
			},
			textSize: {
				type: String,
				default: '20rpx'
			}
		},
		data() {
			return {
				emptyDefaultIconUrl: require("@/static/img/default/default_empty.png")
			}
		},
	}
</script>

<style scoped lang="scss">
	.empty{
		width: 180rpx;
		height: 180rpx;
		border-radius: 10px;
		margin: 50rpx auto 20rpx;
	}
</style>