<template>
	<view class="padding-t-md padding-b-lgx padding-lr-md bg-whitegrey">
		<view class="group">基本搜索框</view>
		<view class="title">默认搜索框</view>
		<d-searchBar @search='search'></d-searchBar>
		
		<view class="title">图标在右侧</view>
		<d-searchBar @search='search' :leftIcon='false' :rightIcon='true'></d-searchBar>
		
		<view class="title">快捷清除内容</view>
		<d-searchBar @search='search' :leftIcon='true' :clearIcon='true'></d-searchBar>
		
		<view class="title">对齐方式</view>
		<d-searchBar @search='search' :leftIcon='true' align='center'></d-searchBar>
		
		<view class="title">自定义占位内容</view>
		<d-searchBar @search='search' :leftIcon='true' placeholder='姓名/职业搜索'></d-searchBar>
		
		<view class="title">调整圆角值</view>
		<d-searchBar @search='search' :leftIcon='true' radius='30rpx'></d-searchBar>
		
		<view class="title">修改背景颜色</view>
		<d-searchBar @search='search' :leftIcon='true' bgColor='red'></d-searchBar>
		
		<view class="title">修改文本颜色</view>
		<d-searchBar @search='search' :leftIcon='true' textColor='red'></d-searchBar>
		
		<view class="title">修改边框样式</view>
		<d-searchBar @search='search' :leftIcon='true' border='1px dotted red'></d-searchBar>
		
		<view class="title">修改占位文本样式</view>
		<d-searchBar @search='search' :leftIcon='true' placeholderStyle='color:red'></d-searchBar>
		
		<view class="title">显示搜索按钮</view>
		<d-searchBar @search='search' :leftIcon='true' radius='40rpx' :clearIcon='true' :searchBtn='true'></d-searchBar>
		
		<view class="title">调整内边距</view>
		<d-searchBar @search='search' :leftIcon='true' radius='40rpx' :clearIcon='true' :searchBtn='true' :padding='30'></d-searchBar>
		
		<view class="group">进阶搜索框</view>
		<view class="title">开启类型切换</view>
		<d-searchBar @search='search' mode='typeSearch' :options.sync='options' placeholderStyle='font-size: 28rpx'></d-searchBar>
		
		<view class="title">完整示例</view>
		<view class="bg-white padding-m">
			<d-searchBar @search='search' :leftIcon='true' mode='typeSearch' :options.sync='options' bgColor='#f1f1f1'
				radius='40rpx' :clearIcon='true' :searchBtn='true' placeholderStyle='font-size: 28rpx; color: #999;'
				></d-searchBar>
		</view>
		
		<view class="title"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKey: '',
				options: [
					{
						label: 'ICCID',
						desc : '按卡ICCID搜索',
						value: 'iccid',
						checked : true
					},{
						label: '按渠道',
						desc : '按归属渠道搜索',
						value: 'formChannel',
						checked : false
					},
				],
			}
		},
		methods: {
			search(e) {
				console.log(e);
			}
		},
	}
</script>

<style scoped>
	.group{
		padding: 20rpx 0rpx;
		font-weight: 700;
		font-size: 38rpx;
	}
	.title{
		padding: 20rpx 0rpx;
		font-weight: 700;
	}
</style>