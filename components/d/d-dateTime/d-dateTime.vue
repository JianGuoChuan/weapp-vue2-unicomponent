<template>
	<view class="padding-lr-md bradius-m flex" 
		:style="{ 
			height: '70rpx',
			lineHeight: '70rpx',
			border: border,
			borderRadius: bradius,
			color: textColor,
			backgroundColor: bgColor,
		}">
		<view class="padding-top-xs margin-right-xs">
			<text class="icon-ecrt icon-ecrt-canladar" :style="{ color: iconColor }"></text>
		</view>
		<view class="flex space-around width-all">
			<view class="padding-lr-sm border-radius-sm text-center font-xs text-gray width-all">
				<picker mode="date" :value="starValue" :fields="mode" ref='star'
					@change="starChange">
					<view v-if="!starValue">{{ starPlaceholder }}</view>
					<view class="font-sm text-darkgrey">{{starValue}}</view>
				</picker>
			</view>
			<view class="padding-lr-sm font-bold">-</view>
			<view class="padding-lr-sm border-radius-sm text-center font-xs text-gray width-all">
				<picker mode="date" :value="endValue" :fields="mode" :start='starValue' :disabled="disabled"
					@change="endChange" @click="endClick">
					<view v-if="!endValue">{{ endPlaceholder }}</view>
					<view class="font-sm text-darkgrey">{{endValue}}</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	* 组件名称：日期范围选择器
	* props：
	* starDateTime： 默认值起始日期
	* endDateTime： 默认截止日期
	* mode： 模式：day、month
	* starPlaceholder： 起始日期占位符
	* endPlaceholder： 截止日期占位符
	*/
	export default {
		props: {
			starDateTime: {
				type: String,
				default : ''
			},
			endDateTime: {
				type: String,
				default: ''
			},
			mode: {
				type: String,
				default: 'day'
			},
			starPlaceholder: {
				type: String,
				default : '起始日期'
			},
			endPlaceholder: {
				type: String,
				default : '截止日期'
			},
			textColor: {
				type: String,
				default: '#666'
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			iconColor: {
				type: String,
				default: '#999'
			},
			border: {
				type: String,
				default: '1px solid #dcdcdc'
			},
			bradius: {
				type: String,
				default: '6rpx'
			},
		},
		watch: {
			starDateTime:{
				handler(value){
					this.starValue = value;
				},
				immediate: true
			},
			endDateTime:{
				handler(value){
					this.endValue = value;
				},
				immediate: true
			},
		},
		data() {
			return {
				starValue: '',
				endValue: '',
				disabled: true
			}
		},
		methods: {
			endClick(){
				if(!this.starValue){
					uni.showToast({title: '请选择起始日期',icon: 'none'});
					return
				}
			},
			starChange(e) {
				this.starValue = e.detail.value;
				this.$emit('update:starDateTime', this.starValue);
				this.disabled = false;
			},
			endChange(e) {
				this.endValue = e.detail.value;
				this.$emit('update:endDateTime', this.endValue);
				this.$emit('select', { star: this.starValue, end: this.endValue });
			}
		},
	}
</script>

<style>
</style>