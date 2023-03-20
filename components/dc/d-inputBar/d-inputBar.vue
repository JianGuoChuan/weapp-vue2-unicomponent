<template>
	<view class="inputBar relative">
		<input v-model="inputValue" :placeholder="placeholder"
			:type='type'
			:focus='focus'
			:password='password'
			:maxlength='maxlength'
			:style="{ 
				paddingLeft: leftIcon ? '65rpx' : '20rpx', 
				paddingRight: rightIcon && clearIcon ? '110rpx' : rightIcon || clearIcon ? '70rpx' : '20rpx',
				paddingTop: padding + 'rpx',
				paddingBottom: padding + 'rpx',
				backgroundColor: bgColor,
				color: textColor,
				border: border,
				borderRadius: bradius
			}"
			@input='updateValue' @confirm='confirm'/>
		<text class="icon-ecrt icon-ecrt-roundclose absolute font-bold text-grey" 
			:style="{ 
				top: padding == 12 ? '20rpx' : padding + 8 + 'rpx',
				right: rightIcon ? '70rpx' : '20rpx',
				color: iconColor 
			}"
			@tap='clear' v-show="clearIcon && inputValue"></text>
		<text :class="[ leftIcon, 'absolute font-bold' ]" :style="{ 
				top: padding == 12 ? '20rpx' : padding + 8 + 'rpx',
				left: '20rpx',
				color: iconColor 
			}"></text>
		<text :class="[ rightIcon, 'absolute font-bold' ]" :style="{ 
				top: '20rpx',
				right: '20rpx',
				color: iconColor 
			}"></text>
	</view>
</template>

<script>
	/*
	* 组件名称：输入框
	* props：
	* value：绑定值
	* placeholder：占位符
	* type: 输入类型，同uniType
	* focus: 自定获取焦点
	* maxlength： 最大文本长度
	* password：是否密码类型
	* clearIcon：是否显示清除图标
	* leftIcon：左侧图标
	* rightIcon：右侧图标
	* padding: 上下内边距,Number类型
	* textColor：输入框文本颜色
	* bgColor：输入框背景颜色
	* border：输入框边框
	* bradius：输入框圆角
	* @confirm 完成方法回调
	*/
	export default {
		props: {
			value: {
				type: String,
				required: true
			},
			placeholder: {
				type: String,
				default: '请输入内容'
			},
			type: {
				type: String,
				default: 'text'
			},
			focus: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: Number,
				default: 140
			},
			password: {
				type: Boolean,
				default: false
			},
			padding: {
				type: Number,
				default: 12
			},
			textColor: {
				type: String,
				default: '#666'
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			border: {
				type: String,
				default: '1px solid #dcdcdc'
			},
			bradius: {
				type: String,
				default: '6rpx'
			},
			iconColor: {
				type: String,
				default: '#999'
			},
			clearIcon: {
				type: Boolean,
				default: false
			},
			leftIcon: {
				type: String
			},
			rightIcon: {
				type: String
			}
		},
		watch: {
			value(){
				this.inputValue = this.value;
			},
		},
		data() {
			return {
				inputValue: ''
			}
		},
		created() {
			
		},
		methods: {
			clear(){
				this.inputValue = '';
				this.$emit('input', this.inputValue);
			},
			confirm(){
				this.$emit('confirm', this.inputValue);
			},
			updateValue(){
				this.$emit('input', this.inputValue);
			},
		},
	}
</script>

<style scoped lang="scss">
	.inputBar{
		.uni-input-placeholder{
			font-size: 26rpx;
		}
	}
</style>