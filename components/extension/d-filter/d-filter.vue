<template>
	<view class="dFilter">
		<uni-drawer ref="show" :mode="mode" :maskClick="isMaskClick" :width="width" @change='drawerStateChange'>
			<view class="text-center font-bold text-word-spacing-1 border-b-whitegrey" style="height: 70rpx;line-height: 70rpx;">
				<text>{{ filterTitle }}</text>
			</view>
			<scroll-view style="height: calc( 100% - 210rpx );" scroll-y="true">
				<view class="padding-md">
					<view v-for="(item, index) in configData" :key='item.prop' class="margin-b-lg">
						<view class="title flex space-between" @tap='foldControl(item)'>
							<text>{{ item.title }}</text>
							<text class="icon-ecrt icon-ecrt-jdown text-gray padding-t-m" 
								v-show="item.foldClose == false && item.foldClose != undefined"></text>
							<text class="icon-ecrt icon-ecrt-jup text-gray padding-t-m" 
								v-show="item.foldClose == true && item.foldClose != undefined"></text>
						</view>
						
						<view :style="{ 'height': item.foldClose ? '0' : 'auto' }" class="transition200 over-hidden">
							<view v-if="!item.type || item.type == 'label'" class="lableTypeBox flex flex-warp font-xs">
								<view v-for="(cItem, cIndex) in item.options" :key='cItem.value' 
									@tap='checkTagsItem(cItem, cIndex, item)'
									class="padding-xs border-box" style="width: 33%;">
									<view :class="[ paramData[item.prop].value == cIndex ? 'avtive' : 'default', 'tags' ]">
										{{ cItem.label }}
									</view>
								</view>
								<!-- label类型自定义扩展 -->
								<slot name='customTag'></slot>
								<!-- 使用示例： <template v-slot:customTag> tags </template> -->
							</view>
							
							<view v-if="item.type == 'checked'" class="checkedTypeBox">
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
							</view>
							
							<view v-if="item.type == 'radio'" class="radioTypeBox">
								<radio-group class="flex flex-warp font-xs">
									<view v-for="(cItem, cIndex) in item.options" :key='cItem.value' @tap='checkTagsItem(cItem, cIndex, item)'
										class="margin-b-sm padding-r-sm flex">
										<view>
											<radio :value="cItem.value" :checked="cIndex === item.active" style="transform:scale(0.7)"/>
										</view>
										<view style="height: 50rpx;line-height: 50rpx;">{{ cItem.label }}</view>
									</view>
								</radio-group>
							</view>
							
							<view v-if="item.type == 'interval'" class="intervalTypeBox">
								<input v-model="paramData[item.prop].min" :placeholder="item.minPlaceholder || '最小值'" type="number"
									style="background-color: #eee;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;" />
								<view style="height: 70rpx;line-height: 70rpx;padding: 0 20rpx;font-weight: 700;">——</view>
								<input v-model="paramData[item.prop].max"  :placeholder="item.maxPlaceholder || '最大值'" type="number"
									style="background-color: #eee;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;" />
							</view>
							
							<view v-if="item.type == 'dateTime'" class="dateTimeTypeBox">
								<picker :value='dateStar' mode="date" @change="(e) => { bindDateChange(e, item, 'star') }" 
									style="width: 100%;">
									<view style="background-color: #eee;height: 70rpx;width: 100%;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;color: #808080;">
										{{ dateStar || item.starPlaceholder || '起始日期' }}
									</view>
								</picker>
								<view style="height: 70rpx;line-height: 70rpx;padding: 0 20rpx;width: 30rpx;"> 至 </view>
								<picker :value='dateEnd' mode="date" :start='dateStar' @change="(e) => { bindDateChange(e, item, 'end') }" 
									style="width: 100%;">
									<view style="background-color: #eee;height: 70rpx;width: 100%;line-height: 70rpx;text-align: center;border-radius: 30rpx;font-size: 24rpx;color: #808080;">
										{{ dateEnd || item.endPlaceholder || '截止日期' }}
									</view>
								</picker>
							</view>
						</view>
					</view>
					<!-- 自定义筛选类型 -->
					<view><slot></slot></view>
				</view>
			</scroll-view>
			<view class="btnsBox">
				<button @tap="reset" class="btn resetBtn" 
					:style="{ 'backgroundColor': resetBtnBgColor, 'color': resetBtnColor }">{{ resetText }}</button>
				<button @tap="filter" class="btn filterBtn" 
					:style="{ 'backgroundColor': filterBtnBgColor, 'color': filterBtnColor }">{{ filterText }}</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	/*
	* 组件名称：filter筛选 bate版
	* props：
	* value: 显隐控制
	* config：筛选项配置 见下方示例
	* mode： 弹出方向 left/right
	* width: 筛选栏宽度，number类型,仅支持初始化宽度
	* filterTitle: 筛选栏标题
	* filterText: 筛选按钮文本
	* resetText: 重置按钮文本
	* filterBtnBgColor: 筛选按钮背景颜色
	* resetBtnBgColor: 重置按钮背景颜色
	* filterBtnColor: 筛选按钮文本颜色
	* resetBtnColor: 重置按钮文本颜色
	* isMaskClick: 点击遮罩是否可以关闭抽屉
	* isAutoClose: 是否操作时弹框跟随关闭
	*/
	// config示例：
	// {
	// 	title: '标签', 标题
	// 	prop: 'type', 关键字
	// 	type: 'label', 筛选项类型：支持label标签型，checked多选型，radio单选型，interval区间值型，datetime日期区间型
	// 	active: 0, 默认选择项 匹配值为options数组的下标
	// 	options: [ // label/checked/radio的配置项列表，checked类型需添加checked：true|false 决定默认是否已选中
	// 		{ label: "不限", value: 0, checked: true },
	// 		{ label: "月结", value: 1 },
	// 		{ label: "日结", value: 2 },
	// 		{ label: "小时工", value: 3 },
	// 		{ label: "计件", value: 4 }
	// 	],
	//  minPlaceholder: '最小值', 区间值的开始内容占位文本
	//  maxPlaceholder: '最大值',  区间值的结尾内容占位文本
	//  starPlaceholder: '起始日期', 日期区间的开始框占位文本
	//  endPlaceholder: '截止日期', 日期区间的结束框占位文本
	//  foldClose: false, 是否启用筛选项折叠，不传递true或者false则不可点击折叠
	// },
	// 备注：uni picker机制原因，目前日期类型仅支持使用一次，不可重复添加配置，如需多个日期区间的筛选，请自行在组件内添加备用区间prop属性
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
			filterTitle: {
				type: String,
				default: '全部筛选'
			},
			width: {
				type: Number,
				default: 260
			},
			isMaskClick: {
				type: Boolean,
				default: true
			},
			isAutoClose: {
				type: Boolean,
				default: true
			},
			filterText: {
				type: String,
				default: '筛选'
			},
			resetText: {
				type: String,
				default: '重置'
			},
			filterBtnBgColor: {
				type: String,
				default: '#2483eb'
			},
			resetBtnBgColor: {
				type: String,
				default: '#eee'
			},
			filterBtnColor: {
				type: String,
				default: '#fff'
			},
			resetBtnColor: {
				type: String,
				default: '#999'
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
				}
			},
		},
		data() {
			return {
				configData: [],
				paramData: {},
				dateStar: '',
				dateEnd: '',
			}
		},
		methods: {
			// 折叠控制
			foldControl(item){
				if( item.foldClose == undefined ) return
				this.$nextTick(()=>{
					item.foldClose = !item.foldClose;
				});
			},
			// 选择标签
			checkTagsItem(item, index, fItem){
				this.$nextTick(()=>{
					fItem.active = index;
					this.paramData[fItem.prop] = item;
				});
			},
			// 多选控制
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
			// 日期控制
			bindDateChange(e, item, key){
				if(!this.paramData[item.prop]){ this.paramData[item.prop] = {} }
				if(key == 'star'){
					this.dateStar = e.detail.value;
					this.paramData[item.prop].star = e.detail.value;
					this.dateEnd = '';
					this.paramData[item.prop].end = '';
				}else if(key == 'end'){
					this.dateEnd = e.detail.value;
					this.paramData[item.prop].end = e.detail.value;
				}
				console.log(this.paramData);
			},
			// 筛选重置
			reset(){
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
						this.dateStar= '';
						this.dateEnd= '';
						this.paramData[item.prop] = {};
						this.paramData[item.prop].star = ''
						this.paramData[item.prop].end = '';
					}
				});
				this.$emit('reset', this.paramData);
				if(this.isAutoClose){
					this.$refs.show.close();
				}
			},
			// 筛选
			filter(){
				this.$emit('filter', this.paramData);
				if(this.isAutoClose){
					this.$refs.show.close();
				}
			},
			// 弹框显隐
			drawerStateChange(state) {
				this.$emit('input', state)
				this.$emit('change', state)
			},
			// 遮罩点击
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
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				padding: 4rpx 12rpx;
				text-align: center;
				line-height: 60rpx;
			}
			.avtive{
				border-radius: 2px;
				border: 1px solid #6A77F7;
				color: #6A77F7;
			}
			.default{
				border-radius: 4rpx;
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
				background-color: #eee;
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