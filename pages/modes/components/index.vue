<template>
	<view class="bg-whitegrey padding-md">
		<view>
			<view class="text-center padding-tb-md font-bold text-word-spacing-1">
				DUniMode 微信小程序组件库
			</view>
			<view class="font-sm text-indent">
				小程序环境下考虑到性能问题，尝试了只保留高频使用的组件进行全局挂载，比如button、inputBar等，了解已全局挂载的组件项可前往components/dc下查阅，其他的扩展组件则需要自行按需引入使用。
			</view>
		</view>
		<ListView title="组件列表">
			<ListCell @click="to(item)" :arrow="true" v-for="(item, index) in list" :key='index'>
				<view class="d-item-box">
					<text :class="[ 'icon-ecrt', item.icon ]"></text>
					<text class="d-list-cell_name">{{ item.label }}</text>
					<view class="d-right">{{ item.desc }}</view>
				</view>
			</ListCell>
		</ListView>
	</view>
</template>

<script>
	import ListView from "@/components/tui/tui-list-view/tui-list-view.vue"
	import ListCell from "@/components/tui/tui-list-cell/tui-list-cell.vue"
	export default {
		components: {
			ListView, ListCell
		},
		data() {
			return {
				list: [
					{
						label: '字体图标',
						desc: '内置字体图标库',
						icon: 'icon-ecrt-collectioned',
						path: '/pages/modes/components/component/fontIcon/index'
					},{
						label: '按钮组[全局组件]',
						desc: '定制化按钮',
						icon: 'icon-ecrt-enable',
						path: '/pages/modes/components/component/button/index'
					},{
						label: '输入框[全局组件]',
						desc: '多场景输入框',
						icon: 'icon-ecrt-edit',
						path: '/pages/modes/components/component/input/index'
					},{
						label: '搜索栏[全局组件]',
						desc: '多功能搜索栏套组',
						icon: 'icon-ecrt-search',
						path: '/pages/modes/components/component/search/index'
					},{
						label: '消息提示[全局组件]',
						desc: '多场景消息提示',
						icon: 'icon-ecrt-message01',
						path: '/pages/modes/components/component/toast/index'
					},{
						label: '消息提醒[全局组件]',
						desc: '多场景消息提醒',
						icon: 'icon-ecrt-notice',
						path: '/pages/modes/components/component/tips/index'
					},{
						label: '卡片',
						desc: '多场景卡片',
						icon: 'icon-ecrt-card',
						path: ''
					},{
						label: '筛选侧边栏',
						desc: '多类型筛选弹框',
						icon: 'icon-ecrt-filter_fill',
						path: '/pages/modes/components/component/filter/index'
					},{
						label: '宫格列表',
						desc: '宫格布局',
						icon: 'icon-ecrt-grid',
						path: '/pages/modes/components/component/grid/index'
					}
				]
			}
		},
		methods: {
			to(item) {
				if(!item.path){
					uni.showToast({
						title: '暂未更新',
						icon: 'none'
					})
				}
				this.$routes.to(item.path)
			}
		},
	}
</script>

<style scoped>
	.d-item-box {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.d-list-cell_name {
		padding-left: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.d-ml-auto {
		margin-left: auto;
	}
	
	.d-right {
		margin-left: auto;
		margin-right: 34rpx;
		font-size: 26rpx;
		color: #999;
	}
</style>