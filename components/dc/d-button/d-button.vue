<template>
	<button class="d-btn" :class="[
			plain ? 'd-' + type + '-outline' : 'd-btn-' + (type || 'primary'),
			getDisabledClass(disabled, type, plain),
			getShapeClass(shape, plain),
			getShadowClass(type, shadow, plain),
			bold ? 'd-text-bold' : '',
			link ? 'd-btn__link' : '',
			width==='100%' || !width || width===true?'d-btn__flex-1':''
		]" :hover-class="getHoverClass(disabled, type, plain)"
		:style="{ width: width, height: height, lineHeight: height, fontSize: size + 'rpx', margin: margin }"
		:loading="loading" :form-type="formType" :open-type="openType" @getuserinfo="bindgetuserinfo"
		@getphonenumber="bindgetphonenumber" @contact="bindcontact" @error="binderror" :disabled="disabled"
		@tap.stop="handleClick">
		<slot></slot>
	</button>
</template>

<script>
	/*
	* 组件名称：按钮
	* props：
	* type：按钮类型：primary, white, danger, warning, green,blue, gray，black,brown,gray-primary,gray-danger,gray-warning,gray-green
	* shadow：阴影
	* width：宽度 rpx或 %
	* height：高度 rpx
	* size：字体大小 rpx
	* bold: 加粗
	* margin：边距
	* shape：形状 circle(圆角), square(默认方形)，rightAngle(平角)
	* plain：镂空
	* link：移除边框，结合plain一起使用
	* disabled：禁用
	* disabledGray： 禁用置灰（非空心button生效）
	* loading：加载中
	* preventClick： 节流，默认200ms
	* formType：uniButton的form-type
	* openType：uniButton的开放能力，比如分享等
	* @click 点击事件
	*/
	export default {
		name: 'dButton',
		emits: ['click', 'getuserinfo', 'contact', 'getphonenumber', 'error'],
		props: {
			type: {
				type: String,
				default: 'primary'
			},
			shadow: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '96rpx'
			},
			size: {
				type: Number,
				default: 32
			},
			bold: {
				type: Boolean,
				default: false
			},
			margin: {
				type: String,
				default: '0'
			},
			shape: {
				type: String,
				default: 'square'
			},
			plain: {
				type: Boolean,
				default: false
			},
			link: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			disabledGray: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			},
			openType: {
				type: String,
				default: ''
			},
			index: {
				type: [Number, String],
				default: 0
			},
			preventClick: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				time: 0
			};
		},
		methods: {
			handleClick() {
				if (this.disabled) return;
				if (this.preventClick) {
					if (new Date().getTime() - this.time <= 200) return;
					this.time = new Date().getTime();
					setTimeout(() => {
						this.time = 0;
					}, 200);
				}
				this.$emit('click', {
					index: Number(this.index)
				});
			},
			bindgetuserinfo({
				detail = {}
			} = {}) {
				this.$emit('getuserinfo', detail);
			},
			bindcontact({
				detail = {}
			} = {}) {
				this.$emit('contact', detail);
			},
			bindgetphonenumber({
				detail = {}
			} = {}) {
				this.$emit('getphonenumber', detail);
			},
			binderror({
				detail = {}
			} = {}) {
				this.$emit('error', detail);
			},
			getShadowClass: function(type, shadow, plain) {
				let className = '';
				if (shadow && type != 'white' && !plain) {
					className = 'd-shadow-' + type;
				}
				return className;
			},
			getDisabledClass: function(disabled, type, plain) {
				let className = '';
				if (disabled && type != 'white' && type.indexOf('-') == -1) {
					let classVal = this.disabledGray ? 'd-gray-disabled' : 'd-dark-disabled';
					className = plain ? 'd-dark-disabled-outline' : classVal;
				}
				return className;
			},
			getShapeClass: function(shape, plain) {
				let className = '';
				if (shape == 'circle') {
					className = plain ? 'd-outline-fillet' : 'd-fillet';
				} else if (shape == 'rightAngle') {
					className = plain ? 'd-outline-rightAngle' : 'd-rightAngle';
				}
				return className;
			},
			getHoverClass: function(disabled, type, plain) {
				let className = '';
				if (!disabled) {
					className = plain ? 'd-outline-hover' : 'd-' + (type || 'primary') + '-hover';
				}
				return className;
			}
		}
	};
</script>

<style scoped>
	.d-btn-primary {
		background: #5677fc !important;
		color: #fff;
	}

	.d-shadow-primary {
		box-shadow: 0 10rpx 14rpx 0 rgba(86, 119, 252, 0.2);
	}

	.d-btn-danger {
		background: #eb0909 !important;
		color: #fff;
	}

	.d-shadow-danger {
		box-shadow: 0 10rpx 14rpx 0 rgba(235, 9, 9, 0.2);
	}

	.d-btn-warning {
		background: #fc872d !important;
		color: #fff;
	}

	.d-shadow-warning {
		box-shadow: 0 10rpx 14rpx 0 rgba(252, 135, 45, 0.2);
	}

	.d-btn-green {
		background: #07c160 !important;
		color: #fff;
	}

	.d-shadow-green {
		box-shadow: 0 10rpx 14rpx 0 rgba(7, 193, 96, 0.2);
	}

	.d-btn-blue {
		background: #007aff !important;
		color: #fff;
	}

	.d-shadow-blue {
		box-shadow: 0 10rpx 14rpx 0 rgba(0, 122, 255, 0.2);
	}

	.d-btn-white {
		background: #fff !important;
		color: #333 !important;
	}

	.d-btn-gray {
		background: #bfbfbf !important;
		color: #fff !important;
	}

	.d-btn-black {
		background: #333 !important;
		color: #fff !important;
	}

	.d-btn-brown {
		background: #ac9157 !important;
		color: #fff !important;
	}

	.d-btn-gray-black {
		background: #f2f2f2 !important;
		color: #333;
	}

	.d-btn-gray-primary {
		background: #f2f2f2 !important;
		color: #5677fc !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.d-gray-primary-hover {
		background: #d9d9d9 !important;
	}

	.d-btn-gray-green {
		background: #f2f2f2 !important;
		color: #07c160 !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.d-gray-green-hover {
		background: #d9d9d9 !important;
	}

	.d-btn-gray-danger {
		background: #f2f2f2 !important;
		color: #eb0909 !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.d-gray-danger-hover {
		background: #d9d9d9 !important;
	}

	.d-btn-gray-warning {
		background: #f2f2f2 !important;
		color: #fc872d !important;
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
	}

	.d-gray-warning-hover {
		background: #d9d9d9 !important;
	}

	.d-shadow-gray {
		box-shadow: 0 10rpx 14rpx 0 rgba(191, 191, 191, 0.2);
	}

	.d-hover-gray {
		background: #f7f7f9 !important;
	}

	.d-black-hover {
		background: #555 !important;
		color: #e5e5e5 !important;
	}

	.d-brown-hover {
		background: #A37F49 !important;
		color: #e5e5e5 !important;
	}

	/* button start*/

	.d-btn {
		width: 100%;
		position: relative;
		/* #ifndef MP-QQ */
		border: 0 !important;
		/* #endif */
		/* #ifdef MP-QQ */
		border: 1rpx solid;
		box-sizing: border-box;
		/* #endif */
		border-radius: 6rpx;
		padding-left: 0;
		padding-right: 0;
		overflow: visible;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.d-btn__flex-1 {
		flex: 1;
	}

	/* #ifndef MP-QQ */
	.d-btn::after {
		content: '';
		position: absolute;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5) translateZ(0);
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 12rpx;
		border: 0;
	}

	/* #endif */


	/* #ifdef MP-BAIDU */
	/* .d-btn:active::after {
		background-color: rgba(0, 0, 0, 0.2) !important;
	} */
	/* #endif */

	.d-text-bold {
		font-weight: bold;
	}

	/* #ifdef MP-QQ */
	.d-btn-white {
		border: 1rpx solid #bfbfbf;
	}

	/* #endif */

	/* #ifndef MP-QQ */
	.d-btn-white::after {
		border: 1px solid #bfbfbf;
	}

	/* #endif */


	.d-white-hover {
		background: #e5e5e5 !important;
		color: #2e2e2e !important;
	}

	.d-dark-disabled {
		opacity: 0.6 !important;
		color: #fafbfc !important;
	}

	.d-dark-disabled-outline {
		/* #ifdef MP-QQ */
		border: 0 !important;
		/* #endif */
		opacity: 0.5 !important;
	}

	.d-gray-disabled {
		background: #f3f3f3 !important;
		color: #919191 !important;
		box-shadow: none;
	}

	.d-outline-hover {
		opacity: 0.5 !important;
	}

	.d-primary-hover {
		background: #4a67d6 !important;
		color: #e5e5e5 !important;
	}

	/* #ifndef MP-QQ */
	.d-primary-outline::after {
		border: 1px solid #5677fc !important;
	}

	/* #endif */

	.d-primary-outline {
		color: #5677fc !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #5677fc !important;
		/* #endif */
	}

	.d-danger-hover {
		background: #c80808 !important;
		color: #e5e5e5 !important;
	}

	.d-danger-outline {
		color: #eb0909 !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #eb0909 !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.d-danger-outline::after {
		border: 1px solid #eb0909 !important;
	}

	/* #endif */

	.d-warning-hover {
		background: #d67326 !important;
		color: #e5e5e5 !important;
	}

	.d-warning-outline {
		color: #fc872d !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #fc872d !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.d-warning-outline::after {
		border: 1px solid #fc872d !important;
	}

	/* #endif */

	.d-green-hover {
		background: #06ad56 !important;
		color: #e5e5e5 !important;
	}

	.d-green-outline {
		color: #07c160 !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #07c160 !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.d-green-outline::after {
		border: 1px solid #07c160 !important;
	}

	/* #endif */

	.d-blue-hover {
		background: #0062cc !important;
		color: #e5e5e5 !important;
	}

	.d-blue-outline {
		color: #007aff !important;
		background: transparent;
		/* #ifdef APP-PLUS */
		border: 1rpx solid #007aff !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.d-blue-outline::after {
		border: 1px solid #007aff !important;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.d-btn-gradual {
		background: linear-gradient(90deg, rgb(255, 89, 38), rgb(240, 14, 44)) !important;
		color: #fff !important;
	}

	.d-shadow-gradual {
		box-shadow: 0 10rpx 14rpx 0 rgba(235, 9, 9, 0.15);
	}

	/* #endif */

	.d-gray-hover {
		background: #a3a3a3 !important;
		color: #898989;
	}

	/* #ifndef APP-NVUE */
	.d-gradual-hover {
		background: linear-gradient(90deg, #d74620, #cd1225) !important;
		color: #fff !important;
	}

	/* #endif */

	.d-gray-outline {
		color: #999 !important;
		background: transparent !important;
	}

	.d-white-outline {
		color: #fff !important;
		background: transparent !important;
		/* #ifdef MP-QQ */
		border: 1rpx solid #fff !important;
		/* #endif */
	}

	.d-black-outline {
		background: transparent !important;
		color: #333 !important;
		/* #ifdef MP-QQ */
		border: 1rpx solid #ccc !important;
		/* #endif */
	}

	/* #ifndef MP-QQ */
	.d-gray-outline::after {
		border: 1px solid #ccc !important;
	}

	/* #endif */

	/* #ifndef MP-QQ */
	.d-white-outline::after {
		border: 1px solid #fff !important;
	}

	.d-black-outline::after {
		border: 1px solid #333 !important;
	}

	.d-brown-outline::after {
		border: 1px solid #ac9157 !important;
	}

	/* #endif */

	.d-brown-outline {
		color: #ac9157 !important;
		background: transparent;
		/* #ifdef MP-QQ */
		border: 1rpx solid #ac9157 !important;
		/* #endif */
	}

	/*圆角 */

	.d-fillet {
		border-radius: 50rpx;
	}

	.d-btn-white.d-fillet::after {
		border-radius: 98rpx;
	}

	.d-outline-fillet::after {
		border-radius: 98rpx;
	}

	/*平角*/
	.d-rightAngle {
		border-radius: 0;
	}

	.d-btn-white.d-rightAngle::after {
		border-radius: 0;
	}

	.d-outline-rightAngle::after {
		border-radius: 0;
	}

	/* #ifdef MP-QQ */
	.d-btn__link {
		border: 0 !important;
	}

	/* #endif */

	.d-btn__link::after {
		border: 0 !important;
	}
</style>
