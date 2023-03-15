<template>
	<view class="dFilter">
		<uni-drawer ref="show" :mode="mode" :maskClick="isMaskClick" :width="260" @change='drawerStateChange'>
			<scroll-view style="height: calc( 100% - 140rpx );" scroll-y="true">
				<view class="padding-md">
					<view v-for="(item, index) in configData" :key='item.prop' class="margin-b-lg">
						<view class="title">{{ item.title }}</view>
						
						<!-- <view v-if="!item.type || item.type == 'label'" class="lableTypeBox">
							<view class="flex flex-warp font-xs">
								<view v-for="(cItem, cIndex) in item.options" :key='cItem.value' @tap='checkTagsItem(cItem, cIndex, item)'
									class="margin-b-sm padding-r-sm">
									<view :class="[ cIndex == item.active ? 'avtive' : 'default', 'tags' ]">
										{{ cItem.label }}
									</view>
								</view>
							</view>
						</view> -->
						
						<!-- <view v-if="item.type == 'checked'" class="checkedTypeBox">
							<view class="flex flex-warp font-xs">
								<view v-for="(cItem, cIndex) in item.options" :key='cItem.value' @tap='checkedItem(cItem, cIndex, item)'
									class="margin-b-sm padding-r-sm">
									<view class="flex">
										<checkbox :value="cItem.value" :checked="cItem.checked" 
											style="transform:scale(0.7)"/>
										<view style="height: 50rpx;line-height: 50rpx;">{{ cItem.label }}</view>
									</view>
								</view>
							</view>
						</view> -->
						
						<!-- <view v-if="item.type == 'radio'" class="radioTypeBox">
							<radio-group class="flex flex-warp font-xs">
								<view v-for="(cItem, cIndex) in item.options" :key='cItem.value' @tap='checkTagsItem(cItem, cIndex, item)'
									class="margin-b-sm padding-r-sm flex">
									<view>
										<radio :value="cItem.value" :checked="cIndex === item.active" style="transform:scale(0.7)"/>
									</view>
									<view style="height: 50rpx;line-height: 50rpx;">{{ cItem.label }}</view>
								</view>
							</radio-group>
						</view> -->
						
						<!-- <view v-if="item.type == 'interval'" class="intervalTypeBox">
							<input v-model="paramData[item.prop].min" :placeholder="item.minPlaceholder || '最小值'"
								style="background-color: #eee;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;" />
							<view style="height: 70rpx;line-height: 70rpx;padding: 0 20rpx;font-weight: 700;">——</view>
							<input v-model="paramData[item.prop].max"  :placeholder="item.maxPlaceholder || '最大值'"
								style="background-color: #eee;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;" />
						</view> -->

						<view v-if="item.type == 'dateTime'" class="dateTimeTypeBox">
							<picker :value='paramData.dateTimeValue.star' mode="date" @change="(e) => { bindDateChange(e, item, 'star') }" style="width: 100%;">
								<view style="background-color: #eee;height: 70rpx;width: 100%;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;">
								{{ paramData.dateTimeValue.star || item.starPlaceholder || '' }}
								</view>
							</picker>
							<!-- <view style="height: 70rpx;line-height: 70rpx;padding: 0 20rpx;width: 30rpx;"> 至 </view>
							<picker :value='paramData[item.prop].end' mode="date" @change="(e) => { bindDateChange(e, item) }" style="width: 100%;">
								<view style="background-color: #eee;height: 70rpx;width: 100%;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;">
								{{ paramData[item.prop].end || item.endPlaceholder || '' }}
								</view>
							</picker> -->
						</view>
						
					</view>
				</view>
			</scroll-view>
			<view class="btnsBox">
				<button @click="reset" class="btn resetBtn">重置</button>
				<button @click="filter" class="btn filterBtn">筛选</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	/*
	* 组件名称：popup弹框
	* props：
	* value: 显隐控制
	* mode：弹出方向，left，right
	* isMaskClick: 点击遮罩是否可以关闭抽屉
	*/
	import UniDrawer from "@/components/uni/uni-drawer/components/uni-drawer/uni-drawer.vue"
	import UniTransition from "@/components/uni/uni-transition/components/uni-transition/uni-transition.vue"
	export default {
		components: {
			UniDrawer, UniTransition
		},
		props: {
			value: {
				type: Boolean,
				default: false
			},
			config: {
				type: Array,
				require: true
			},
			mode: {
				type: String,
				default: 'right'
			},
			isMaskClick: {
				type: Boolean,
				default: true
			},
		},
		watch: {
			value(val){
				if(val){
					if(val) this.$refs.show.open();
					this.configData = JSON.parse(JSON.stringify(this.config));
					this.configData.map( item => {
						if(item.type == 'label' || item.type == 'radio'){
							this.paramData[item.prop] = item.options && item.options[item.active] || '';
						}else if(item.type == 'checked'){
							this.paramData[item.prop] = [];
							item.options.map(cItem => {
								if(cItem.checked){
									this.paramData[item.prop].push(cItem);
								}
							});
						}else if(item.type == 'interval'){
							this.paramData[item.prop] = {};
							this.paramData[item.prop].min = '';
							this.paramData[item.prop].max = '';
						}else if(item.type == 'dateTime'){
							this.paramData[item.prop] = {};
							this.paramData[item.prop].star = ''
							this.paramData[item.prop].end = '';
						}
					});
					console.log(this.paramData);
				}
			},
		},
		data() {
			return {
				configData: [],
				paramData: {},
				test: {
					dateTimeValue: {
						star: '',
						end: ''
					}
				}
			}
		},
		methods: {
			checkTagsItem(item, index, fItem){
				this.$nextTick(()=>{
					fItem.active = index;
					this.paramData[fItem.prop] = item.value;
				});
			},
			checkedItem(item, index, fItem){
				this.$nextTick(()=>{
					item.checked = !item.checked;
					this.paramData[fItem.prop] = [];
					fItem.options.map( i => {
						if(i.checked){ 
							this.paramData[fItem.prop].push(i);
						}
					});
				});
			},
			bindDateChange(e, item, key){
				this.$nextTick(()=>{
					this.paramData.dateTimeValue.star = e.detail.value;
				});
				console.log(this.paramData);
			},
			reset(){
				console.log(this.config);
				this.config.map( item => {
					if(item.type == 'label' || item.type == 'radio'){
						this.paramData[item.prop] = item.options && item.options[item.active] || '';
					}else if(item.type == 'checked'){
						this.paramData[item.prop] = [];
						item.options.map(cItem => {
							if(cItem.checked){
								this.paramData[item.prop].push(cItem);
							}
						});
					}else if(item.type == 'interval'){
						this.paramData[item.prop] = {};
						this.paramData[item.prop].min = '';
						this.paramData[item.prop].max = '';
					}else if(item.type == 'dateTime'){
						this.paramData[item.prop] = '';
					}
				});
				console.log('reset');
			},
			filter(){
				console.log(this.paramData);
				console.log('filter');
			},
			drawerStateChange(state) {
				this.$emit('input', state)
				this.$emit('change', state)
			},
			maskClick(){
				this.$emit('maskClick');
			},
		},
	}
</script>

<style scoped lang="scss">
	.dFilter{
		.title{
			font-size:  32rpx;
			font-weight: 700;
			color: #333333;
			margin-bottom: 20rpx;
		}
		.lableTypeBox{
			.tags{
				width: 140rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
			}
			.avtive{
				border-radius: 2px;
				border: 1px solid #6A77F7;
				color: #6A77F7;
			}
			.default{
				border: 1px solid #eee;
				background-color: #eee;
				color: #666;
			}
		}
		.intervalTypeBox{
			display: flex;
		}
		.dateTimeTypeBox{
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
		.btnsBox{
			height: 140rpx;
			width: 100%;
			display: flex;
			padding: 20rpx;
			box-sizing: border-box;
			.btn{
				height: 68rpx;
				line-height: 68rpx;
				font-size: 28rpx;
				width: 50%;
				border-radius: 0;
				color: #fff;
			}
			.resetBtn{
				background-color: eee;
				color: #999;
				border: 1px solid #dcdcdc;
				border-top-left-radius: 15px;
				border-bottom-left-radius: 15px;
			}
			.filterBtn{
				background-color: #2483eb;
				border-top-right-radius: 15px;
				border-bottom-right-radius: 15px;
			}
		}
	}
	/deep/ button::after{
		border-radius: 0;
		border: none;
	}
</style>