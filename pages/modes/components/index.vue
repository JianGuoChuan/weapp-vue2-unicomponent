<template>
	<view class="bg-whitegrey">
		<!-- <view class="text-center padding-tb-md font-bold text-word-spacing-1">
			DUniMode 微信小程序组件库
		</view>
		<DListView title="菜单列表">
			<DListCell @click="to(item)" :arrow="true" v-for="(item, index) in list" :key='index'>
				<view class="d-item-box">
					<d-icon name="wealth-fill" :size="24" color="#ff7900"></d-icon>
					<text class="d-list-cell_name">{{ item.label }}</text>
					<view class="d-right">{{ item.desc }}</view>
				</view>
			</DListCell>
		</DListView> -->
	</view>
</template>

<script>
	// import DListView from "@/components/d/d-list-view/d-list-view.vue"
	// import DListCell from "@/components/d/d-list-cell/d-list-cell.vue"
	export default {
		components: {
			// DListView, DListCell
		},
		data() {
			return {
				list: [
					{
						label: '字体图标',
						desc: '内置字体图标库',
						path: '/pages/modes/components/component/fontIcon/index'
					},{
						label: '筛选弹框',
						desc: '多类型筛选弹框',
						path: '/pages/modes/components/component/filter/index'
					},{
						label: '宫格列表',
						desc: '宫格布局',
						path: '/pages/modes/components/component/grid/index'
					}
				]
			}
		},
		methods: {
			to(item) {
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