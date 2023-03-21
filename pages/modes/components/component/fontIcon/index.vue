<template>
	<view class="padding-md bg-whitegrey">
		<view class="padding-md bg-white">
			<d-input v-model="searchKey" placeholder='请输入key或者描述查询'></d-input>
		</view>
		<GridView>
			<block v-for="(item,index) in iconListFilter" :key="index">
				<GridItem :cell="3" @click="copy(item)">
					<view class="text-center">
						<view class="text-v-middle">
							<text :class="[ 'icon-ecrt font-size-bg', item.key ]"></text>
						</view>
						<view class="text-center font-m margin-tb-sm text-hidden">{{ item.key }}</view>
						<view class="text-center font-m text-hidden">{{ item.label }}</view>
					</view>
				</GridItem>
			</block>
		</GridView>
	</view>
</template>

<script>
	import GridView from "@/components/tui/tui-grid/tui-grid.vue"
	import GridItem from "@/components/tui/tui-grid-item/tui-grid-item.vue"
	export default {
		components: {
			GridView, GridItem
		},
		data() {
			return {
				searchKey: '',
				iconList: [
					{
						label: '设置【填充】',
						key: 'icon-ecrt-set',
					},{
						label: '通知|消息【填充】',
						key: 'icon-ecrt-notice',
					},{
						label: '已选|选中【填充】',
						key: 'icon-ecrt-checked',
					},{
						label: '日历【填充】',
						key: 'icon-ecrt-canladar',
					},{
						label: '关闭【填充】',
						key: 'icon-ecrt-roundclose',
					},{
						label: '待复选【填充】',
						key: 'icon-ecrt-check_ing',
					},{
						label: '加【填充】',
						key: 'icon-ecrt-addRoundFill',
					},{
						label: '减【填充】',
						key: 'icon-ecrt-reduceRoundFill',
					},{
						label: '星星【填充】',
						key: 'icon-ecrt-rateFill',
					},{
						label: '半星【填充】',
						key: 'icon-ecrt-rateHalfFill',
					},{
						label: '筛选【填充】',
						key: 'icon-ecrt-filter_fill',
					},{
						label: '收藏【填充】',
						key: 'icon-ecrt-collectioned',
					},{
						label: '下箭头【填充】',
						key: 'icon-ecrt-down_round',
					},{
						label: '右箭头【填充】',
						key: 'icon-ecrt-right_round',
					},{
						label: '加号【填充】',
						key: 'icon-ecrt-CrossArrow',
					},{
						label: '购物车【填充】',
						key: 'icon-ecrt-shopCar_fill',
					},{
						label: '复制文本【填充】',
						key: 'icon-ecrt-copy_fill',
					},{
						label: '手机【填充】',
						key: 'icon-ecrt-m_phone',
					},{
						label: '消息|通知【填充】',
						key: 'icon-ecrt-message01',
					},{
						label: '卡片【填充】',
						key: 'icon-ecrt-card',
					},{
						label: '宫格【填充】',
						key: 'icon-ecrt-grid',
					},{
						label: '手机',
						key: 'icon-ecrt-disabled',
					},{
						label: '建筑|企业',
						key: 'icon-ecrt-enterprise',
					},{
						label: '搜索',
						key: 'icon-ecrt-search',
					},{
						label: '启用',
						key: 'icon-ecrt-enable',
					},{
						label: '定位',
						key: 'icon-ecrt-position',
					},{
						label: '导出',
						key: 'icon-ecrt-export',
					},{
						label: '未选中',
						key: 'icon-ecrt-check',
					},{
						label: '退出全屏',
						key: 'icon-ecrt-closefullscreen',
					},{
						label: '全屏化',
						key: 'icon-ecrt-fullscreen',
					},{
						label: '关闭|取消',
						key: 'icon-ecrt-close',
					},{
						label: '更多',
						key: 'icon-ecrt-more',
					},{
						label: '上箭头',
						key: 'icon-ecrt-jup',
					},{
						label: '右箭头',
						key: 'icon-ecrt-jright',
					},{
						label: '左箭头',
						key: 'icon-ecrt-jleft',
					},{
						label: '下箭头',
						key: 'icon-ecrt-jdown',
					},{
						label: '历史记录',
						key: 'icon-ecrt-history',
					},{
						label: '喜欢|点赞',
						key: 'icon-ecrt-like',
					},{
						label: '用户管理',
						key: 'icon-ecrt-users',
					},{
						label: '身份|角色',
						key: 'icon-ecrt-idcard',
					},{
						label: '下载',
						key: 'icon-ecrt-download',
					},{
						label: '打印',
						key: 'icon-ecrt-print',
					},{
						label: '编辑',
						key: 'icon-ecrt-edit',
					},{
						label: '分享',
						key: 'icon-ecrt-share',
					},{
						label: '加密',
						key: 'icon-ecrt-encryption',
					},{
						label: '扫码',
						key: 'icon-ecrt-scan',
					},{
						label: '加',
						key: 'icon-ecrt-addRound',
					},{
						label: '支付|卡包',
						key: 'icon-ecrt-qckPay',
					},{
						label: '星星',
						key: 'icon-ecrt-rateSpace',
					},{
						label: '筛选',
						key: 'icon-ecrt-filter',
					},{
						label: '公司|企业',
						key: 'icon-ecrt-company',
					},{
						label: '身份认证',
						key: 'icon-ecrt-identity',
					},{
						label: '收藏',
						key: 'icon-ecrt-collection',
					},{
						label: '更多',
						key: 'icon-ecrt-more2',
					},{
						label: '咨询',
						key: 'icon-ecrt-consulting',
					},{
						label: '购物车',
						key: 'icon-ecrt-shopCar',
					},{
						label: '性别女',
						key: 'icon-ecrt-sex_woman',
					},{
						label: '性别男',
						key: 'icon-ecrt-sex_man',
					},{
						label: '金额',
						key: 'icon-ecrt-money_round',
					},{
						label: '红包',
						key: 'icon-ecrt-redBag',
					},{
						label: '二维码',
						key: 'icon-ecrt-scanCode',
					},{
						label: '选中1',
						key: 'icon-ecrt-selected01',
					},{
						label: '选中2',
						key: 'icon-ecrt-selected02',
					},
				]
			}
		},
		computed:{
			iconListFilter(){
				return this.iconList.filter( e => {
					return e.label.includes(this.searchKey) || e.key.includes(this.searchKey);
				})
			},
		},
		methods: {
			copy(item) {
				console.log(item);
				uni.setClipboardData({
					data: item.key,
					success: () => {
						uni.showToast({
							title: 'key值已复制到剪贴板',
							icon: 'success'
						});
					}
				})
			}
		},
	}
</script>

<style scoped>
	.font-size-bg{
		font-size: 50rpx;
	}
</style>