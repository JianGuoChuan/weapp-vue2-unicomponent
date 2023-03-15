<template>
	<view class="listItem">
		<view v-for="( item,index ) in config" :key='item.key' @tap='toPath(item)'
			class="item-border-bottom">
			<view class="flex space-between itemStyle">
				<view class='flex width-half border-box'>
					<text class="text-red margin-r-m margin-t-s" v-if="item.mandatory">*</text>
					<text :class="[ 'font-xl', item.icon ? item.icon : '' ]"></text>
					<text class="text-word-spacing-1 font-sm">{{ item.label }}</text>
				</view>
				<view>
					<view v-if="!item.type || item.type=='text'">
						<text class="text-word-spacing-1">{{ item.value }}</text>
					</view>
					<view v-if="item.type=='input'">
						<input v-model="listData[item.key]" :placeholder="item.placeholder || item.label" 
							v-if="!item.inputType || item.inputType == 'text'" :maxlength='item.maxlength'
							class="padding-m bg-white text-right bradius-m"/>
						<input v-model="listData[item.key]" :placeholder="item.placeholder || item.label"
							type='number' v-if="item.inputType == 'number'" :maxlength="3"
							class="padding-m bg-white text-right bradius-m"/>
						<input v-model="listData[item.key]" :placeholder="item.placeholder || item.label"
							type='idcard' v-if="item.inputType == 'idcard'" :maxlength="18"
							class="padding-m bg-white text-right bradius-m"/>
						<input v-model="listData[item.key]" :placeholder="item.placeholder || item.label"
							type='safe-password' v-if="item.inputType == 'password'" :safe-password-length="item.maxlength"
							class="padding-m bg-white text-right bradius-m"/>
					</view>
				</view>
				<view v-if="item.type=='image'">
					<image :src="item.imageUrl" class="bradius-xs"
						style="width: 80rpx;height: 80rpx;" @tap="previewImage(item)"></image>
				</view>
			</view>
			<view v-if="item.type=='textarea'">
				<textarea v-model="listData[item.key]" auto-height :placeholder="item.placeholder"
					class="bg-white width-all bradius-m padding-m border-box margin-b-md font-sm" 
					style="min-height: 100rpx;border: 1px solid #dcdcdc;"/>
			</view>
			<text class="icon-ecrt icon-ecrt-jright font-xxl padding-t-s" v-if="item.path"></text>
		</view>
	</view>
</template>

<script>
	/*
	* 组件名称：列表项生成
	* props：
	* config：列表项配置，见下方示例
	*/
	//	[
	// 		{
	// 			key: 'name', // 请填写唯一key值保证遍历效率，也是value值
	// 			mandatory: true, // 是否未必填项，存在必填项是配合refs-check完成必填项检查
	// 			icon: 'icon-ecrt icon-ecrt-shezhi', // 仅支持自定义图标
	// 			label: '姓名', // 标题
	// 			type: 'input', // 类型：text/image/input/textarea
	//			inputType: 'number', // input类型时的格式限制，可选项：text/number/idcard/password
	// 			imageUrl: '', // image类型时的图片地址
	// 			disabled: false, // 表单类型时是否禁用
	// 			maxlength: 3, // 表单类型时的最大文本数
	// 			placeholder: '请输入姓名', // 占位符
	// 			path: '', // 前进路径
	// 		}
	//	]
	export default{
		name: 'listItem',
		props:{
			config: {
				type: Array,
				require: true
			}
		},
		data(){
			return {
				listData: {},
			}
		},
		created() {},
		methods: {
			previewImage(item){
				uni.previewImage({ current: 0, urls: [ item.imageUrl ] });
			},
			// 存在前进路由配置时的支持
			toPath(item){
				if(item.path){ 
					uni.navigateTo({
						url: item.path
					});
					return
				}
				if(!item.type == 'text'){
					this.$emit('click', item)
				}
			},
			// 抛出填写项，配合refs调用
			submit(){
				return this.listData;
			},
			// 必填检查支持，配合refs调用
			check(){
				const errItem = [];
				this.config.map( item => {
					if(item.mandatory && !this.listData[item.key]){
						errItem.push( { key: item.key, state: false, errValue: `${item.key}空值校验失败` } );
					};
				});
				return errItem;
			}
		}
	}
</script>

<style scoped lang="scss">
	.listItem{
		.itemStyle{
			line-height: 60rpx;
		}
		.item-border-bottom{
			border-bottom: 1px solid #dcdcdc;
		}
		.uni-input-placeholder{
			font-size: 26rpx;
		}
	}
</style>