<template>
	<view>
		<image :src="src" 
			 style="width: 250rpx;height: 150rpx;border-radius: 3px;"
			@load='load' @tap='previewImage(src)' v-show='loadState'/>
		<view style="width: 250rpx;height: 150rpx;background-color: pink;border-radius: 3px;position: relative;"
			 v-if='!loadState'>
			 <view style="position: absolute;top: 50%;left: 50%;margin-left: -35rpx;margin-top: -35rpx;">
				<Loading></Loading>
			 </view>
		</view>
	</view>
</template>

<script>
	import Loading from "@/components/d/d-loading/d-loading.vue"
	export default {
		components: {Loading},
		props: {
			src: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				loadState: false
			}
		},
		methods: {
			load() {
				this.loadState = true
			},
			previewImage(url) {
				uni.previewImage({
					urls: [url]
				});
			}
		},
	}
</script>

<style>
</style>