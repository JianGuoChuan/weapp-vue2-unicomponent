<template>
	<view class="flex">
		<view style="width: 50rpx;height: 50rpx;background-color: #eee;line-height: 48rpx;text-align: center;"
			@tap='minus'>-</view>
		<view style="width: 100rpx;text-align: center;background-color: #eee;margin: 0 5rpx;">
			<input v-model="stepValue" :placeholder="placeholderValue" @input='change' @blur='blur' @click='click'/>
		</view>
		<view style="width: 50rpx;height: 50rpx;background-color: #eee;line-height: 48rpx;text-align: center;"
			@tap='plus'>+</view>
	</view>
</template>

<script>
	export default {
		props: {
			value : { //默认值
				type : [String , Number],
				default: 0
			},
			max : { //最大值
				type : String,
				default:''
			},
			min : { // 最小值
				type : String,
				default: '0'
			},
			step : { // 加减步长
				type : String,
				default: '1'
			},
			keepInt : { // 是否保持 整数
				type : Boolean,
				default: false
			},
			insertMode : { // 插入模式 会覆盖原数据 直接在元数据上修改
				type : Boolean,
				default: true
			}
		},
		watch: {
		    value: {
				handler(){
					this.stepValue = Number(this.value)
				},
				immediate: true
		    },
		},
		data() {
			return {
				stepValue: '',
				timeValue: '',
				placeholderValue: ''
			}
		},
		methods: {
			// 数据广播 0 change   1 blur   2 minus   3  plus
			emitData(type){
				this.defaultValue = this.keepInt ? parseInt(this.defaultValue ) : parseFloat(this.defaultValue);
				this.$emit('input',this.defaultValue);
				switch(type){
					case 0 : this.$emit('change',this.defaultValue);break;
					case 1 : this.$emit('blur',this.defaultValue);break;
					case 2 : this.$emit('minus',this.defaultValue);break;
					case 3 : this.$emit('plus',this.defaultValue);break;
					default : this.$emit('change',this.defaultValue);break;
				}
			},
			click(){
				this.timeValue = this.value;
				if(this.insertMode){
					this.placeholderValue = this.value + '';
					this.stepValue = '';
				}
			},
			// 焦点消失 触发
			blur(){
				if((this.timeValue == this.placeholderValue) && !this.stepValue){
					this.stepValue = this.timeValue
				}
				if( this.max && this.stepValue > Number(this.max) ){ this.stepValue = Number(this.max); }
				if( this.stepValue < Number(this.min) ){ this.stepValue = Number(this.min); }
				if( !this.stepValue ){
					this.stepValue = 0;
					this.$emit( 'input' , 0);
					this.$emit( 'blur' , 0);
					return
				}
				this.emitData(1)
			},
			// 数值改变
			change(value){
				if( this.max && this.stepValue > Number(this.max) ){ this.stepValue = Number(this.max); }
				if( this.stepValue < Number(this.min) ){ this.stepValue = Number(this.min); }
				if( !this.stepValue ){ return }
				this.emitData(0);
			},
			// 减少按钮
			minus(){
				// 调用防误差方法  防止：2.55 - 1 != 1.55  而是 =1.5499999999999998 的情况
				this.stepValue = this.mathNum( this.stepValue , Number(this.step) , 0);
				if( this.stepValue <= Number(this.min) ){
					this.stepValue = Number(this.min) ;
				}
				this.emitData(2);
			},
			plus(){
				// 与上同理
				this.stepValue = this.mathNum(this.stepValue , Number(this.step) , 1);
				if(this.max){
					if(this.stepValue >= Number(this.max) ){
						this.stepValue = Number(this.max) ; 
					}
				}
				this.emitData(3);
			},
			// 解决误差
			mathNum (num1, num2, key = 1) {
			    let sq1, sq2, multiple;
			    try {sq1 = num1.toString().split(".")[1].length;}
			    catch (e) {sq1 = 0;}
			    try {sq2 = num2.toString().split(".")[1].length;}
			    catch (e) {sq2 = 0;}
			    multiple = Math.pow(10, Math.max(sq1, sq2) + 1);
				if(key){return (num1 * multiple + num2 * multiple) / multiple;}
				return (num1 * multiple - num2 * multiple) / multiple;
			}
		},
	}
</script>

<style>
</style>