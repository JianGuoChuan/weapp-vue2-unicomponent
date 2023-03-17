<template>
	<view class="padding-md bg-whitegrey">
		<view class="title"> Grid-2列 </view>
		<GridView>
			<block v-for="(item,index) in 4" :key="index">
				<GridItem :cell="2" @click="detail(index)">
					<view class="text-center">
						<view class="text-v-middle">
							<text class="icon-ecrt icon-ecrt-identity font-lgx"></text>
						</view>
						<text class="text-center">{{index + 1}}</text>
					</view>
				</GridItem>
			</block>
		</GridView>
		<view class="title"> Grid-3列 修改背景颜色 </view>
		<GridView>
			<block v-for="(item,index) in 6" :key="index">
				<GridItem :cell="3" @click="detail(index)" backgroundColor='#42a5fc'>
					<view class="text-center text-white">
						<view class="text-v-middle">
							<text class="icon-ecrt icon-ecrt-identity font-lgx"></text>
						</view>
						<text class="text-center">{{index + 1}}</text>
					</view>
				</GridItem>
			</block>
		</GridView>
		<view class="title"> Grid-4列 隐藏所有边框</view>
		<GridView unlined>
			<block v-for="(item,index) in 8" :key="index">
				<GridItem :border="false" :bottomLine='false' :cell="4" @click="detail(index)">
					<view class="text-center">
						<view class="text-v-middle">
							<text class="icon-ecrt icon-ecrt-identity font-lgx"></text>
						</view>
						<text class="text-center">{{index + 1}}</text>
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
		props: {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			detail(e) {
				console.log(e);
			}
		},
	}
</script>

<style scoped>
	.title{
		padding: 20rpx 0;
		font-weight: 700;
	}
</style>