<template>
	<view class="padding-md bg-whitegrey">
		<view class="title">默认输入框</view>
		<d-inputBar v-model="value1"></d-inputBar>
		
		<view class="title">自定义占位符</view>
		<d-inputBar v-model="value1" placeholder='用户名/邮箱'></d-inputBar>
		
		<view class="title">支持内容清空</view>
		<d-inputBar v-model="value2" :clearIcon='true'></d-inputBar>
		
		<view class="title">自定义左侧图标</view>
		<d-inputBar v-model="value3" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search'></d-inputBar>
			
		<view class="title">最大输入长度</view>
		<d-inputBar v-model="value12" :clearIcon='true'
			rightIcon='icon-ecrt icon-ecrt-search' :maxlength='10'></d-inputBar>
			
		<view class="title">密码类型</view>
		<d-inputBar v-model="value13" :clearIcon='true'
			rightIcon='icon-ecrt icon-ecrt-search' :password='true'></d-inputBar>
			
		<view class="title">自定义右侧图标</view>
		<d-inputBar v-model="value4" :clearIcon='true'
			rightIcon='icon-ecrt icon-ecrt-search'></d-inputBar>
			
		<view class="title">自定义上下内边距</view>
		<d-inputBar v-model="value5" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' :padding='40'></d-inputBar>
			
		<view class="title">自定义文本颜色</view>
		<d-inputBar v-model="value6" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' textColor='red'></d-inputBar>
			
		<view class="title">自定义背景颜色</view>
		<d-inputBar v-model="value7" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' bgColor='#eee'></d-inputBar>
			
		<view class="title">自定义边框</view>
		<d-inputBar v-model="value8" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' border='1px solid red'></d-inputBar>
			
		<view class="title">自定义圆角值</view>
		<d-inputBar v-model="value9" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' bradius='15rpx'></d-inputBar>
		<view class="title">修改图标颜色</view>
		<d-inputBar v-model="value10" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' iconColor='red'></d-inputBar>
			
		<view class="title">完整示例</view>
		<d-inputBar v-model="value11" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' 
			rightIcon='icon-ecrt icon-ecrt-identity'
			bgColor='#666' textColor='#fff' border='1px solid #fff' iconColor='#fff' bradius='40rpx'></d-inputBar>

		<!-- <d-searchBar :options="options" mode='typeSearch'></d-searchBar> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				value5: '',
				value6: '',
				value7: '',
				value8: '',
				value9: '',
				value10: '',
				value11: '',
				value12: '',
				value13: '',
				searchKey: '',
				options: [{
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
	}
</script>

<style scoped>
	.title{
		padding: 20rpx 0rpx;
		font-weight: 700;
	}
</style>