<template>
	<view class="text-center">
		<button @tap='open'>open</button>
		<view @tap='$dKit.clearStorage()' class="margin-tb-md">清理缓存</view>
		<view>缓存隔离</view>
		<view>
			{{ vuex_env_token }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				env: '',
				env2: ''
			}
		},
		watch: {
			show(){
				console.log(this.show);
			}
		},
		methods: {
			open(){
				// process.env.NODE_ENV 判断环境
				// __wxConfig.envVersion 判断版本 develop：开发版本， trial：体验版本，release：生产版本
				// 三个版本本地存储互通
				uni.showModal({
					editable: true,
					success:(e) => {
						this.$d.vuex('vuex_env_token', e.content);
						console.log(uni.getStorageSync('localData'));
					}
				})
				// this.$d.vuex('vuex_env_token', 123)
				// this.$d.vuex('vuex_token', { trial: 123 })
				// console.log( __wxConfig.envVersion );
				// console.log(this.vuex_env_token);
			},
			async getTestData(){
				console.log('---notice---');
			},
		},
		onLoad() {
		}
	}
</script>

<style>
</style>