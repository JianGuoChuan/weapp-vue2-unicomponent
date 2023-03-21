<template>
	<view class="padding-md bg-whitegrey">
		<view class="title">默认输入框</view>
		<d-input v-model="value1"></d-input>
		
		<view class="title">自定义占位符</view>
		<d-input v-model="value1" placeholder='用户名/邮箱'></d-input>
		
		<view class="title">占位符样式设置</view>
		<d-input v-model="value14" placeholder='用户名/邮箱' placeholderStyle='color: red'></d-input>
		
		<view class="title">支持设置输入类型，同uni原生组件</view>
		<d-input v-model="value15" :clearIcon='true' type='number'></d-input>
		
		<view class="title">支持内容清空</view>
		<d-input v-model="value2" :clearIcon='true'></d-input>
		
		<view class="title">自定义左侧图标</view>
		<d-input v-model="value3" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search'></d-input>
			
		<view class="title">最大输入长度</view>
		<d-input v-model="value12" :clearIcon='true'
			rightIcon='icon-ecrt icon-ecrt-search' :maxlength='10'></d-input>
			
		<view class="title">密码类型</view>
		<d-input v-model="value13" :clearIcon='true'
			rightIcon='icon-ecrt icon-ecrt-search' :password='true'></d-input>
			
		<view class="title">自定义右侧图标</view>
		<d-input v-model="value4" :clearIcon='true'
			rightIcon='icon-ecrt icon-ecrt-search'></d-input>
			
		<view class="title">自定义上下内边距</view>
		<d-input v-model="value5" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' :padding='40'></d-input>
			
		<view class="title">自定义文本颜色</view>
		<d-input v-model="value6" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' textColor='red'></d-input>
			
		<view class="title">自定义背景颜色</view>
		<d-input v-model="value7" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' bgColor='#eee'></d-input>
			
		<view class="title">自定义边框</view>
		<d-input v-model="value8" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' border='1px solid red'></d-input>
			
		<view class="title">自定义圆角值</view>
		<d-input v-model="value9" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' bradius='15rpx'></d-input>
			
		<view class="title">修改图标颜色</view>
		<d-input v-model="value10" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' iconColor='red'></d-input>
			
		<view class="title">完整示例</view>
		<d-input v-model="value11" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search' 
			rightIcon='icon-ecrt icon-ecrt-identity'
			placeholderStyle='color: #fff'
			bgColor='#666' textColor='#fff' border='1px solid #fff' iconColor='#fff' bradius='40rpx'></d-input>
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
				value14: '',
				value15: '',
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