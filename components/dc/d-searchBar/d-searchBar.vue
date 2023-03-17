<template>
	<view class="relative" id='menuBoxHeight'
		:style="{'padding-left' : mode == 'typeSearch' ? `${typeMenuWidth}px` : '10px'}">
		<!-- 类型标题 -->
		<view @click='openTypeList' id="typeMenuWidth" class="padding-s absolute font-md" 
			style="top: 12rpx;left : 5rpx;min-width: 85px;" 
			v-show="mode == 'typeSearch'">
			<text class="margin-right-xs font-md" :class="typeShow ? 'text-skyblue' : 'text-darkgrey'">{{searchTypeName}}</text>
			<text :class="[ 'icon-ecrt icon-ecrt-jdown', typeShow ? 'rotate-180' : 'rotate-0' ] "></text>
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
					<text v-if="item.checked" name='checkbox-mark' class="text-skyblue">已选择</text>
				</view>
			</view>
		</view>
		<!-- 搜索输入框 -->
		<InputBar v-model="searchValue" :clearIcon='true' :placeholder="searchTypeName + '搜索'"
			leftIcon='icon-ecrt icon-ecrt-search' @confirm="search"></InputBar>
	</view>
</template>

<script>
	/*
	* 组件名称：搜索框
	* props：
	* options：配置项
	* mode：模式，支持search（默认）、typeSearch
	* clearIcon：是否显示清除图标
	* leftIcon：左侧图标
	* rightIcon：右侧图标
	* @confirm 完成方法回调
	*/
	import InputBar from "@/components/d/d-inputBar/d-inputBar.vue"
	export default {
		components: { InputBar },
		props:{
			options : {
				type : Array,
				required: true
			},
			mode: {
				type : String,
				default: 'search'
			},
		},
		data(){
			return {
				typeShow : false,
				searchValue : '',
				menuBoxHeight : 0,
				menuHeight : 0,
				typeMenuWidth : 0,
				searchTypeName : this.options[0].label,
				searchType : this.options[0].value,
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
			search(){
				this.$emit('search',this.searchKey);
			},
			cancel(){
				this.searchKey = '';
				this.$emit('cancel',this.searchKey);
			},
			checkedItem(cItem,fitem){
				if((fitem.selectOptionKey === cItem.key) && !fitem.onlyOne){
					cItem.checked = !cItem.checked;
					fitem.selectOptionName = '';
					fitem.selectOptionKey = '';
					return
				}
				fitem.selectOptionKey = cItem.key;
				fitem.selectOptionName = cItem.name;
				fitem.options.map(item=>{
					item.checked = false;
				});
				cItem.checked = true;
				this.$emit('update:filterOptions',this.filterOptions);
			},
		},
		mounted(){
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('#typeMenuWidth').boundingClientRect(data => {
					this.typeMenuWidth = data.width - 10;
				}).exec();
				query.select('#menuBoxHeight').boundingClientRect(data => {
					console.log(data.height);
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

