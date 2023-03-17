<template>
	<view class="ratebar">
		<view class="flex" v-if="disabled">
			<!-- 实心组 -->
			<view v-if="!activeIcon">
				<text class="icon-ecrt icon-ecrt-rateFill" v-for="rItem in fillCount"
					:style="{ 'fontSize': size + 'rpx', 'color': color }"></text>
			</view>
			<view v-else>
				<image :src="activeIcon" mode="aspectFit" v-for="rItem in fillCount"
					:style="{ 'width': size + 'rpx' }" />
			</view>
			<!-- 半实心组 -->
			<view v-if="!halfactionIcon">
				<text class="icon-ecrt icon-ecrt-rateHalfFill" :style="{ 'fontSize': size + 'rpx', 'color': color }"
					v-if="halfCount"></text>
			</view>
			<view v-else>
				<image :src="halfactionIcon" mode="aspectFit" :style="{ 'width': size + 'rpx' }"
					v-if="halfCount" />
			</view>
			<!-- 空心组 -->
			<view v-if="!inactiveIcon">
				<text class="icon-ecrt icon-ecrt-rateSpace" v-for="rItem in spaceCount"
					:style="{ 'fontSize': size + 'rpx', 'color': color }"></text>
			</view>
			<view v-else>
				<image :src="inactiveIcon" mode="aspectFit" v-for="rItem in spaceCount"
					:style="{ 'width': size + 'rpx' }" />
			</view>
		</view>
		<view class="flex" v-else>
			<view v-for="item in options" :key='item.key' @tap='selectRate(item)'>
				<!-- 启用了自定义图标 -->
				<view v-if='activeIcon'>
					<image :src="activeIcon" mode="aspectFit" v-if="selectValue >= item.key"
						:style="{ 'width': size + 'rpx', 'height': size + 'rpx' }" />
					<image :src="inactiveIcon" mode="aspectFit" v-if="selectValue < item.key"
						:style="{ 'width': size + 'rpx', 'height': size + 'rpx' }" />
				</view>
				<!-- 未启用自定义图标 -->
				<view v-else>
					<text class="icon-ecrt icon-ecrt-rateFill" v-if="selectValue >= item.key"
						:style="{ 'fontSize': size + 'rpx' }"></text>
					<text class="icon-ecrt icon-ecrt-rateSpace" v-if="selectValue < item.key"
						:style="{ 'fontSize': size + 'rpx' }"></text>
				</view>
			</view>
			<!-- 文本描述 -->
			<view class="margin-l-md" 
				:style="{ 'fontSize': labelSize + 'rpx', 'color': labelColor }" 
				v-if='labelShow'>
				{{ rateLabel || options[fillCount - 1].label }}
			</view>
		</view>
	</view>
</template>

<script>
	/*
	* 组件名称：评分栏
	* value：分数，数值类型
	* options: 评分配置，见下方示例
	* activeIcon：自定义填充图标url
	* inactiveIcon： 自定义空心图标url
	* halfactionIcon： 自定义半填充图标url
	* total：评分总分
	* color：默认图标颜色
	* size：图标尺寸，默认单位rpx
	* labelShow：是否显示评分配置对应文本
	* labelSize：评分文本大小
	* labelColor：评分文本颜色
	* disabled：是否停用可点击变为只读模式，只读后支持显示半星
	*/
	// option示例：
	// options: [
	// 	{key: 1, label: '不推荐'},
	// 	{key: 2, label: '一 般'},
	// 	{key: 3, label: '推 荐'},
	// 	{key: 4, label: '比较推荐'},
	// 	{key: 5, label: '十分推荐'},
	// 	{key: 6, label: '此生必去'},
	// ]
	// 示例：
	// <RateBar v-model="rate" total='6' size='50' :disabled="false"
	// 	active-icon='https://xxxxxxxxxxxxxx'
	// 	inactive-icon='https://xxxxxxxxxxxxxx'
	// 	halfaction-icon='https://xxxxxxxxxxxxxx'
	// 	:options='rateList' @select='rateSelect'></RateBar>
	export default {
		props: {
			value: {
				type: Number,
				default: 5
			},
			options: {
				type: Array,
			},
			activeIcon:{
				type: String,
				default: ''
			},
			inactiveIcon:{
				type: String,
				default: ''
			},
			halfactionIcon: {
				type: String,
				default: ''
			},
			total: {
				type: [String, Number],
				default: 5
			},
			color: {
				type: String,
				default: '#666'
			},
			size: {
				type: [String, Number],
				default: 32
			},
			labelShow: {
				type: Boolean,
				default: true
			},
			labelSize: {
				type: [String, Number],
				default: 32
			},
			labelColor: {
				type: String,
				default: '#666'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			value: {
				handler(value){
					this.selectValue = value;
					// 若为浮点数
					if(!(value.toString().indexOf('.') == -1)){
						this.fillCount = parseInt(value);
						this.spaceCount = this.total - this.fillCount - 1;
						this.halfCount = 1; // 开启半星
					}else{
						this.fillCount = value;
						this.spaceCount = this.total - value;
						this.halfCount = 0; // 关闭半星
					}
				},
				immediate: true
			}
		},
		data() {
			return {
				fillCount: 5, // 实心数
				spaceCount: 0, // 空心数
				halfCount: 0, // 半星数
				selectValue: 5, // 选择数
				rateLabel: '' // 文本容器
			}
		},
		created() {
			
		},
		methods: {
			// 选择回调
			selectRate(item) {
				this.selectValue = item.key;
				this.rateLabel = item.label;
				this.$emit('select', item)
			}
		},
	}
</script>

<style>
</style>