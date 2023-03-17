<template>
	<view>
		<button @tap="sendCode" :disabled="codeState" :style="{
				backgroundColor: codeState ? disBgColor : bgColor,
				color: codeState ? disTextColor : textColor,
				fontSize: fontSize + 'rpx',
				borderRadius: radius + 'rpx',
				border: border
			}">
			<text v-show='codeState'>{{ defalutTime }}秒后重新获取</text>
			<text v-show='!codeState'>{{ defalutText }}</text>
		</button>
	</view>
</template>

<script>
	/*
	* 组件名：验证码倒计时
	* props：
	* time：倒计时时间
	* text：显示文本
	* againText：计时完毕文本
	* bgColor：背景颜色
	* textColor：文本颜色
	* disBgColor：计时中背景颜色
	* disTextColor：计时中文本颜色
	* fontSize：文本大小，默认单位rpx
	* border：边框
	* radius：圆角值
	* @start 点击按钮事件回调
	* 使用方式：在获取验证接口调用成功之后使用ref直接调用start即可开始计时
	* 在组件绑定ref='veriticationCode';
	* 调用示例：this.$refs.veriticationCode.start();
	*/
	export default {
		props: {
			time: {
				type: [ String, Number ],
				default: 50
			},
			text: {
				type: String,
				default: '获取验证码'
			},
			againText: {
				type: String,
				default: '重新获取'
			},
			bgColor: {
				type: String,
				default: '#fff'
			},
			textColor: {
				type: String,
				default: '#333'
			},
			disBgColor: {
				type: String,
				default: '#eee'
			},
			disTextColor: {
				type: String,
				default: '#999'
			},
			fontSize: {
				type: [ String, Number ],
				default: 32
			},
			border: {
				type: String,
				default: '1px solid #333'
			},
			radius: {
				type: [ String, Number ],
				default: 10
			}
		},
		data() {
			return {
				codeState: false,
				defalutTime: 50,
				defalutText: '获取验证码',
				timer: ''
			}
		},
		methods: {
			sendCode() {
				this.$emit('start');
			},
			start(){
				if(this.codeState){return}
				this.defalutTime = this.time;
				this.codeState = true;
				this.timer = setInterval( () => {
					if(this.defalutTime <= 1){ 
						clearInterval(this.timer);
						this.defalutText = this.againText;
						this.codeState = false;
						return
					}
					this.defalutTime--
				}, 1000)
			},
			end(){
				clearInterval(this.timer);
				this.defalutTime = this.time;
				this.defalutText = this.text;
				this.codeState = false;
			},
		},
		created() {
			this.defalutTime = this.time;
			this.defalutText = this.text;
		}
	}
</script>

<style scoped>
	uni-button:after{
		border: 0px solid #000;
	}
</style>