<template>
	<view class="relative" id='menuBoxHeight'
		:style="{
			'padding-left' : mode == 'typeSearch' ? `${typeMenuWidth + 10}px` : '0px',
			'padding-right' : filterIcon ? '40rpx' : '0rpx'
		}">
		<!-- 类型标题 -->
		<view @click='openTypeList' id="typeMenuWidth" class="padding-s absolute font-com text-hidden" 
			style="top: 10rpx;left : 5rpx;width: 120rpx;" 
			v-show="mode == 'typeSearch'">
			<text class="margin-right-xs font-md" :class="typeShow ? 'text-bdblue' : 'text-deepgrey'">{{searchTypeName}}</text>
			<text :class="[ 'icon-ecrt icon-ecrt-jdown transition200', typeShow ? 'rotate180' : 'rotate0' ] "></text>
		</view>
		
		<!-- 类型列表 -->
		<view :style="{
				'zIndex' : '99', 
				'top': `${menuBoxHeight}px`,
				'left': '0','transition' : '200ms',
				'height' : typeShow ? `${options.length * menuHeight}px` : '0'}"
				class="absolute over-hidden bg-white width-all font-md">
			<view class="flex space-between padding-md border-b-whitegrey" id='menuHeight'
				v-for="(item,index) in options" :key='item.value' @click='select(item)'>
				<view :class="item.checked ? 'text-skyblue' : ''">{{item.desc}}</view>
				<view>
					<text class="icon-ecrt icon-ecrt-selected01 text-bdblue font-com" v-if="item.checked"></text>
				</view>
			</view>
		</view>
		
		<!-- 搜索输入框 -->
		<input v-model="searchValue" 
			:placeholder="mode=='typeSearch' ? `${searchTypeName}搜索` :placeholder"
			:placeholder-style='placeholderStyle'
			:style="{ 
				paddingLeft: leftIcon ? '65rpx' : paddingLeft + 'rpx', 
				paddingRight: rightIcon && clearIcon ? '110rpx' 
				: searchBtn && clearIcon ? '180rpx' 
				: searchBtn && !clearIcon ? '120rpx' 
				: rightIcon || clearIcon ? '70rpx' 
				: paddingRight,
				paddingTop: padding + 'rpx',
				paddingBottom: padding + 'rpx',
				backgroundColor: bgColor,
				color: textColor,
				border: border,
				borderRadius: radius,
				textAlign: align
			}"
			@confirm='search' />
		<!-- 清除图标 -->
		<text class="icon-ecrt icon-ecrt-roundclose absolute font-bold text-grey"
			:style="{ 
				top: padding == 12 ? '20rpx' : padding + 8 + 'rpx',
				right: rightIcon ? '70rpx' : !rightIcon && searchBtn ? '120rpx' : '20rpx',
				color: iconColor 
			}"
			@tap='clear' v-show="clearIcon && searchValue"></text>
		<!-- 左侧图标 -->
		<text :class="[ 'icon-ecrt icon-ecrt-search absolute font-bold' ]" v-if='leftIcon'
			:style="{ 
				top: padding == 12 ? '20rpx' : padding + 8 + 'rpx',
				left: mode == 'typeSearch' ? typeMenuWidth + 95 + 'rpx'  : '20rpx',
				color: iconColor 
			}"></text>
		<!-- 右侧图标 -->
		<text :class="[ 'icon-ecrt icon-ecrt-search absolute font-bold' ]" v-if='rightIcon'
			:style="{
				top: padding == 12 ? '20rpx' : padding + 8 + 'rpx',
				right: '20rpx',
				color: iconColor 
			}"></text>
		
		<d-button height='52rpx' size='24' width='100rpx' shape='circle' v-if="searchBtn" 
			:style="{ fontSize: '24rpx',position: 'absolute', right: '10rpx', top: padding - 2 + 'rpx', }"
			@click.stop='search'>搜索</d-button>
		
	</view>
</template>

<script>
	/*
	* 组件名称：搜索框
	* props：
	* options：配置项，见下方示例
	* mode：模式，支持search（默认）、typeSearch
	* align: 对齐方式
	* placeholder：占位文本
	* placeholderStyle：占位文本样式
	* clearIcon：清除图标显隐
	* leftIcon：左侧图标显隐
	* rightIcon：右侧图标显隐
	* searchBtn：搜索按钮显隐
	* paddingLeft：左侧内边距
	* padding：上下内边距
	* bgColor：背景颜色
	* textColor：文本颜色
	* border：边框样式
	* radius：圆角值
	* iconColor：图标颜色
	* @search 搜索方法回调
	* @changeType 切换类型回调
	*/
	// options示例：
	// options: [
	// 	{
	// 		label: 'ICCID',
	// 		desc : '按卡ICCID搜索',
	// 		value: 'iccid',
	// 		checked : true
	// 	},{
	// 		label: '按渠道',
	// 		desc : '按归属渠道搜索',
	// 		value: 'formChannel',
	// 		checked : false
	// 	},
	// ],
	export default {
		props:{
			options : {
				type : Array,
				required: true,
			},
			mode: {
				type : String,
				default: 'search'
			},
			align: {
				type : String,
				default: 'left'
			},
			placeholder: {
				type : String,
				default: 'placeholder'
			},
			placeholderStyle: {
				type: String,
				default: ''
			},
			clearIcon: {
				type: Boolean,
				default: false
			},
			leftIcon: {
				type: Boolean,
				default: true
			},
			rightIcon: {
				type: Boolean,
				default: false
			},
			searchBtn: {
				type: Boolean,
				default: false
			},
			paddingLeft: {
				type: Number,
				default: 20
			},
			padding: {
				type: Number,
				default: 12
			},
			bgColor: {
				type : String,
				default: '#fff'
			},
			textColor: {
				type : String,
				default: '#666'
			},
			border: {
				type : String,
				default: '1px solid #eee',
			},
			radius: {
				type : String,
				default: '5rpx'
			},
			iconColor: {
				type : String,
				default: '#666'
			}
		},
		data(){
			return {
				typeShow : false,
				searchValue : '',
				menuBoxHeight : 0,
				menuHeight : 0,
				typeMenuWidth : 0,
				searchTypeName: '',
				searchType: '',
				customStyleHeight : Object.freeze({
					'height' : '30px',
					'width' : '100px'
				}),
				customStyle : Object.freeze({
					'height' : '30px',
					'width' : '100px',
					'backgroundImage': 'linear-gradient(45deg, #0081ff, #1cbbb4);color: #ffffff'
				}),
			}
		},
		methods:{
			openTypeList(){
				this.typeShow = !this.typeShow;
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select('#menuHeight').boundingClientRect(data => {
						this.menuHeight = data.height;
					}).exec();
				});
			},
			// 类型选择入口
			select(item){
				this.typeShow = false;
				if(this.searchType == item.value){ return }
				this.options.map(item=>{
					item.checked = false;
				});
				item.checked = true;
				this.searchTypeName = item.label;
				this.searchType = item.value;
				this.$emit('update:options',this.options);
				this.$emit('changeType',{
					typeName : this.searchTypeName,
					typeValue : this.searchType,
				});
			},
			clear(){
				this.searchValue = '';
				this.$emit('search', this.searchValue);
			},
			search(){
				console.log(111);
				this.$emit('search',this.searchValue);
			},
			cancel(){
				this.searchValue = '';
				this.$emit('cancel',this.searchValue);
			},
		},
		mounted(){
			if(this.mode != 'typeSearch' || !this.options.length) return
			// 设置默认选择项
			this.options.map(item => {
				if(item.checked){
					this.searchTypeName= item.label;
					this.searchType= item.value;
					return
				}
			});
			// 计算搜索栏高度
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('#typeMenuWidth').boundingClientRect(data => {
					this.typeMenuWidth = data.width - 10;
				}).exec();
				query.select('#menuBoxHeight').boundingClientRect(data => {
					this.menuBoxHeight = data.height;
				}).exec();
			});
		}
	}
</script>
<style scoped lang="scss">
	.rotate-180{
		transition:200ms;
		transform:rotate(180deg);
		color: #2A9FD1;
	}
	.rotate-0{
		transition:200ms;
		transform:rotate(0deg);
	}
	.uni-input-placeholder{
		font-size: 26rpx;
	}
</style>

