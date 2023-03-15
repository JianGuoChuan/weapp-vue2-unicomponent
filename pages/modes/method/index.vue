<template>
	<view>
		methods
		<button @tap='to'>to</button>
		<view style="margin-top: 50rpx;padding-left: 50rpx;">
			<StepNumber v-model="number"></StepNumber>
		</view>
		
		<!-- <view class="padding-md bradius-md shadow-m-bottom text-primary text-word-spacing-1"> -->
			<!-- <view>
				<view class="margin-b-com">输入框</view>
				<InputBar v-model="value" :clearIcon='true'
					leftIcon='icon-ecrt icon-ecrt-search'></InputBar>
			</view>
			<view>
				<view class="margin-tb-com">类型选择搜索框</view>
				<SearchBar :options="options" mode='typeSearch'></SearchBar>
			</view>
			<view>
				<view class="margin-tb-com">日期范围选择器</view>
				<DateTime></DateTime>
			</view>
			<view>
				<view class="margin-tb-com">列表项</view>
				<ListItem :config='config'></ListItem>
			</view>
			<view>
				<view class="margin-tb-com">模态框</view>
				<button class="bg-primary bradius-round text-white font-com margin-t-md" @tap='modalShow = true'>开</button>
				<Modalplus :show.sync='modalShow'></Modalplus>
			</view>
			<view>
				<view class="margin-tb-com">评分栏</view>
				<RateBar v-model="rate" total='6' size='50' :disabled="false"
					active-icon='https://xdxdd3-weapp-1257088705.cos.ap-guangzhou.myqcloud.com/wxapp/rate_fill.png'
					inactive-icon='https://xdxdd3-weapp-1257088705.cos.ap-guangzhou.myqcloud.com/wxapp/rate.png'
					halfaction-icon='https://xdxdd3-weapp-1257088705.cos.ap-guangzhou.myqcloud.com/wxapp/my/halfRate.png'
					:options='rateList' @select='rateSelect'></RateBar>
			</view>
			<view>
				<view class="margin-tb-com">图片加载</view>
				<LazyImage :src='imageSrc'></LazyImage>
			</view>
			<view>
				<view class="margin-tb-com">缺省图标</view>
				<Empty v-model="emptyShow"></Empty>
			</view>
			<view>
				<view class="margin-tb-com">验证码倒计时</view>
				<VerificationCode time='10' radius='50' @start='start' ref='veriticationCode'></VerificationCode>
			</view> -->
			<!-- <view>
				<view class="margin-tb-com">抽屉筛选</view>
				<button class="bg-primary bradius-round text-white font-com margin-t-md" @tap='filterShow = true'>开</button>
			</view> -->
		<!-- </view> -->
		
	</view>
</template>

<script>
	import check from "@/utils/js/check.js"
	import StepNumber from "@/components/d/d-stepNumber/d-stepNumber.vue"
	export default {
		components: {
			StepNumber
		},
		data() {
			return {
				number: 0,
				value: '',
				modalShow: false,
				config: [
					{
						key: 'name',
						mandatory: true,
						icon: 'icon-ecrt icon-ecrt-users',
						label: '姓名',
						type: 'input',
						placeholder: '请输入姓名',
					},{
						key: 'age',
						mandatory: true,
						icon: 'icon-ecrt icon-ecrt-encryption',
						label: '年龄',
						type: 'input',
						inputType: 'number',
						placeholder: '请输入年龄',
						
					},{
						key: 'remark',
						mandatory: true,
						icon: 'icon-ecrt icon-ecrt-encryption',
						label: '个人介绍',
						type: 'textarea',
						placeholder: '个人介绍',
						
					}
				],
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
				rate: 5.5,
				rateList: [
					{key: 1, label: '不推荐'},
					{key: 2, label: '一 般'},
					{key: 3, label: '推 荐'},
					{key: 4, label: '比较推荐'},
					{key: 5, label: '十分推荐'},
					{key: 6, label: '此生必去'},
				],
				imageSrc: '',
				emptyShow: true,
				filterShow: false,
			}
		},
		methods: {
			to() {
				this.$routes.to('/pages/modes/test/test', { id: 123 })
			},
			rateSelect(item){
				console.log(item);
			},
			mockImageUrl(){
				setTimeout(()=>{
					this.imageSrc = 'https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg'
				}, 1500)
			},
			start(){
				this.$refs.veriticationCode.start();
			}
		},
		onLoad() {
			console.log(this);
			// this.$d.vuex('token2', '666');
			// console.log(this.token2);
			// console.log(check.checkByRule('IDcard', '430725199503610215'));
			
			// const res1 = await this.$api.generalApi.testApi();
			// const res2 = await this.$api.generalApi.test2Api();
			// this.$api.generalApi.test2Api().then( res => {
			// 	console.log(res);
			// });
		}
	}
</script>

<style>
</style>